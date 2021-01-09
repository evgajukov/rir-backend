import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { IMChannel, IMMessageShow, Person } from "..";

export type tIMHistoryItem = { createdAt: number, text: string };
export type tIMAnswerMessage = { id: number, createdAt: number, text: string };
export type tIMMessageBody = {
  text: string,
  history?: tIMHistoryItem[],
  aMessage?: tIMAnswerMessage
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

  @Default(false)
  @Column
  deleted: boolean;

  @HasMany(() => IMMessageShow)
  shownPersons: IMMessageShow[];
}