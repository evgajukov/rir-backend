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
const createChannel = (title, house, section = null, floor = null) => __awaiter(void 0, void 0, void 0, function* () {
    let channel;
    if (house) {
        channel = yield models_1.IMChannel.findOne({ where: { house } });
    }
    else {
        channel = yield models_1.IMChannel.findOne({ where: { section, floor: floor } });
    }
    if (channel == null) {
        // новая еще не созданная группа
        console.log(`>>> создаем группу "${title}"`);
        channel = yield models_1.IMChannel.create({ title, house, section, floor });
        // сразу для него ненерируем системное сообщение
        yield models_1.IMMessage.create({ channelId: channel.id, body: { text: `Создана группа "${title}"` } });
    }
    // теперь подключаем всех необходимых пользователей
    console.log(`    >>> добавляем пользователей в группу`);
    let residents = [];
    if (house) {
        residents = yield models_1.Resident.findAll({ include: [{ model: models_1.Flat }] });
    }
    else {
        let flats = [];
        if (floor != null) {
            // группа по этажу
            flats = yield models_1.Flat.findAll({ where: { section, floor } });
        }
        else {
            // группа по секции
            flats = yield models_1.Flat.findAll({ where: { section } });
        }
        residents = yield models_1.Resident.findAll({ where: { flatId: flats.map(flat => flat.id) }, include: [{ model: models_1.Flat }] });
    }
    for (let resident of residents) {
        const channelPerson = yield models_1.IMChannelPerson.findOne({ where: { channelId: channel.id, personId: resident.personId } });
        if (channelPerson == null) {
            console.log(`        добавляем пользователя ${resident.personId}`);
            yield models_1.IMChannelPerson.create({ channelId: channel.id, personId: resident.personId });
            const flat = resident.flat;
            const flatTxt = `кв. ${flat.number}, этаж ${flat.floor}, подъезд ${flat.section}`;
            yield models_1.IMMessage.create({ channelId: channel.id, body: { text: `Сосед(ка) из ${flatTxt} вступил(а) в группу` } });
        }
    }
    console.log(`    завершили генерацию группы "${title}"`);
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("Запуск процесса загрузки стандартных групп чатов");
        // чат для всего дома
        yield createChannel("Общедомовой", true);
        // для формирования чатов секция и этажей сформируюем удобную структуру квартир в доме
        const flatsDB = yield models_1.Flat.findAll();
        let flats = {};
        for (let flat of flatsDB) {
            if (flats[flat.section] == null)
                flats[flat.section] = {};
            if (flats[flat.section][flat.floor] == null)
                flats[flat.section][flat.floor] = [];
            flats[flat.section][flat.floor].push(flat);
        }
        for (let section in flats) {
            // чат секции
            yield createChannel(`Секция №${section}`, false, parseInt(section));
            for (let floor in flats[section]) {
                if (flats[section][floor].length > 1) {
                    // чат этажа в секции
                    yield createChannel(`Этаж ${floor} в секции ${section}`, false, parseInt(section), parseInt(floor));
                }
            }
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
