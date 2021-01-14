import { AllowNull, Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "documents",
  comment: "Список документов"
})
export default class Document extends Model<Document> {

  @AllowNull(false)
  @Column
  title: string;

  @Column
  annotation: string;

  @AllowNull(false)
  @Column
  url: string;
}