import { AllowNull, Column, Default, HasMany, Model, Table, Unique } from "sequelize-typescript";
import { Recommendation } from "..";

@Table({
  tableName: "recommendationCategories",
  comment: "Справочник категорий рекомендаций пользователей"
})
export default class RecommendationCategory extends Model<RecommendationCategory> {

  @Unique
  @AllowNull(false)
  @Column
  name: string;

  @Column
  img: string;

  @Default(0)
  @Column
  sort: number;

  @HasMany(() => Recommendation)
  recommendations: Recommendation[];
}