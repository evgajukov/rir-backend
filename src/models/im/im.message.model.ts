import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { IMChannel, IMMessageShow, Person } from "..";

export type tIMMessageBody = {
  text: string
};

@Table({
  tableName: "imMessages",
  comment: "Сообщения в чате"
})
export default class IMMessage extends Model<IMMessage> {

  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;

  @ForeignKey(() => IMChannel)
  @Column
  channelId: number;

  @BelongsTo(() => IMChannel)
  channel: IMChannel;

  @Column({
    type: DataType.JSON
  })
  body: tIMMessageBody;

  @HasMany(() => IMMessageShow)
  shownPersons: IMMessageShow[];
}