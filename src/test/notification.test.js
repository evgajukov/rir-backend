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
const push_1 = require("../lib/push");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield push_1.default.send("К нам присоединился новый сосед с кв. №358, этаж 11, подъезд 3", "/flat/358", "eyKuePoDhhWweCjFF6zct7:APA91bELfEzVZk-rvfgTTkE7saILTr6cBQL2bktvW-KtnrB9pehA3Q_SfIMcLrdtCqizMpdWXvmQ-Xyx7zobPWjVcnvIpOVhDKBHp_XOq1MWtdvrKcmISvDbHlfVTJid_hZrgO1WJJXF");
    console.log(result.data);
}))();
