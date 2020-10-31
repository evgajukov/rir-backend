import { Event as EventModel, EventLog } from "../../models";
import { tPriority } from "../../models/event/event.model";
import Response from "../response";
import * as _ from "lodash";
import { Op } from "sequelize";

export default class EventResponse extends Response {

  private static MAX_LIMIT = 4;
  private static FIELDS = ["id", "createdAt", "type", "status", "data", "priority", "shown"];

  createdAt: number;
  type: string;
  status: string;
  data: any;
  priority: tPriority;
  shown: boolean = false;

  constructor (event: EventModel) {
    super(event.id, event);

    this.createdAt = new Date(event.createdAt).getTime();
    this.type = event.type;
    this.status = event.status;
    this.data = JSON.parse(event.data);
    this.priority = event.priority;
  }

  static async create(model: EventModel, userId?: number) {
    let event = new EventResponse(model);
    if (userId) {
      let item = await EventLog.findOne({ where: { userId, eventId: event.id } });
      event.shown = item != null;
    }  
    return event;
  }

  static async get(eventId: number, userId: number) {
    const model = await EventModel.findOne({ where: { id: eventId } });
    if (model == null) {
      return null;
    }

    return _.pick(await EventResponse.create(model, userId), EventResponse.FIELDS);
  }

  static async list(userId: number) {
    let where: any = { [Op.or]: [{ userId }, { userId: { [Op.eq]: null } }] };
    let models = await EventModel.findAll({ where, order: [ [ "id", "DESC" ] ], limit: EventResponse.MAX_LIMIT });
    if (models == null || models.length == 0) {
      return [];
    }
    let list = [];
    for (let model of models) {
      list.push(_.pick(await EventResponse.create(model, userId), EventResponse.FIELDS));
    }
    list.reverse();

    return list;
  }

  static async seed(action, params) {
    return await EventResponse.list(params);
  }
}