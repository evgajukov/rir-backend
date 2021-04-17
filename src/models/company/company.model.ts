import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Department } from "..";

@Table({
  tableName: "companies",
  comment: "Компании, подключенные к сервису"
})
export default class Company extends Model<Company> {

  @AllowNull(false)
  title: string;

  @Column({
    type: DataType.JSON,
    comment: "Любые дополнительные данные"
  })
  extra: any;

  @HasMany(() => Department)
  departments: Department[];
}