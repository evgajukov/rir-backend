import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { IMMessage, Person } from "..";

@Table({
  tableName: "imMessageShowPersons",
  comment: "Сообщения, которые пользователь просмотрел"
})
export default class IMMessageShow extends Model<IMMessageShow> {

  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;

  @ForeignKey(() => IMMessage)
  @Column
  messageId: number;

  @BelongsTo(() => IMMessage)
  message: IMMessage;
}