import { Department, Person, Resident, User } from "../../models";
import Response from "../response";
import { getPerson } from "../type/person.type";

interface iResident {
  personId: number;
  surname: string;
  name: string;
  midname: string;
  deleted: boolean;
}

export default class DepartmentResponse extends Response {

  number: number;
  floor: number;
  section: number;
  rooms: number;
  square: number;
  residents: iResident[];

  constructor(model: Department) {
    super(model.id);
    this.number = model.number;
    this.floor = model.floor;
    this.section = model.section;
    this.rooms = model.rooms;
    this.square = model.square;
    this.residents = [];
    model.residents.forEach(resident => {
      const person = getPerson(resident.person);
      this.residents.push({
        personId: person.id,
        surname: person.surname,
        name: person.name,
        midname: person.midname,
        deleted: person.deleted
      });
    });
  }

  static create(model: Department) {
    return new DepartmentResponse(model);
  }

  static async list(userId: number) {
    const person = await Person.findOne({
      where: { userId },
      include: [
        {
          model: Resident,
          include: [{ model: Department }]
        }
      ]
    });
    const companyId = (person != null && person.residents.length != 0) ? person.residents[0].department.companyId : 1;
    const list = await Department.findAll({
      where: { companyId },
      include: [{ model: Resident, include: [{ model: Person, include: [{ model: User }] }] }],
      order: ["id"]
    });
    if (list == null || list.length == 0) return [];
    return list.map(flat => DepartmentResponse.create(flat));
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return [];
    return await DepartmentResponse.list(socket.authToken.id);
  }
}