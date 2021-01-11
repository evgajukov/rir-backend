import { BelongsTo, Column, ForeignKey, Index, Model, Table } from "sequelize-typescript";
import { IMChannel, Person } from "..";

@Table({
  tableName: "imChannelPersons",
  comment: "Участники группового чата"
})
export default class IMChannelPerson extends Model<IMChannelPerson> {

  @Index
  @ForeignKey(() => IMChannel)
  @Column
  channelId: number;

  @BelongsTo(() => IMChannel)
  channel: IMChannel;

  @Index
  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;
}