import { Department, Person, Recommendation, RecommendationCategory, Resident } from "../../models";
import { tRecommendationExtra } from "../../models/recommendation/recommendation.model";
import Response from "../response";
import { getPerson, tPerson } from "../type/person.type";

export default class RecommendationResponse extends Response {

  title: string;
  body: string;
  extra: tRecommendationExtra;
  category: {
    id: number,
    name: string,
    img: string,
    sort: number
  };
  person: tPerson;

  constructor(model: Recommendation) {
    super(model.id);
    this.title = model.title;
    this.body = model.body;
    this.extra = model.extra;
    this.category = {
      id: model.category.id,
      name: model.category.name,
      img: model.category.img,
      sort: model.category.sort
    };
    this.person = getPerson(model.person);
  }

  static create(model: Recommendation) {
    return new RecommendationResponse(model);
  }

  static async get(recommendationId: number) {
    const item = await Recommendation.findByPk(recommendationId, { include: RecommendationResponse.include() })
    if (item == null) return null;
    return RecommendationResponse.create(item);
  }

  static async list() {
    const list = await Recommendation.findAll({ include: RecommendationResponse.include() });
    if (list == null || list.length == 0) return [];
    return list.map(item => RecommendationResponse.create(item));
  }

  static async seed(action, params, socket) {
    return await RecommendationResponse.list();
  }

  private static include() {
    return [
      {
        model: RecommendationCategory
      },
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
    ];
  }
}