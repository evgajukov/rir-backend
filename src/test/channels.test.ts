import { RecommendationResponse } from "../responses";

(async () => {
  try {
    console.time("channels.test");
    const result = await RecommendationResponse.list();
    console.log(result);
    console.timeEnd("channels.test");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();