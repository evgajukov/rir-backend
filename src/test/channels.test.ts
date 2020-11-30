import VoteResponse from "../responses/vote/vote.response";

(async () => {
  try {
    const items = await VoteResponse.list(1);
    console.log(items);
  } catch (error) {
    console.error(error);
  } finally {
    process.exit(0);
  }
})();