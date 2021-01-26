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
const dadata_1 = require("../lib/dadata");
const models_1 = require("../models");
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Запуск процесса загрузки данных по дому");
        const address = "Московская обл, г Мытищи, ул Мира, д 35";
        let house = yield models_1.House.findOne({ where: { address } });
        if (house == null) {
            house = yield models_1.House.create({ address });
        }
        house.dadata = yield dadata_1.default.address(address);
        house.lat = 55.917465;
        house.lon = 37.722909;
        yield house.save();
        const flats = yield models_1.Flat.findAll({ where: { houseId: null } });
        for (let flat of flats) {
            console.log(`>>> привязываем квартиру №${flat.number} к дому`);
            flat.houseId = house.id;
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
