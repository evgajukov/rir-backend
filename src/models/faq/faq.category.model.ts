import { Column, HasMany, Model, Table, Unique } from "sequelize-typescript";
import { FAQItem } from "..";

@Table({
  tableName: "faqCategories",
  comment: "Категории вопросов для FAQ"
})
export default class FAQCategory extends Model<FAQCategory> {

  @Unique
  @Column
  name: string;

  @HasMany(() => FAQItem)
  items: FAQItem[];
}