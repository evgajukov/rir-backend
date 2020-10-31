// import config from "../config";
// import Queue from "../queue";
import Job from "../queue/job";
// import Event from "./event/event";
// import Schedule from "./event/schedule";

export default class EventHandler {

  // private static queue = new Queue(config.kue_pl.prefix_without_srv);
  private static busy = false;

  static async run() {

    console.log("   >> EventHandler.run");

    // Event.run();
    // Schedule.run();
  }

  static async handler(name: string, job: Job, func) {
    console.log(`HANDLER JOB (ID: ${job.id}) TYPE "${name}": ${JSON.stringify(job.data)}`);

    if (EventHandler.busy) {
      console.log(`>>>>> HANDLER JOB (ID: ${job.id}) TYPE "${name}" IS BUSY`);
      await job.reset();
    }

    try {
      EventHandler.busy = true;
      if (func) await func(job);
    } catch (error) {
      console.error(error);
    } finally {
      EventHandler.busy = false;
    }

    await job.done();
  }
}