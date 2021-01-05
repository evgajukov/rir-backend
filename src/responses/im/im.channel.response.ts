import { Flat, IMChannel, IMChannelPerson, Person, Resident } from "../../models";
import IMMessage, { tIMMessageBody } from "../../models/im/im.message.model";
import Response from "../response";

export default class IMChannelResponse extends Response {

  title: string;
  lastMessage: {
    createdAt: number,
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
        person: {
          id: lastMessage.personId
        },
        body: lastMessage.body
      };

      const access = lastMessage.person.access;
      if (access.name.level == "all") {
        if (access.name.format == "all") {
          this.lastMessage.person.surname = lastMessage.person.surname;
          this.lastMessage.person.name = lastMessage.person.name;
          this.lastMessage.person.midname = lastMessage.person.midname;
        } else if (access.name.format == "name") {
          this.lastMessage.person.name = lastMessage.person.name;
        }
      }

      const flat = lastMessage.person.residents[0].flat;
      this.lastMessage.person.flat = {
        id: flat.id,
        number: flat.number,
        section: flat.section,
        floor: flat.floor
      };

      this.count = messages.length;
    }
  }

  static create(model: IMChannel) {
    return new IMChannelResponse(model);
  }

  static async get(channelId: number) {
    const channel = await IMChannel.findByPk(channelId, { include: IMChannelResponse.include() })
    if (channel == null) return null;
    return IMChannelResponse.create(channel);
  }

  static async list(userId: number) {
    const person = await Person.findOne({ where: { userId } });
    if (person == null) return [];

    const channelsPersons = await IMChannelPerson.findAll({
      where: { personId: person.id },
      include: [{ model: IMChannel, include: IMChannelResponse.include() }]
    });
    if (channelsPersons == null || channelsPersons.length == 0) return [];
    return channelsPersons.map(item => IMChannelResponse.create(item.channel));
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return [];
    return await IMChannelResponse.list(socket.authToken.id);
  }

  private static include() {
    return [
      {
        model: IMMessage,
        include: [
          {
            model: Person,
            include: [
              {
                model: Resident,
                include: [{ model: Flat }]
              }
            ]
          }
        ]
      }
    ];
  }
}