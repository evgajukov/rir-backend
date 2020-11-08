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
                login: SMSC.options.login,
                psw: SMSC.options.password,
                charset: SMSC.options.charset,
                sender: SMSC.options.sender,
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
    login: "evgajukov",
    password: "Tck89mta7s3z",
    charset: "utf-8",
    translit: 0,
    sender: "SKHUB"
};
