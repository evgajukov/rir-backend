import { ForeignKey, BelongsTo, Default, Table, Column, Model, AllowNull, HasMany, DataType } from "sequelize-typescript";

import { User, EventLog } from "..";

export type tPriority = "LOW" | "MEDIUM" | "HIGH";
export type tStatus = "ABSTRACT" | "PROCESS" | "SENDING" | "SUCCESS" | "ERROR" | "FORBIDDEN" | "CANCEL";

@Table({
  tableName: "events"
})
export default class Event extends Model<Event> {

  @ForeignKey(() => User)  
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @AllowNull(false)
  @Column
  type: string;

  @AllowNull(false)
  @Column
  status: tStatus;

  @AllowNull(false)
  @Default("MEDIUM")
  @Column
  priority: tPriority;  

  @Column({
    type: DataType.TEXT
  })
  data: string;

  @HasMany(() => EventLog)
  logItems: EventLog[];
}