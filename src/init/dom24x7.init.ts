import Dadata from "../lib/dadata";
import { Flat, House } from "../models";

(async () => {
  try {
    console.log("Запуск процесса загрузки данных по дому");
    const address = "Московская обл, г Мытищи, ул Мира, д 35";
    let house = await House.findOne({ where: { address } });
    if (house == null) {
      house = await House.create({ address });
    }

    house.dadata = await Dadata.address(address);
    house.lat = 55.917465;
    house.lon = 37.722909;
    await house.save();

    const flats = await Flat.findAll({ where: { houseId: null } });
    for (let flat of flats) {
      console.log(`>>> привязываем квартиру №${flat.number} к дому`);
      flat.houseId = house.id;
      await flat.save();
    }
    console.log("Завершение процесса");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();