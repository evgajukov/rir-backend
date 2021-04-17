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
exports.answer = exports.save = void 0;
const cache_1 = require("../lib/cache");
const push_1 = require("../lib/push");
const models_1 = require("../models");
const response_update_1 = require("../responses/response.update");
const errors_1 = require("./errors");
function save({ title, questions, anonymous, multi, type }, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/vote.save");
        try {
            if (!this.authToken)
                throw new Error(errors_1.default.user["004"].code);
            const user = yield models_1.User.findByPk(this.authToken.id);
            if (user == null)
                throw new Error(errors_1.default.user["003"].code);
            if (user.banned)
                throw new Error(errors_1.default.user["002"].code);
            if (user.deleted)
                throw new Error(errors_1.default.user["003"].code);
            const person = yield models_1.Person.findOne({ where: { userId: this.authToken.id } });
            const resident = yield models_1.Resident.findOne({ where: { personId: person.id }, include: [{ model: models_1.Department }] });
            const department = resident.department;
            // создаем голосование
            const company = type == "company";
            const departmentId = type == "department" ? department.id : null;
            const vote = yield models_1.Vote.create({ title, multi, anonymous, company, departmentId, userId: this.authToken.id });
            // добавляем вопросы к голосованию
            for (let question of questions) {
                const body = question.body;
                if (body != null && body.trim().length != 0) {
                    yield models_1.VoteQuestion.create({ voteId: vote.id, body });
                }
            }
            // генерируем список пользователей, которым доступно голосование
            let residents = [];
            if (type == "company") {
                // вся компания
                residents = yield models_1.Resident.findAll({ include: [{ model: models_1.Person }] });
            }
            else if (type == "department") {
                // весь депортамент c подотделами
                const departments = yield models_1.Department.findAll({ where: { parentId: department.id } });
                let departmentsIds = departments.map(department => department.id);
                departmentsIds.push(department.id);
                residents = yield models_1.Resident.findAll({ where: { departmentId: departmentsIds } });
            }
            for (let resident of residents) {
                models_1.VotePerson.create({ voteId: vote.id, personId: resident.personId });
                // если необходимо отправляем нотификации пользователям, но только не создателю
                if (resident.person.userId != this.authToken.id) {
                    const token = yield models_1.NotificationToken.findOne({ where: { userId: resident.person.userId } }); // FIXME: у пользователя может быть несколько устройств
                    if (token != null)
                        push_1.default.send({ body: title, uri: `/vote/${vote.id}`, to: token.token });
                }
            }
            cache_1.default.getInstance().clear("votes:*");
            // обновляем канал "votes"
            const responseUpdate = new response_update_1.default(this.exchange);
            responseUpdate.update({
                userId: this.authToken.id,
                createAt: new Date(),
                type: "VOTE.SAVE",
                status: "SUCCESS",
                data: JSON.stringify({ voteId: vote.id, event: "create" })
            });
            respond(null, { status: "OK" });
        }
        catch (error) {
            console.error(error);
            respond(errors_1.default.methods.check(errors_1.default, error.message));
        }
    });
}
exports.save = save;
function answer({ voteId, answers }, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/vote.answer");
        try {
            if (!this.authToken)
                throw new Error(errors_1.default.user["004"].code);
            const user = yield models_1.User.findByPk(this.authToken.id);
            if (user == null)
                throw new Error(errors_1.default.user["003"].code);
            if (user.banned)
                throw new Error(errors_1.default.user["002"].code);
            if (user.deleted)
                throw new Error(errors_1.default.user["003"].code);
            const person = yield models_1.Person.findOne({ where: { userId: this.authToken.id } });
            const votePerson = yield models_1.VotePerson.findOne({ where: { voteId, personId: person.id } });
            if (votePerson == null)
                throw new Error(errors_1.default.vote["002"].code);
            // сохраняем ответы
            if (answers != null && answers.length != 0) {
                for (let questionId of answers) {
                    if (questionId != null)
                        yield models_1.VoteAnswer.create({ voteId, questionId, personId: person.id });
                }
            }
            cache_1.default.getInstance().clear("votes:*");
            // обновляем канал "votes"
            const responseUpdate = new response_update_1.default(this.exchange);
            responseUpdate.update({
                userId: this.authToken.id,
                createAt: new Date(),
                type: "VOTE.ANSWER.SAVE",
                status: "SUCCESS",
                data: JSON.stringify({ voteId, event: "update" })
            });
            respond(null, { status: "OK" });
        }
        catch (error) {
            console.error(error);
            respond(errors_1.default.methods.check(errors_1.default, error.message));
        }
    });
}
exports.answer = answer;
