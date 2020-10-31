import { tStatus } from "../../models/event/event.model";

export type tProcessStatus = {
  status: tStatus, // статус процесса
  code: number     // код ошибки
};

export const PROCESS_STATUS_CODES = {
  OK: 0,                         // все хорошо
  ERR_NOT_TRANSPORT_STS: 997,    // не указан СТС для ТС
  ERR_ABSTRACT: 998,             // абстрактный метод обработки процесса
  ERR_UNKNOWN: 999               // неизвестная ошибка
};

export default class Process {

  static STATUS_ABSTRACT: tStatus = "ABSTRACT";   // был вызван абстрактный процесс исполнения заявки (такой статус не должен попадать на UI)
  static STATUS_PROCESS: tStatus = "PROCESS";     // заявка принята и находится в процессе исполнения
  static STATUS_SENDING: tStatus = "SENDING";     // отправка промежуточных данных
  static STATUS_SUCCESS: tStatus = "SUCCESS";     // заявки исполнена
  static STATUS_ERROR: tStatus = "ERROR";         // ошибка при исполнении заявки
  static STATUS_FORBIDDEN: tStatus = "FORBIDDEN"; // доступ к исполнению заявки запрещен
  static STATUS_CANCEL: tStatus = "CANCEL";       // обработка процесса отменена дополнительным запросом

  protected name: string;
  protected data: any;

  constructor(name: string, data: any) {
    this.name = name;
    this.data = data;
  }

  async process() {
    try {
      await this.run();
    } catch (error) {
      this.error(error);
    }
  }

  protected async run(): Promise<tProcessStatus> {
    console.error("Процесс абстрактный и метод должен быть переопределен");
    return {
      status: Process.STATUS_ABSTRACT,
      code: PROCESS_STATUS_CODES.ERR_ABSTRACT
    };
  }

  protected async error(error) {
    console.error(error);
  }
}