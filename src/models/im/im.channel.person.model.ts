import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { IMChannel, Person } from "..";

@Table({
  tableName: "imChannelPersons",
  comment: "Участники группового чата"
})
export default class IMChannelPerson extends Model<IMChannelPerson> {

  @ForeignKey(() => IMChannel)
  @Column
  channelId: number;

  @BelongsTo(() => IMChannel)
  channel: IMChannel;

  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;
}