import { IMChannelResponse, IMMessageResponse, InviteResponse, PostResponse, UserResponse, VoteResponse } from ".";
import * as _ from "lodash";
import { IMChannelPerson, Person, VotePerson } from "../models";

export type tPublishEvent = "create" | "update" | "destroy" | "ready";

export default class ResponseUpdate {

  private exchange;

  constructor(exchange) {
    this.exchange = exchange;
  }

  async update(eventData) {
    try {
      eventData.createAt = new Date(eventData.createAt).getTime();
      eventData.data = eventData.data != null ? JSON.parse(eventData.data) : null;

      switch (eventData.type) {
        case "USER.UPDATE":
          await this.updateUser(eventData);
          break;
        case "POST.SAVE":
          await this.updatePostSave(eventData);
          break;
        case "INVITE.SAVE":
          await this.updateInviteSave(eventData);
          break;
        case "VOTE.SAVE":
          await this.updateVoteSave(eventData);
          break;
        case "VOTE.ANSWER.SAVE":
          await this.updateVoteAnswerSave(eventData);
          break;
        case "IM.SAVE":
        case "IM.SHOWN":
          await this.updateIMMessage(eventData);
          await this.updateIMCategory(eventData);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  private async updateUser(eventData) {
    const data = await UserResponse.info(eventData.userId);
    await this.publish(`user.${eventData.userId}`, data, "update");
  }

  private async updatePostSave(eventData) {
    const post = await PostResponse.get(eventData.data.postId);
    await this.publish("posts", post, eventData.data.event);
  }

  private async updateInviteSave(eventData) {
    const invite = await InviteResponse.get(eventData.data.inviteId);
    await this.publish(`invites.${eventData.userId}`, invite, eventData.data.event);
  }

  private async updateVoteSave(eventData) {
    const vote = await VoteResponse.get(eventData.data.voteId);
    // нужно обновить каналы всех пользователей, кому доступно голосование
    const votePersons = await VotePerson.findAll({
      where: { voteId: eventData.data.voteId },
      include: [{ model: Person }]
    });
    for (let votePerson of votePersons) {
      await this.publish(`votes.${votePerson.person.userId}`, vote, eventData.data.event);
    }
  }

  private async updateVoteAnswerSave(eventData) {
    const vote = await VoteResponse.get(eventData.data.voteId);
    // нужно обновить каналы всех пользователей, кому доступно голосование
    const votePersons = await VotePerson.findAll({
      where: { voteId: eventData.data.voteId },
      include: [{ model: Person }]
    });
    for (let votePerson of votePersons) {
      await this.publish(`votes.${votePerson.person.userId}`, vote, eventData.data.event);
    }
  }

  private async updateIMMessage(eventData) {
    const message = await IMMessageResponse.get(eventData.data.messageId);
    // нужно обновить каналы всех пользователей этого чата
    const channelPersons = await IMChannelPerson.findAll({ where: { channelId: message.channel.id }, include: [{ model: Person }] });
    for (let channelPerson of channelPersons) {
      await this.publish(`imMessages.${channelPerson.channelId}.${channelPerson.person.userId}`, message, eventData.data.event);
    }
  }

  private async updateIMCategory(eventData) {
    const channel = await IMChannelResponse.get(eventData.data.channelId);
    // нужно обновить каналы всех пользователей этого чата
    const channelPersons = await IMChannelPerson.findAll({ where: { channelId: channel.id }, include: [{ model: Person }] });
    for (let channelPerson of channelPersons) {
      await this.publish(`imChannels.${channelPerson.person.userId}`, channel, eventData.data.event);
    }
  }

  /**
   * Отправка данных в канал
   * @param channel название канала
   * @param rows массив или единичные данные с обновлениями для отправки
   * @param event тип обновления канала: create, update, destroy
   */
  private async publish(channel, rows, event: tPublishEvent = "update") {
    console.log(`publishUpdateData to CHANNEL: ${channel}, event = ${event}`);
    if (rows != null) {
      if (rows instanceof Array) {
        for (let data of rows) {
          await this.exchange.publish(channel, { event, data });
        }
      } else {
        let data = rows;
        await this.exchange.publish(channel, { event, data });
      }
    }
    await this.exchange.publish(channel, { event: "ready" });
  }
}