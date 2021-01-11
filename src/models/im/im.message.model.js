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
let IMMessage = class IMMessage extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.ForeignKey(() => __1.Person),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], IMMessage.prototype, "personId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Person),
    __metadata("design:type", __1.Person)
], IMMessage.prototype, "person", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.ForeignKey(() => __1.IMChannel),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], IMMessage.prototype, "channelId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.IMChannel),
    __metadata("design:type", __1.IMChannel)
], IMMessage.prototype, "channel", void 0);
__decorate([
    sequelize_typescript_1.Column({
        type: sequelize_typescript_1.DataType.JSON
    }),
    __metadata("design:type", Object)
], IMMessage.prototype, "body", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], IMMessage.prototype, "deleted", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.IMMessageShow),
    __metadata("design:type", Array)
], IMMessage.prototype, "shownPersons", void 0);
IMMessage = __decorate([
    sequelize_typescript_1.Table({
        tableName: "imMessages",
        comment: "Сообщения в чате"
    })
], IMMessage);
exports.default = IMMessage;
