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
let IMChannelPerson = class IMChannelPerson extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.ForeignKey(() => __1.IMChannel),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], IMChannelPerson.prototype, "channelId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.IMChannel),
    __metadata("design:type", __1.IMChannel)
], IMChannelPerson.prototype, "channel", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.ForeignKey(() => __1.Person),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], IMChannelPerson.prototype, "personId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Person),
    __metadata("design:type", __1.Person)
], IMChannelPerson.prototype, "person", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], IMChannelPerson.prototype, "mute", void 0);
IMChannelPerson = __decorate([
    sequelize_typescript_1.Table({
        tableName: "imChannelPersons",
        comment: "Участники группового чата"
    })
], IMChannelPerson);
exports.default = IMChannelPerson;
