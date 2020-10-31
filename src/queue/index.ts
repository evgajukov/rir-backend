import Job from "./job";

export type tQueueProcessHandler = (job: Job) => void;

export default class Queue {

  private static INTERVAL = 1000;

  private prefix: string;

  constructor(prefix: string) {

    this.prefix = prefix;
    console.log(`QUEUE PREFIX: ${prefix}`);
  }

  create(name: string, data: any): Job {
    
    return new Job(this.prefix, name, data);
  }

  async process(name: string, handler: tQueueProcessHandler) {

    console.log(`QUEUE PROCESS: ${name}`);
    setInterval(async () => {
      
      const job = await Job.load(this.prefix, name, "NEW", "PROCESS");
      if (job == null) return;

      if (handler) await handler(job);
    }, Queue.INTERVAL);
  }
}