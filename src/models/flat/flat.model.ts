import { Column, DataType, HasMany, Index, Model, Table, Unique } from "sequelize-typescript";
import { Resident } from "..";

@Table({
  tableName: "flats",
  comment: "Список доступных в доме квартир"
})
export default class Flat extends Model<Flat> {

  @Unique
  @Column({
    comment: "Номер квартиры"
  })
  number: number;

  @Index
  @Column({
    comment: "Секция / подъезд"
  })
  section: number;

  @Index
  @Column({
    comment: "Этаж"
  })
  floor: number;

  @Column({
    comment: "Количество комнат"
  })
  rooms: number;

  @Column({
    type: DataType.DOUBLE,
    comment: "Площадь квартиры"
  })
  square: number;

  @HasMany(() => Resident)
  residents: Resident[];
}