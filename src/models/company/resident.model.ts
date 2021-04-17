import { BelongsTo, Column, Default, ForeignKey, Index, Model, Table } from "sequelize-typescript";
import { Department, Person } from "..";

@Table({
  tableName: "residents",
  comment: "Связка сотрудников с отделами"
})
export default class Resident extends Model<Resident> {

  @Index
  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;

  @Index
  @ForeignKey(() => Department)
  @Column
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;

  @Default(false)
  @Column
  isOwner: boolean;
}