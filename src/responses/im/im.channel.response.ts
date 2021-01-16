import { Flat, IMChannel, IMChannelPerson, Person, Resident } from "../../models";
import IMMessage, { tIMMessageBody } from "../../models/im/im.message.model";
import Response from "../response";
import { getPerson, tPerson } from "./im.person.type";

export default class IMChannelResponse extends Response {

  title: string;
  private: boolean;
  lastMessage: {
    createdAt: number,
    person?: {
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
  persons: tPerson[];

  constructor(model: IMChannel) {
    super(model.id);
    this.title = model.title;
    this.private = model.private;
    this.count = 0;
    
    const messages = model.messages;
    if (messages != null && messages.length != 0) {
      const notDeletedMessages = messages.filter(msg => !msg.deleted);
      const lastMessage = notDeletedMessages.sort((msg1: IMMessage, msg2: IMMessage): number => {
        if (msg1.id > msg2.id) return -1;
        if (msg1.id < msg2.id) return 1;
        return 0;
      })[0];
      
      this.lastMessage = {
        createdAt: lastMessage.createdAt.getTime(),
        body: lastMessage.body
      };

      if (lastMessage.personId != null) {
        this.lastMessage.person = { id: lastMessage.personId };
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
      }

      this.count = notDeletedMessages.length;
    }

    if (this.private) {
      // передаем данные об участниках приватного чата
      this.persons = model.persons.map(channelPerson => getPerson(channelPerson.person));
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
    return channelsPersons.map(item => IMChannelResponse.create(item.channel)).sort((ch1: IMChannelResponse, ch2: IMChannelResponse): number => {
      if (ch1.lastMessage.createdAt > ch2.lastMessage.createdAt) return 1;
      if (ch1.lastMessage.createdAt < ch2.lastMessage.createdAt) return -1;
      return 0;
    });
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
      },
      {
        model: IMChannelPerson,
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