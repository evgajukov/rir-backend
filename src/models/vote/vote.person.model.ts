import { BelongsTo, Column, ForeignKey, Index, Model, Table } from "sequelize-typescript";
import { Person, Vote } from "..";

@Table({
  tableName: "votePersons",
  comment: "Список пользователей, которые имеют доступ к голосованию"
})
export default class VotePerson extends Model<VotePerson> {

  @Index
  @ForeignKey(() => Vote)
  @Column
  voteId: number;

  @BelongsTo(() => Vote)
  vote: Vote;

  @Index
  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;
}