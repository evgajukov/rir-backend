"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PROCESS_STATUS_CODES = void 0;
exports.PROCESS_STATUS_CODES = {
    OK: 0,
    ERR_NOT_TRANSPORT_STS: 997,
    ERR_ABSTRACT: 998,
    ERR_UNKNOWN: 999 // неизвестная ошибка
};
class Process {
    constructor(name, data) {
        this.name = name;
        this.data = data;
    }
    process() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.run();
            }
            catch (error) {
                this.error(error);
            }
        });
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            console.error("Процесс абстрактный и метод должен быть переопределен");
            return {
                status: Process.STATUS_ABSTRACT,
                code: exports.PROCESS_STATUS_CODES.ERR_ABSTRACT
            };
        });
    }
    error(error) {
        return __awaiter(this, void 0, void 0, function* () {
            console.error(error);
        });
    }
}
exports.default = Process;
Process.STATUS_ABSTRACT = "ABSTRACT"; // был вызван абстрактный процесс исполнения заявки (такой статус не должен попадать на UI)
Process.STATUS_PROCESS = "PROCESS"; // заявка принята и находится в процессе исполнения
Process.STATUS_SENDING = "SENDING"; // отправка промежуточных данных
Process.STATUS_SUCCESS = "SUCCESS"; // заявки исполнена
Process.STATUS_ERROR = "ERROR"; // ошибка при исполнении заявки
Process.STATUS_FORBIDDEN = "FORBIDDEN"; // доступ к исполнению заявки запрещен
Process.STATUS_CANCEL = "CANCEL"; // обработка процесса отменена дополнительным запросом
