import { Column, DataType, Model, Table } from "sequelize-typescript";

export interface iInstructionItem {
  id: number;
  title: string;
  subtitle: string;
  body: string;
}

@Table({
  tableName: "instructions",
  comment: "Список инструкций"
})
export default class Instruction extends Model<Instruction> {

  @Column
  title: string;

  @Column
  subtitle: string;

  @Column({
    type: DataType.JSON,
    comment: "json со списком шагов"
  })
  body: iInstructionItem[];
}