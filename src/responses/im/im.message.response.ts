import { Flat, IMChannel, IMChannelPerson, IMMessage, Person, Resident } from "../../models";
import { tIMMessageBody } from "../../models/im/im.message.model";
import Response from "../response";

export default class IMMessageResponse extends Response {

  createdAt: number;
  person: {
    id: number,
    surname?: string,
    name?: string,
    midname?: string,
    flat?: {
      id: number,
      number: number,
      section: number,
      floor: number
    }
  };
  channel: {
    id: number,
    title: string,
  };
  body: tIMMessageBody;

  constructor(model: IMMessage) {
    super(model.id);
    this.createdAt = model.createdAt.getTime();
    if (model.personId != null) {
      this.person = {
        id: model.personId
      };
      
      const access = model.person.access;
      if (access.name.level == "all") {
        if (access.name.format == "all") {
          this.person.surname = model.person.surname;
          this.person.name = model.person.name;
          this.person.midname = model.person.midname;
        } else if (access.name.format == "name") {
          this.person.name = model.person.name;
        }
      }

      const flat = model.person.residents[0].flat;
      this.person.flat = {
        id: flat.id,
        number: flat.number,
        section: flat.section,
        floor: flat.floor
      };
    }
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
    const message = await IMMessage.findByPk(messageId, { include: IMMessageResponse.include() });
    if (message == null) return null;
    return IMMessageResponse.create(message);
  }

  static async list(channelId: number, userId: number, limit: number = 20, offset: number = 0) {
    const person = await Person.findOne({ where: { userId } });
    if (person == null) return [];
    // проверяем, что пользователь подписан на канал
    const personChannel = await IMChannelPerson.findOne({ where: { channelId, personId: person.id } });
    if (personChannel == null) return [];

    const messages = await IMMessage.findAll({ where: { channelId }, include: IMMessageResponse.include(), order: [["id", "desc"]], limit, offset });
    if (messages == null || messages.length == 0) return [];
    return messages.map(message => IMMessageResponse.create(message));
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return [];
    return await IMMessageResponse.list(params[0], socket.authToken.id);
  }

  private static include() {
    return [
      { model: IMChannel },
      {
        model: Person,
        include: [
          {
            model: Resident,
            include: [{ model: Flat }]
          }
        ]
      }
    ];
  }
}