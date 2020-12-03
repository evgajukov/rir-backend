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
exports.answer = void 0;
const models_1 = require("../models");
const response_update_1 = require("../responses/response.update");
const errors_1 = require("./errors");
function answer({ voteId, answers }, respond) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(">>>>> actions/vote.answer");
        try {
            if (!this.authToken)
                throw new Error(errors_1.default.user["004"].code);
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
            // обновляем канал "votes"
            const responseUpdate = new response_update_1.default(this.exchange);
            yield responseUpdate.update({
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
