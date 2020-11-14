import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "documents",
  comment: "Список документов"
})
export default class Document extends Model<Document> {

  @Column
  title: string;

  @Column
  annotation: string;

  @Column
  url: string;
}