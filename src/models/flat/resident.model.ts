import { BelongsTo, Column, Default, ForeignKey, Model, Table } from "sequelize-typescript";
import { Flat, Person } from "..";

@Table({
  tableName: "residents",
  comment: "Связка пользователей с квартирави, которые у них в собственности, либо они в них живут"
})
export default class Resident extends Model<Resident> {

  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;

  @ForeignKey(() => Flat)
  @Column
  flatId: number;

  @BelongsTo(() => Flat)
  flat: Flat;

  @Default(false)
  @Column
  isOwner: boolean;
}