import { Person } from "../../models";

export type tPerson = {
  id: number,
  surname?: string,
  name?: string,
  midname?: string,
  deleted?: boolean,
  department?: {
    id: number,
    number: number,
    section: number,
    floor: number
  }
};

export function getPerson(model: Person): tPerson {
  let person: tPerson = {
    id: model.id
  };

  const access = model.access;
  if (access.name.level == "all") {
    if (access.name.format == "all") {
      person.surname = model.surname;
      person.name = model.name;
      person.midname = model.midname;
    } else if (access.name.format == "name") {
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
  if (model.user != null) person.deleted = model.user.deleted;

  return person;
}