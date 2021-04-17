import { BelongsTo, Column, Default, ForeignKey, HasMany, Index, Model, Table } from "sequelize-typescript";
import { Department, User, VoteAnswer, VotePerson, VoteQuestion } from "..";

@Table({
  tableName: "votes",
  comment: "Список голосований"
})
export default class Vote extends Model<Vote> {

  @Column
  title: string;

  @Default(false)
  @Column({
    comment: "Признак, что можно выбирать сразу несколько вариантов"
  })
  multi: boolean;

  @Default(false)
  @Column({
    comment: "Признак, что голосование анонимное"
  })
  anonymous: boolean;

  @Default(false)
  @Column({
    comment: "Признак, что голосование закрыто"
  })
  closed: boolean;

  @Default(false)
  @Column({
    comment: "Признак, что голосование на всю компанию"
  })
  company: boolean;

  @Index
  @ForeignKey(() => Department)
  @Column({
    comment: "Если указана, то голосование на конкретный департамент"
  })
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => VoteQuestion)
  questions: VoteQuestion[];

  @HasMany(() => VoteAnswer)
  answers: VoteAnswer[];

  @HasMany(() => VotePerson)
  persons: VotePerson[];
}