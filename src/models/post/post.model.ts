import { Column, DataType, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "posts",
  comment: "Новости"
})
export default class Post extends Model<Post> {

  @Column
  title: string;

  @Column({
    type: DataType.TEXT
  })
  body: string;
}