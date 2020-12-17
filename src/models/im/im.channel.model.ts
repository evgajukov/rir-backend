import { Column, Default, HasMany, Model, Table } from "sequelize-typescript";
import { IMChannelPerson, IMMessage } from "..";

@Table({
  tableName: "imChannels",
  comment: "Группы и каналы в чатах"
})
export default class IMChannel extends Model<IMChannel> {

  @Column
  title: string;

  @Default(false)
  @Column({
    comment: "Признак, что канал для всего дома"
  })
  house: boolean;

  @Column({
    comment: "Если указана секция, то канал на конкретную секция, либо этаж конкретной секции, если еще и этаж указан"
  })
  section: number;

  @Column({
    comment: "Указывается совместно с параметром секции. Если указан, то канал по конкретному этажу в секции"
  })
  floor: number;

  @HasMany(() => IMMessage)
  messages: IMMessage[];

  @HasMany(() => IMChannelPerson)
  persons: IMChannelPerson[];
}