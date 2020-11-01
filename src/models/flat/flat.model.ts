import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import { Resident } from "..";

@Table({
  tableName: "flats",
  comment: "Список доступных в доме квартир"
})
export default class Flat extends Model<Flat> {

  @Column({
    comment: "Номер квартиры"
  })
  number: number;

  @Column({
    comment: "Секция / подъезд"
  })
  section: number;

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