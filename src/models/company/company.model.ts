import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Flat } from "..";

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

  @HasMany(() => Flat)
  flats: Flat[];
}