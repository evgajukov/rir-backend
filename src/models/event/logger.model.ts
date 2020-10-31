import { AllowNull, BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";

import { Event } from "../";

@Table({
  tableName: "events_log"
})
export default class EventLog extends Model<EventLog> {

  @AllowNull(false)
  @Column
  userId: number;

  @AllowNull(false)
  @ForeignKey(() => Event)
  @Column
  eventId: number;

  @BelongsTo(() => Event)
  event: Event;

  static async log(userId: number, eventId: number) {
    await EventLog.create({ userId, eventId });
  }
}