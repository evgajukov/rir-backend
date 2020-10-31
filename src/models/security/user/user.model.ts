import {
  AllowNull, Column, Default, Model, Table, Unique, HasMany, BelongsTo, ForeignKey, HasOne
} from "sequelize-typescript";
import { Session, Role, Person } from "../..";

@Table({
  tableName: "users"
})
export default class User extends Model<User> {

  @AllowNull(false)
  @Unique
  @Column
  mobile: string;

  @Column
  smsCode: string;

  @Default(false)
  @Column
  banned: boolean;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Session)
  sessions: Session[];

  @HasOne(() => Person)
  person: Person;
}