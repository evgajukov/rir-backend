import { PostResponse } from "../responses";

(async () => {
  try {
    console.time("channels.test");
    const items = await PostResponse.list("pinned");
    console.log(items.length);
    console.timeEnd("channels.test");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();