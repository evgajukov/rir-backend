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
const __1 = require("../..");
let User = class User extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Unique,
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "mobile", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], User.prototype, "smsCode", void 0);
__decorate([
    sequelize_typescript_1.Default(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], User.prototype, "banned", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => __1.Role),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], User.prototype, "roleId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Role),
    __metadata("design:type", __1.Role)
], User.prototype, "role", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Session),
    __metadata("design:type", Array)
], User.prototype, "sessions", void 0);
__decorate([
    sequelize_typescript_1.HasOne(() => __1.Person),
    __metadata("design:type", __1.Person)
], User.prototype, "person", void 0);
User = __decorate([
    sequelize_typescript_1.Table({
        tableName: "users"
    })
], User);
exports.default = User;
