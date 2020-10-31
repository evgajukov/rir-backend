export default class Response {

  id: number;
  protected model?: any; // модель данных, если имеется, на основе которой создан объект
  protected message?: any; // дополнительные данные, например, статус и код обработки процесса

  constructor(id?: number, model?: any, message?: any) {
    this.id = id;
    this.model = model;
    this.message = message;
  }
}