import { Column, Default, HasMany, Index, Model, Table } from "sequelize-typescript";
import { IMChannelPerson, IMMessage } from "..";

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
    comment: "Признак, что канал для всего дома"
  })
  house: boolean;

  @Index
  @Column({
    comment: "Если указана секция, то канал на конкретную секция, либо этаж конкретной секции, если еще и этаж указан"
  })
  section: number;

  @Index
  @Column({
    comment: "Указывается совместно с параметром секции. Если указан, то канал по конкретному этажу в секции"
  })
  floor: number;

  @HasMany(() => IMMessage)
  messages: IMMessage[];

  @HasMany(() => IMChannelPerson)
  persons: IMChannelPerson[];
}