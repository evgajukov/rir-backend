import { Table, Model, ForeignKey, Column, BelongsTo, Default, DataType, HasMany } from "sequelize-typescript";
import { Resident, User } from "..";

export type tAccessLevel = "all" | "friends" | "nothing";
export type tAccessNameFormat = "all" | "name";

export interface iAccess {
  name: { level: tAccessLevel, format: tAccessNameFormat };
  mobile: { level: tAccessLevel };
  telegram: { level: tAccessLevel };
}

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

  @Column({
    comment: "Аккаунт в Телеграм"
  })
  telegram: string;

  @Column({
    type: DataType.JSON,
    comment: "json с настройками безопасности по отображению персональных данных"
  })
  access: iAccess;

  @HasMany(() => Resident)
  residents: Resident[];
}