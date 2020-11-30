import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Person, Vote } from "..";

@Table({
  tableName: "votePersons",
  comment: "Список пользователей, которые имеют доступ к голосованию"
})
export default class VotePerson extends Model<VotePerson> {

  @ForeignKey(() => Vote)
  @Column
  voteId: number;

  @BelongsTo(() => Vote)
  vote: Vote;

  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;
}