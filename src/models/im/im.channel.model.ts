import { BelongsTo, Column, Default, ForeignKey, HasMany, Index, Model, Table } from "sequelize-typescript";
import { Department, IMChannelPerson, IMMessage } from "..";

@Table({
  tableName: "imChannels",
  comment: "Группы и каналы в чатах"
})
export default class IMChannel extends Model<IMChannel> {

  @Column
  title: string;

  @Index
  @Default(false)
  @Column({
    comment: "Признак, что канал для всей компании"
  })
  company: boolean;

  @Index
  @ForeignKey(() => Department)
  @Column({
    comment: "Если указана, то канал на конкретный департамент"
  })
  departmentId: number;

  @BelongsTo(() => Department)
  department: Department;

  @Default(false)
  @Column({
    comment: "Признак, что это приватный канал для двух пользователей"
  })
  private: boolean;

  @HasMany(() => IMMessage)
  messages: IMMessage[];

  @HasMany(() => IMChannelPerson)
  persons: IMChannelPerson[];
}