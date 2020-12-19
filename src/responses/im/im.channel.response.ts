import { IMChannel, IMChannelPerson, Person } from "../../models";
import Response from "../response";

export default class IMChannelResponse extends Response {

  title: string;

  constructor(model: IMChannel) {
    super(model.id);
    this.title = model.title;
  }

  static create(model: IMChannel) {
    return new IMChannelResponse(model);
  }

  static async list(userId: number) {
    const person = await Person.findOne({ where: { userId } });
    if (person == null) return [];

    const channelsPersons = await IMChannelPerson.findAll({ where: { personId: person.id }, include: [{ model: IMChannel }] });
    if (channelsPersons == null || channelsPersons.length == 0) return [];
    return channelsPersons.map(item => IMChannelResponse.create(item.channel));
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return [];
    return await IMChannelResponse.list(socket.authToken.id);
  }
}