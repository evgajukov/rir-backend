import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { Person, Vote, VoteQuestion } from "..";

@Table({
  tableName: "voteAnswers",
  comment: "Список ответов по голосованию"
})
export default class VoteAnswer extends Model<VoteAnswer> {

  @ForeignKey(() => Vote)
  @Column
  voteId: number;

  @BelongsTo(() => Vote)
  vote: Vote;

  @ForeignKey(() => VoteQuestion)
  @Column
  questionId: number;

  @BelongsTo(() => VoteQuestion)
  question: VoteQuestion;

  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;
}