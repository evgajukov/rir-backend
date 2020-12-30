import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "versions",
  comment: "Актуальные версии приложения"
})
export default class Version extends Model<Version> {

  @Column
  number: number;

  @Column
  build: number;
}