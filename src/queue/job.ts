import Queue, { tQueueStatus } from "./queue.model";

export type tJobHandler = (job: Job, error?: string) => void;

export default class Job {
  
  private _id: number;
  private prefix: string;
  private name: string;
  private _data: any;

  get id() {
    return this._id;
  }

  get data() {

    return this._data;
  }

  constructor(prefix: string, name: string, data: any) {

    this.prefix = prefix;
    this.name = name;
    this._data = data;
  }

  static async load(prefix: string, name: string, status: tQueueStatus, newStatus?: tQueueStatus) {

    const model = await Queue.findOne({ where: { prefix, name, status } });
    if (model == null) return null;

    if (newStatus) await model.update({ status: newStatus });

    const job = new Job(model.prefix, model.name, JSON.parse(model.data));
    job.setId(model.id);
    
    return job;
  }

  async save(handler: tJobHandler): Promise<Job> {

    try {
      const model = await Queue.create({
        prefix: this.prefix,
        name: this.name,
        data: JSON.stringify(this._data)
      });
      this._id = model.id;
      if (handler) handler(this);
    } catch (error) {
      if (handler) handler(this, error.message);
    }

    return this;
  }

  async reset() {
    // console.log(`>>>>> job.reset`);
    // console.log(`      >>> ID: ${this._id}`);
    const model = await Queue.findByPk(this._id);
    if (model != null) {
      await model.update({ status: "NEW" });
      // console.log(`      >>> job founded and update to NEW`);
    } else {
      // console.log(`      >>> job not founded !!!!!!!!!!`);
    }
  }

  async done() {

    // console.log(`>>>>> job.done`);
    // console.log(`      >>> ID: ${this._id}`);
    const model = await Queue.findByPk(this._id);
    if (model != null) {
      await model.update({ status: "SUCCESS" });
      // console.log(`      >>> job founded and update to SUCCESS`);
    } else {
      // console.log(`      >>> job not founded !!!!!!!!!!`);
    }
    Queue.destroy({ where: { status: "SUCCESS" } });
  }

  private setId(id: number) {

    this._id = id;
  }
}