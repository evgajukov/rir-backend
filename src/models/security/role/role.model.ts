import { Table, Model, Column, HasMany } from "sequelize-typescript";
import { User } from "../..";

@Table({
  tableName: "roles",
  comment: "Справочник ролей пользователей"
})
export default class Role extends Model<Role> {

  @Column
  name: string;

  @Column
  code: string;

  @HasMany(() => User)
  users: User[];
}