import { tDadataInfo } from "../../lib/dadata";
import { Flat, House, Person, Resident } from "../../models";
import Response from "../response";

export default class HouseResponse extends Response {

  address: string;
  dadata: tDadataInfo[];
  coord: {
    lat: number,
    lon: number,
  }
  extra: any;

  constructor(model: House) {
    super(model.id);
    this.address = model.address;
    this.dadata = model.dadata;
    this.coord = {
      lat: model.lat,
      lon: model.lon
    };
    this.extra = model.extra;
  }

  static create(model: House) {
    return new HouseResponse(model);
  }

  static async info(userId: number) {
    const person = await Person.findOne({
      where: { userId },
      include: [
        {
          model: Resident,
          include: [{ model: Flat }]
        }
      ]
    });
    const houseId = person != null ? person.residents[0].flat.houseId : 1;
    const house = await House.findByPk(houseId);
    if (house == null) return null;
    return HouseResponse.create(house);
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return null;
    return await HouseResponse.info(socket.authToken.id);
  }
}