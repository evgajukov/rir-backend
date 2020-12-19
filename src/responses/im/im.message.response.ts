import { IMMessage, Person } from "../../models";
import { tIMMessageBody } from "../../models/im/im.message.model";
import Response from "../response";

export default class IMMessageResponse extends Response {

  createdAt: number;
  body: tIMMessageBody;

  constructor(model: IMMessage) {
    super(model.id);
    this.createdAt = model.createdAt.getTime();
    this.body = model.body;
  }

  static create(model: IMMessage) {
    return new IMMessageResponse(model);
  }

  static async get(messageId: number) {
    const message = await IMMessage.findByPk(messageId);
    if (message == null) return null;
    return IMMessageResponse.create(message);
  }

  static async list(channelId: number, userId: number) {
    const person = await Person.findOne({ where: { userId } });
    if (person == null) return [];
    const messages = await IMMessage.findAll({ where: { channelId, personId: person.id } });
    if (messages == null || messages.length == 0) return [];
    return messages.map(message => IMMessageResponse.create(message));
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return [];
    return await IMMessageResponse.list(params[0], socket.authToken.id);
  }
}