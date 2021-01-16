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
    const flat = model.residents[0].flat;
    person.flat = {
        id: flat.id,
        number: flat.number,
        section: flat.section,
        floor: flat.floor
    };
    return person;
}
exports.getPerson = getPerson;
