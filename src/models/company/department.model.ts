import { BelongsTo, Column, ForeignKey, HasMany, Index, Model, Table } from "sequelize-typescript";
import { Company, Resident, Vote } from "..";

@Table({
  tableName: "departments",
  comment: "Список доступных в компании отделов"
})
export default class Department extends Model<Department> {

  @Index
  @ForeignKey(() => Company)
  @Column
  companyId: number;

  @BelongsTo(() => Company)
  company: Company;

  @Column
  title: string;

  @ForeignKey(() => Department)
  @Column({
    comment: "Вышестоящий департамент"
  })
  parentId: number;

  @BelongsTo(() => Department)
  parent: Department;

  @HasMany(() => Resident)
  residents: Resident[];

  @HasMany(() => Vote)
  votes: Vote[];
}