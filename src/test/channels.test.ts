import VoteResponse from "../responses/vote/vote.response";

(async () => {
  try {
    console.time("channels.test");
    const items = await VoteResponse.list(1, false);
    console.log(items);
    console.timeEnd("channels.test");
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();