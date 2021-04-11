import { Flat, Company } from "../models";

(async () => {
  try {
    console.log("Запуск процесса загрузки данных по компании");
    const title = "ЦПИРУГ";
    let company = await Company.findOne({ where: { title } });
    if (company == null) {
      company = await Company.create({ title });
    }

    await company.save();

    const flats = await Flat.findAll({ where: { companyId: null } });
    for (let flat of flats) {
      console.log(`>>> привязываем квартиру №${flat.number} к дому`);
      flat.companyId = company.id;
      await flat.save();
    }
    console.log("Завершение процесса");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();