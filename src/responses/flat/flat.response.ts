import { Flat, Person, Resident } from "../../models";
import Response from "../response";
import { getPerson } from "../type/im.person.type";

interface iResident {
  personId: number;
  surname: string;
  name: string;
  midname: string;
}

export default class FlatResponse extends Response {

  number: number;
  floor: number;
  section: number;
  rooms: number;
  square: number;
  residents: iResident[];

  constructor(model: Flat) {
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
      });
    });
  }

  static create(model: Flat) {
    return new FlatResponse(model);
  }

  static async list() {
    const list = await Flat.findAll({ include: [{ model: Resident, include: [{ model: Person }] }], order: ["id"] });
    if (list == null || list.length == 0) return [];
    return list.map(flat => FlatResponse.create(flat));
  }

  static async seed(action, params, socket) {
    return await FlatResponse.list();
  }
}