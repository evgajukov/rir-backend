import EventHandler from "./handler";
import config from "../config";

(async () => {
  console.log(`Модуль бизнес логики запускается в среде: ${config.env}`);
  await EventHandler.run();
})();