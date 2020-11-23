import { Flat, Invite, Person, Resident } from "../../models";
import Response from "../response";

export default class InviteResponse extends Response {

  createdAt: number;
  code: string;
  used: boolean;
  person: {
    surname: string;
    name: string;
    midname: string;
  };
  flat: {
    number: number;
    floor: number;
    section: number;
  };

  constructor(model: Invite) {
    super(model.id);
    this.createdAt = model.createdAt.getTime();
    this.code = model.code;
    this.used = model.used;
  }

  static async create(model: Invite) {
    let item = new InviteResponse(model);
    if (item.used) {
      const person = await Person.findOne({ where: { userId: model.newUserId } });
      if (person != null) {
        item.person = { surname: person.surname, name: person.name, midname: person.midname };
        const resident = await Resident.findOne({ where: { personId: person.id }, include: [{ model: Flat }] });
        if (resident != null) {
          item.flat = { number: resident.flat.number, floor: resident.flat.floor, section: resident.flat.section };
        }
      }
    }
    return item;
  }

  static async get(inviteId: number) {
    const invite = await Invite.findByPk(inviteId);
    if (invite == null) return null;

    return await InviteResponse.create(invite);
  }
  
  static async list(userId: number, limit: number = 10) {
    const list = await Invite.findAll({
      where: { userId },
      order: [["id", "desc"]],
      limit,
    });
    if (list == null || list.length == 0) return [];

    let result = [];
    for (let item of list) {
      const info = await InviteResponse.create(item);
      result.push(info);
    }
    return result;
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return [];
    return await InviteResponse.list(socket.authToken.id);
  }
}