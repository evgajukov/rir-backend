import { Column, Model, Table } from "sequelize-typescript";

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
}