"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const moment = require("moment");
class DateUtilities {
    /**
     * Возвращает скорректированную дату
     * @param date дата, относительно которой выдавать новую дату
     * @param corrects массив с данными по корректировкам (последовательность имеет значение)
     */
    static getDate(date, corrects) {
        let newDate = date;
        if (corrects && corrects.length != 0) {
            for (let item of corrects) {
                switch (item.type) {
                    case "DAY":
                        newDate.setDate(newDate.getDate() + item.correct);
                        break;
                    case "MONTH":
                        newDate.setMonth(newDate.getMonth() + item.correct);
                        break;
                    case "YEAR":
                        newDate.setFullYear(newDate.getFullYear() + item.correct);
                        break;
                    case "HOUR":
                        newDate.setHours(newDate.getHours() + item.correct);
                        break;
                    case "MINUTE":
                        newDate.setMinutes(newDate.getMinutes() + item.correct);
                        break;
                }
            }
        }
        return newDate;
    }
    /**
     * Возвращает из строки дату бе времени
     * @param strDate
     * @param format
     */
    static toDate(strDate, format = "DD.MM.YYYY") {
        return new Date(moment(strDate, format).format("YYYY-MM-DD"));
    }
}
exports.default = DateUtilities;
