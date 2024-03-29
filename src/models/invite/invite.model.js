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
let Invite = class Invite extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Invite.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, "userId"),
    __metadata("design:type", __1.User)
], Invite.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Invite.prototype, "code", void 0);
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Invite.prototype, "used", void 0);
__decorate([
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Invite.prototype, "newUserId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User, "newUserId"),
    __metadata("design:type", __1.User)
], Invite.prototype, "newUser", void 0);
Invite = __decorate([
    sequelize_typescript_1.Table({
        tableName: "invites",
        comment: "Список приглашений"
    })
], Invite);
exports.default = Invite;
