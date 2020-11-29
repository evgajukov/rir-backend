import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { FAQCategory } from "..";

@Table({
  tableName: "faq",
  comment: "Часто задаваемые вопросы"
})
export default class FAQItem extends Model<FAQItem> {
  
  @ForeignKey(() => FAQCategory)
  @Column
  categoryId: number;

  @BelongsTo(() => FAQCategory)
  category: FAQCategory;

  @Column
  title: string;

  @Column({
    type: DataType.TEXT
  })
  body: string;
}