import Cache from "../../lib/cache";
import { Department, Person, Resident, User, Vote, VoteAnswer, VotePerson, VoteQuestion } from "../../models";
import Response from "../response";

type tQuestion = {
  id: number,
  body?: string
};
type tPerson = {
  id: number,
  surname?: string,
  name?: string,
  midname?: string,
  department?: {
    id: number,
    title: string
  }
};
type tAnswer = {
  id: number,
  question: tQuestion,
  person: tPerson
};

export default class VoteResponse extends Response {

  title: string;
  createdAt: number;
  multi: boolean;
  anonymous: boolean;
  closed: boolean;
  company: boolean;
  department: {
    id: number,
    title: string
  };
  questions: tQuestion[];
  answers: tAnswer[];
  persons: number;

  constructor(model: Vote) {
    super(model.id);
    this.title = model.title;
    this.createdAt = model.createdAt.getTime();
    this.multi = model.multi;
    this.anonymous = model.anonymous;
    this.closed = model.closed;
    this.company = model.company;
    if (model.departmentId != null) {
      this.department = {
        id: model.department.id,
        title: model.department.title
      };
    }
    this.persons = model.persons.length;
    this.questions = model.questions.map(question => {
      return {
        id: question.id,
        body: question.body
      };
    });
    this.answers = model.answers.map(answer => {
      if (model.anonymous) {
        return {
          id: answer.id,
          question: { id: answer.questionId },
          person: {
            id: answer.personId
          }
        }
      }
      // дальше только для неанонимного голосования
      let department = null;
      if (answer.person.residents.length > 0) {
        const departmentInfo = answer.person.residents[0].department;
        department = {
          id: departmentInfo.id,
          title: departmentInfo.title
        };
      }
      let person = {
        id: answer.personId,
        surname: null,
        name: null,
        midname: null,
        department
      };
      const access = answer.person.access;
      if (access.name.level == "all") {
        if (access.name.format == "all") {
          person.surname = answer.person.surname;
          person.name = answer.person.name;
          person.midname = answer.person.midname;
        } else if (access.name.format == "name") {
          person.name = answer.person.name;
        }
      }
      return {
        id: answer.id,
        question: { id: answer.questionId },
        person
      };
    });
  }

  static create(model: Vote) {
    return new VoteResponse(model);
  }

  static async get(voteId: number) {
    const vote = await Vote.findByPk(voteId, { include: VoteResponse.include() });
    if (vote == null) return null;

    return VoteResponse.create(vote);
  }

  static async list(userId: number, withCache: boolean = true) {
    if (withCache) {
      console.time("vote.response.cache");
      const cacheData = await Cache.getInstance().get(`votes:${userId}`);
      console.timeEnd("vote.response.cache");
      if (cacheData != null) return JSON.parse(cacheData);
    }

    const person = await Person.findOne({ where: { userId } });
    if (person == null) return [];

    const list = await VotePerson.findAll({
      where: { personId: person.id },
      include: [
        {
          model: Vote,
          include: VoteResponse.include(),
        }
      ]
    });
    if (list == null || list.length == 0) return [];
    const result = list.map(item => VoteResponse.create(item.vote));
    if (withCache) Cache.getInstance().set(`votes:${userId}`, JSON.stringify(result));
    return result;
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return [];
    const user = await User.findByPk(socket.authToken.id);
    if (user == null || user.banned || user.deleted) return [];
    
    return await VoteResponse.list(socket.authToken.id);
  }

  private static include() {
    return [
      {
        model: Department,
        separate: true
      },
      {
        model: VotePerson,
        separate: true,
      },
      {
        model: VoteQuestion,
        separate: true,
      },
      {
        model: VoteAnswer,
        separate: true,
        include: [
          {
            model: Person,
            include: [
              {
                model: Resident,
                separate: true,
                include: [{ model: Department }]
              }
            ]
          }
        ]
      }
    ];
  }
}