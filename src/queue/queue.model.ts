import { Table, Model, Column, Default, DataType } from "sequelize-typescript";

export type tQueueStatus = "NEW" | "PROCESS" | "DELETED" | "ERROR" | "SUCCESS";

@Table({
  tableName: "queue",
  comment: "Очередь сообщений"
})
export default class Queue extends Model<Queue> {

  @Column
  prefix: string;

  @Column
  name: string;

  @Default("NEW")
  @Column
  status: tQueueStatus;

  @Column({
    type: DataType.TEXT
  })
  data: string;
}