import { Column, DataType, Default, Index, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "posts",
  comment: "Новости"
})
export default class Post extends Model<Post> {

  @Column({
    comment: "Тип новости"
  })
  type: string;
  
  @Column
  title: string;

  @Column({
    type: DataType.TEXT
  })
  body: string;

  @Column({
    comment: "Ссылка на объект, о которой новость"
  })
  url: string

  @Index
  @Default(false)
  @Column({
    comment: "Признак закрепленной новости"
  })
  pin: boolean
}