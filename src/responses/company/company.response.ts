import { Department, Company, Person, Resident } from "../../models";
import Response from "../response";

export default class CompanyResponse extends Response {

  title: string;
  extra: any;

  constructor(model: Company) {
    super(model.id);
    this.title = model.title;
    this.extra = model.extra;
  }

  static create(model: Company) {
    return new CompanyResponse(model);
  }

  static async info(userId: number) {
    const person = await Person.findOne({
      where: { userId },
      include: [
        {
          model: Resident,
          include: [{ model: Department }]
        }
      ]
    });
    const companyId = (person != null && person.residents.length != 0) ? person.residents[0].department.companyId : 1;
    const company = await Company.findByPk(companyId);
    if (company == null) return null;
    return CompanyResponse.create(company);
  }

  static async seed(action, params, socket) {
    if (socket.authToken == null) return null;
    return await CompanyResponse.info(socket.authToken.id);
  }
}