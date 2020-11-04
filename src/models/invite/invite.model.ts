import { BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "..";

@Table({
  tableName: "invites",
  comment: "Список приглашений"
})
export default class Invite extends Model<Invite> {

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  code: string;

  @Default(false)
  @Column
  used: boolean

  @ForeignKey(() => User)
  @Column
  newUserId: number;

  @BelongsTo(() => User)
  newUser: User;
}