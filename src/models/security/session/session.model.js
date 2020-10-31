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
const sequelize_typescript_1 = require("sequelize-typescript");
const __1 = require("../../");
let Session = class Session extends sequelize_typescript_1.Model {
};
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Session.prototype, "uuid", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.ForeignKey(() => __1.User),
    sequelize_typescript_1.Column,
    __metadata("design:type", Number)
], Session.prototype, "userId", void 0);
__decorate([
    sequelize_typescript_1.BelongsTo(() => __1.User),
    __metadata("design:type", __1.User)
], Session.prototype, "user", void 0);
__decorate([
    sequelize_typescript_1.AllowNull(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Session.prototype, "ip", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Session.prototype, "forwardedIp", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Session.prototype, "login", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Session.prototype, "logout", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Session.prototype, "online", void 0);
Session = __decorate([
    sequelize_typescript_1.Table({
        tableName: "sessions"
    })
], Session);
exports.default = Session;
Object.assign(Session, {
    onLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            const { request, authToken } = this;
            const { connection, headers } = request;
            yield Session.create({
                uuid: this.id,
                userId: authToken.id,
                ip: connection.remoteAddress,
                forwardedIp: headers["x-forwarded-for"]
            });
        });
    },
    onLogout(t) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = this.authToken || t;
            if (!token)
                return;
            const session = yield Session.findOne({ where: { uuid: this.id } });
            if (!session)
                return;
            session.update({ logout: new Date(), online: false });
        });
    }
});
// Instance methods
Object.assign(Session.prototype, {});
