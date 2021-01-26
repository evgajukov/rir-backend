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
const axios_1 = require("axios");
class Dadata {
    static address(value) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Token " + Dadata.API_KEY,
                    "X-Secret": Dadata.API_SECRET
                }
            };
            const result = yield axios_1.default.post(Dadata.API_URL + Dadata.METHOD_ADDRESS, JSON.stringify([value]), config);
            return result.data;
        });
    }
}
exports.default = Dadata;
Dadata.API_URL = "https://cleaner.dadata.ru/api/v1/clean";
Dadata.API_KEY = "bea5b313ae276907f1d76cc1c2ac93a9902e11af";
Dadata.API_SECRET = "5a720bfcd74c746cd1c4cd2dff08a62b5c1d40f0";
Dadata.METHOD_ADDRESS = "/address";
