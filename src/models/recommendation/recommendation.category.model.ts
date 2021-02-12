import { AllowNull, Column, HasMany, Model, Table, Unique } from "sequelize-typescript";
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

  @HasMany(() => Recommendation)
  recommendations: Recommendation[];
}