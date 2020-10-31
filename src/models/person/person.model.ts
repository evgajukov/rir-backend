import { Table, Model, ForeignKey, Column, BelongsTo, Default, DataType } from "sequelize-typescript";
import { User } from "..";

@Table({
  tableName: "persons",
  comment: "Профили пользователей"
})
export default class Person extends Model<Person> {

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  surname: string;

  @Column
  name: string;

  @Column
  midname: string;

  @Column
  birthday: Date;

  @Default("U")
  @Column
  sex: "M" | "F" | "U";

  @Column({
    type: DataType.TEXT
  })
  biography: string;
}