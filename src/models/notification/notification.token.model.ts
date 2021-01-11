import { BelongsTo, Column, ForeignKey, Index, Model, Table, Unique } from "sequelize-typescript";
import { User } from "..";

@Table({
  tableName: "notificationTokens",
  comment: "Токены пользователей для отображения нотификаций"
})
export default class NotificationToken extends Model<NotificationToken> {

  @Index
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Unique
  @Column
  token: string;
}