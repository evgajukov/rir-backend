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
const http_utilities_1 = require("../../utilities/http_utilities");
class SMSC {
    static send(phones, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const phonesString = phones.join(",");
            console.log(`Отправка смс на номера: ${phonesString}`);
            console.log(`Сообщение: ${message}`);
            const data = {
                login: process.env.SMSC_LOGIN,
                psw: process.env.SMSC_PASSWORD,
                charset: SMSC.options.charset,
                sender: process.env.SMSC_SENDER,
                phones: phonesString,
                mes: message
            };
            const result = yield http_utilities_1.default.postContent(SMSC.options.api.send, data, "form");
            console.log(`>>> RESULT: ${result}`);
        });
    }
}
exports.default = SMSC;
SMSC.options = {
    api: {
        send: "https://smsc.ru/sys/send.php"
    },
    charset: "utf-8",
    translit: 0,
};
