import { InviteResponse } from "../responses";

(async () => {
  try {
    console.time("channels.test");
    const items = await InviteResponse.list(1, 1000);
    console.log(items[0]);
    console.timeEnd("channels.test");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();