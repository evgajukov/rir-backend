import { BelongsTo, Column, DataType, Default, ForeignKey, HasMany, Index, Model, Table } from "sequelize-typescript";
import { IMChannel, IMMessageShow, Person } from "..";

export type tIMHistoryItem = { createdAt: number, text: string };
export type tIMAnswerMessage = { id: number, createdAt: number, text: string };
export type tIMMessageBody = {
  text: string,
  history?: tIMHistoryItem[],
  aMessage?: tIMAnswerMessage | any
};

@Table({
  tableName: "imMessages",
  comment: "Сообщения в чате"
})
export default class IMMessage extends Model<IMMessage> {

  @Index
  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;

  @Index
  @ForeignKey(() => IMChannel)
  @Column
  channelId: number;

  @BelongsTo(() => IMChannel)
  channel: IMChannel;

  @Column({
    type: DataType.JSON
  })
  body: tIMMessageBody;

  @Index
  @Default(false)
  @Column
  deleted: boolean;

  @HasMany(() => IMMessageShow)
  shownPersons: IMMessageShow[];
}