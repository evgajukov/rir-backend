import {
  AllowNull, Column, Default, Model, Table, Unique, HasMany, BelongsTo, ForeignKey, HasOne
} from "sequelize-typescript";
import { Session, Role, Person, Invite, Vote, NotificationToken } from "../..";

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

  @Default(false)
  @Column
  deleted: boolean;

  @ForeignKey(() => Role)
  @Column
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @HasMany(() => Session)
  sessions: Session[];

  @HasOne(() => Person)
  person: Person;

  @HasMany(() => Invite)
  invites: Invite[]; // список приглашений других пользователей

  @HasOne(() => Invite)
  invite: Invite; // каким кодом пригласили нас

  @HasMany(() => Vote)
  votes: Vote[];

  @HasMany(() => NotificationToken)
  tokens: NotificationToken[];
}