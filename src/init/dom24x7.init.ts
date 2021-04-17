import { Department, Company } from "../models";

(async () => {
  try {
    console.log("Запуск процесса загрузки данных по компании");
    const title = "ЦПИРУГ";
    let company = await Company.findOne({ where: { title } });
    if (company == null) {
      company = await Company.create({ title });
    }

    await company.save();

    const departments = await Department.findAll({ where: { companyId: null } });
    for (let department of departments) {
      console.log(`>>> привязываем квартиру №${department.number} к дому`);
      department.companyId = company.id;
      await department.save();
    }
    console.log("Завершение процесса");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();