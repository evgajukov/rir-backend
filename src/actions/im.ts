import { IMChannelPerson, IMMessage, IMMessageShow, Person } from "../models";
import { IMMessageResponse } from "../responses";
import ResponseUpdate from "../responses/response.update";
import errors from "./errors";

export async function save({ channelId, body }, respond) {
  console.log(">>>>> actions/im.save");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    const person = await Person.findOne({ where: { userId: this.authToken.id } });

    const channelPerson = await IMChannelPerson.findOne({ where: { channelId, personId: person.id } });
    if (channelPerson == null) throw new Error(errors.im["001"].code);

    const message = await IMMessage.create({ personId: person.id, channelId, body });
    await IMMessageShow.create({ personId: person.id, messageId: message.id });

    // обновляем канал с группами чатов и конкретную группу
    const responseUpdate = new ResponseUpdate(this.exchange);
    responseUpdate.update({
      userId: this.authToken.id,
      createAt: new Date(),
      type: "IM.SAVE",
      status: "SUCCESS",
      data: JSON.stringify({ channelId, messageId: message.id, event: "create" })
    });

    respond(null, { status: "OK" });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}

export async function shown({ messageId }, respond) {
  console.log(">>>>> actions/im.shown");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    const person = await Person.findOne({ where: { userId: this.authToken.id } });

    const message = await IMMessage.findByPk(messageId);
    if (message == null) throw new Error(errors.im["002"].code);

    await IMMessageShow.create({ personId: person.id, messageId });

    // обновляем канал с группами чатов и конкретную группу
    const responseUpdate = new ResponseUpdate(this.exchange);
    await responseUpdate.update({
      userId: this.authToken.id,
      createAt: new Date(),
      type: "IM.SHOWN",
      status: "SUCCESS",
      data: JSON.stringify({ channelId: message.channelId, messageId, event: "create" })
    });

    respond(null, { status: "OK" });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}

export async function load({ channelId, limit, offset }, respond) {
  console.log(">>>>> actions/im.load");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    const person = await Person.findOne({ where: { userId: this.authToken.id } });

    const channelPerson = await IMChannelPerson.findOne({ where: { channelId, personId: person.id } });
    if (channelPerson == null) throw new Error(errors.im["001"].code);

    const messages = await IMMessageResponse.list(channelId, this.authToken.id, limit, offset);
    respond(null, messages);
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}