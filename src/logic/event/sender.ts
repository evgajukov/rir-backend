import { Event } from "../../models";
import { tPriority } from "../../models/event/event.model";
import config from "../../config";
import Queue from "../../queue";

export default class Sender {

  private static EVENT_NAME: string = "EVENT";

  private static queue;

  static async event(userId: number, type: string, status: string, data?: any, priority?: tPriority) {
    
    Sender.queue = new Queue(config.kue_web.prefix);
    
    if (!data) data = {};

    let eventData = {
      userId,
      type,
      status,
      data: JSON.stringify(data)
    };
    if (priority) {
      eventData["priority"] = priority;
    }
    if (eventData.status != "PROCESS" || data.withProcessEvent) {
      const eventModel = await Event.create(eventData);
      eventData["id"] = eventModel.id;
      eventData["createDt"] = eventModel.createdAt;
      eventData["priority"] = eventModel.priority;
    }
    Sender.queue.create(Sender.EVENT_NAME, eventData).save();
  }
}