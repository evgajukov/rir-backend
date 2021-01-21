import { BelongsTo, Column, Default, ForeignKey, Index, Model, Table, Unique } from "sequelize-typescript";
import { User } from "..";

@Table({
  tableName: "invites",
  comment: "Список приглашений"
})
export default class Invite extends Model<Invite> {

  @Index
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, "userId")
  user: User;

  @Unique
  @Column
  code: string;

  @Index
  @Default(false)
  @Column
  used: boolean

  @Unique
  @ForeignKey(() => User)
  @Column
  newUserId: number;

  @BelongsTo(() => User, "newUserId")
  newUser: User;
}