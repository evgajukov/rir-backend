import { FlatResponse } from "../responses";

(async () => {
  try {
    console.time("channels.test");
    const items = await FlatResponse.list();
    console.log(items[422]);
    console.timeEnd("channels.test");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();