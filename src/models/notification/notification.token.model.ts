import { BelongsTo, Column, ForeignKey, Model, Table } from "sequelize-typescript";
import { User } from "..";

@Table({
  tableName: "notificationTokens",
  comment: "Токены пользователей для отображения нотификаций"
})
export default class NotificationToken extends Model<NotificationToken> {

  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  token: string;
}