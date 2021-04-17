import { Department, Invite, Person, Resident, User } from "../../models";
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
  department: {
    id: number;
    title: string;
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
      const person = model.newUser.person;
      if (person != null) {
        item.person = { surname: person.surname, name: person.name, midname: person.midname };
        const resident = person.residents[0];
        if (resident != null) {
          item.department = { id: resident.department.id, title: resident.department.title };
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
      include: [
        {
          model: User,
          as: "newUser",
          include: [
            {
              model: Person,
              include: [
                {
                  model: Resident,
                  include: [{ model: Department }]
                }
              ]
            }
          ]
        }
      ],
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
    const user = await User.findByPk(socket.authToken.id);
    if (user == null || user.banned || user.deleted) return [];
    
    return await InviteResponse.list(socket.authToken.id);
  }
}