import { Flat } from "../../models";
import Response from "../response";

export default class FlatResponse extends Response {

  number: number;
  floor: number;
  section: number;
  rooms: number;
  square: number;

  constructor(model: Flat) {
    super(model.id);
    this.number = model.number;
    this.floor = model.floor;
    this.section = model.section;
    this.rooms = model.rooms;
    this.square = model.square;
  }

  static create(model: Flat) {
    return new FlatResponse(model);
  }

  static async list() {
    const list = await Flat.findAll();
    if (list == null || list.length == 0) return [];
    return list.map(flat => FlatResponse.create(flat));
  }

  static async seed(action, params, socket) {
    return await FlatResponse.list();
  }
}