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
const models_1 = require("../models");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Запуск процесса загрузки данных по компании");
        const title = "ЦПИРУГ";
        let company = yield models_1.Company.findOne({ where: { title } });
        if (company == null) {
            company = yield models_1.Company.create({ title });
        }
        yield company.save();
        const flats = yield models_1.Flat.findAll({ where: { companyId: null } });
        for (let flat of flats) {
            console.log(`>>> привязываем квартиру №${flat.number} к дому`);
            flat.companyId = company.id;
            yield flat.save();
        }
        console.log("Завершение процесса");
    }
    catch (error) {
        console.error(error);
    }
    finally {
        process.exit(0);
    }
}))();
