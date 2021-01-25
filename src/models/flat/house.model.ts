import { AllowNull, Column, DataType, HasMany, Model, Table, Unique } from "sequelize-typescript";
import { Flat } from "..";

@Table({
  tableName: "houses",
  comment: "Дома, подключенные к сервису"
})
export default class House extends Model<House> {

  @AllowNull(false)
  @Unique
  @Column({
    comment: "Адрес здания в свободной форме"
  })
  address: string;

  @Column({
    type: DataType.JSON,
    comment: "Структурированный формат адреса от сервиса DADATA"
  })
  dadata: any;

  @Column({
    type: DataType.DOUBLE,
    comment: "Широта"
  })
  lat: number;

  @Column({
    type: DataType.DOUBLE,
    comment: "Долгота"
  })
  lon: number;

  @HasMany(() => Flat)
  flats: Flat[];
}