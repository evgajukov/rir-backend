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
var Department_1;
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const __1 = require("..");
let Department = Department_1 = class Department extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.Index,
    sequelize_typescript_1.ForeignKey(() => __1.Company),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Department.prototype, "companyId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.Company),
    __metadata("design:type", __1.Company)
], Department.prototype, "company", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Department.prototype, "title", void 0);
__decorate([
    sequelize_typescript_1.ForeignKey(() => Department_1),
    sequelize_typescript_1.Column({
        comment: "Вышестоящий департамент"
    }),
    __metadata("design:type", Number)
], Department.prototype, "parentId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => Department_1),
    __metadata("design:type", Department)
], Department.prototype, "parent", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Resident),
    __metadata("design:type", Array)
], Department.prototype, "residents", void 0);
__decorate([
    sequelize_typescript_1.HasMany(() => __1.Vote),
    __metadata("design:type", Array)
], Department.prototype, "votes", void 0);
Department = Department_1 = __decorate([
    sequelize_typescript_1.Table({
        tableName: "departments",
        comment: "Список доступных в компании отделов"
    })
], Department);
exports.default = Department;
