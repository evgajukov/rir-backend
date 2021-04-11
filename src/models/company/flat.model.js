"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const __1 = require("..");
let Flat = class Flat extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.ForeignKey(() => __1.Company),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Flat.prototype, "companyId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Company),
    __metadata("design:type", __1.Company)
], Flat.prototype, "company", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column({
        comment: "Номер квартиры"
    }),
    __metadata("design:type", Number)
], Flat.prototype, "number", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column({
        comment: "Секция / подъезд"
    }),
    __metadata("design:type", Number)
], Flat.prototype, "section", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Column({
        comment: "Этаж"
    }),
    __metadata("design:type", Number)
], Flat.prototype, "floor", void 0);
__decorate([
    sequelize_typescript_1.Column({
        comment: "Количество комнат"
    }),
    __metadata("design:type", Number)
], Flat.prototype, "rooms", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.DOUBLE,
        comment: "Площадь квартиры"
    }),
    __metadata("design:type", Number)
], Flat.prototype, "square", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Resident),
    __metadata("design:type", Array)
], Flat.prototype, "residents", void 0);
Flat = __decorate([
    sequelize_typescript_1.Table({
        tableName: "flats",
        comment: "Список доступных в доме квартир"
    })
], Flat);
exports.default = Flat;
