import { IMChannel, IMMessage, Person } from "../../models";
import { tIMMessageBody } from "../../models/im/im.message.model";
import Response from "../response";

export default class IMMessageResponse extends Response {

  createdAt: number;
  channel: {
    id: number,
    title: string,
  };
  body: tIMMessageBody;

  constructor(model: IMMessage) {
    super(model.id);
    this.createdAt = model.createdAt.getTime();
    this.channel = {
      id: model.channel.id,
      title: model.channel.title
    };
    this.body = model.body;
  }

  static create(model: IMMessage) {
    return new IMMessageResponse(model);
  }

  static async get(messageId: number) {
    const message = await IMMessage.findByPk(messageId, { include: [{ model: IMChannel }] });
    if (message == null) return null;
    return IMMessageResponse.create(message);
  }

  static async list(channelId: number, userId: number) {
    const person = await Person.findOne({ where: { userId } });
    if (person == null) return [];
    const messages = await IMMessage.findAll({ where: { channelId, personId: person.id }, include: [{ model: IMChannel }] });
    if (messages == null || messages.length == 0) return [];
    return messages.map(message => IMMessageResponse.create(message));
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return [];
    return await IMMessageResponse.list(params[0], socket.authToken.id);
  }
}