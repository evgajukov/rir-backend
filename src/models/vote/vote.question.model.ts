import { BelongsTo, Column, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import { Vote, VoteAnswer } from "..";

@Table({
  tableName: "voteQuestions",
  comment: "Список вопросов для голосования"
})
export default class VoteQuestion extends Model<VoteQuestion> {

  @ForeignKey(() => Vote)
  @Column
  voteId: number;

  @BelongsTo(() => Vote)
  vote: Vote;

  @Column
  body: string;

  @HasMany(() => VoteAnswer)
  answers: VoteAnswer[];
}