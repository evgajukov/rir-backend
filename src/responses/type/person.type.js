"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPerson = void 0;
function getPerson(model) {
    let person = {
        id: model.id
    };
    const access = model.access;
    if (access.name.level == "all") {
        if (access.name.format == "all") {
            person.surname = model.surname;
            person.name = model.name;
            person.midname = model.midname;
        }
        else if (access.name.format == "name") {
            person.name = model.name;
        }
    }
    if (model.residents != null && model.residents.length > 0) {
        const department = model.residents[0].department;
        person.department = {
            id: department.id,
            number: department.number,
            section: department.section,
            floor: department.floor
        };
    }
    person.deleted = false;
    if (model.user != null)
        person.deleted = model.user.deleted;
    return person;
}
exports.getPerson = getPerson;
