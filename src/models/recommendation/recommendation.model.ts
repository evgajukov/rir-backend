import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import { Person, RecommendationCategory } from "..";

@Table({
  tableName: "recommendations",
  comment: "Рекомендации пользователей"
})
export default class Recommendation extends Model<Recommendation> {

  @ForeignKey(() => RecommendationCategory)
  @Column
  categoryId: number;

  @BelongsTo(() => RecommendationCategory)
  category: RecommendationCategory;

  @ForeignKey(() => Person)
  @Column
  personId: number;

  @BelongsTo(() => Person)
  person: Person;

  @Column
  title: string;

  @Column({
    type: DataType.TEXT
  })
  body: string;

  @Column({
    type: DataType.JSON
  })
  extra: any;
}