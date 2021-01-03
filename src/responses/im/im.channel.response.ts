import { IMChannel, IMChannelPerson, Person } from "../../models";
import IMMessage, { tIMMessageBody } from "../../models/im/im.message.model";
import Response from "../response";

export default class IMChannelResponse extends Response {

  title: string;
  lastMessage: {
    createdAt: number,
    body: tIMMessageBody,
  };
  count: number; // общее количество сообщений в канале

  constructor(model: IMChannel) {
    super(model.id);
    this.title = model.title;
    
    const messages = model.messages;
    if (messages != null && messages.length != 0) {
      const lastMessage = messages[messages.length - 1];
      this.lastMessage = {
        createdAt: lastMessage.createdAt.getTime(),
        body: lastMessage.body
      };
      this.count = messages.length;
    }
  }

  static create(model: IMChannel) {
    return new IMChannelResponse(model);
  }

  static async get(channelId: number) {
    const channel = await IMChannel.findByPk(channelId, { include: [{ model: IMMessage }] })
    if (channel == null) return null;
    return IMChannelResponse.create(channel);
  }

  static async list(userId: number) {
    const person = await Person.findOne({ where: { userId } });
    if (person == null) return [];

    const channelsPersons = await IMChannelPerson.findAll({
      where: { personId: person.id },
      include: [{ model: IMChannel, include: [{ model: IMMessage }] }]
    });
    if (channelsPersons == null || channelsPersons.length == 0) return [];
    return channelsPersons.map(item => IMChannelResponse.create(item.channel));
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return [];
    return await IMChannelResponse.list(socket.authToken.id);
  }
}