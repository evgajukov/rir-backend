import { Person } from "../../models";

export type tPerson = {
  id: number,
  surname?: string,
  name?: string,
  midname?: string,
  flat?: {
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

  const flat = model.residents[0].flat;
  person.flat = {
    id: flat.id,
    number: flat.number,
    section: flat.section,
    floor: flat.floor
  };

  return person;
}