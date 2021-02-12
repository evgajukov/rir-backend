import { Flat, Person, Recommendation, RecommendationCategory, Resident } from "../../models";
import Response from "../response";
import { getPerson, tPerson } from "../type/person.type";

export default class RecommendationResponse extends Response {

  title: string;
  body: string;
  extra: any;
  category: {
    id: number,
    name: string
  };
  person: tPerson;

  constructor(model: Recommendation) {
    super(model.id);
    this.title = model.title;
    this.body = model.body;
    this.extra = model.extra;
    this.category = {
      id: model.category.id,
      name: model.category.name
    };
    this.person = getPerson(model.person);
  }

  static create(model: Recommendation) {
    return new RecommendationResponse(model);
  }

  static async list() {
    const list = await Recommendation.findAll({
      include: [
        {
          model: RecommendationCategory
        },
        {
          model: Person,
          include: [
            {
              model: Resident,
              separate: true,
              include: [{ model: Flat }]
            }
          ]
        }
      ]
    });
    if (list == null || list.length == 0) return [];
    return list.map(item => RecommendationResponse.create(item));
  }

  static async seed(action, params, socket) {
    return await RecommendationResponse.list();
  }
}