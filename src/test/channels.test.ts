import { HouseResponse } from "../responses";

(async () => {
  try {
    console.time("channels.test");
    const result = await HouseResponse.info(1);
    console.log(result);
    console.timeEnd("channels.test");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();