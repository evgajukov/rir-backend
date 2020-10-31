import Process, { PROCESS_STATUS_CODES } from "./process";
import Sender from "../event/sender";

export default class UserProcess extends Process {

  protected userId: number;
  protected withProcessEvent: boolean;

  constructor(name: string, userId: number, data: any, withProcessEvent: boolean = true) {
    super(name, data);
    this.userId = userId;
    this.withProcessEvent = withProcessEvent;
  }

  async process() {
    try {
      if (this.data == null) this.data = {};
      this.data["status"] = UserProcess.STATUS_PROCESS;
      this.data["withProcessEvent"] = this.withProcessEvent;
      await Sender.event(this.userId, this.name, UserProcess.STATUS_PROCESS, this.data);

      const status = await this.run();

      this.data["status"] = status.status;
      this.data["code"] = status.code;
      await Sender.event(this.userId, this.name, status.status, this.data);
    } catch (error) {
      this.error(error);
    }
  }

  protected async error(error) {
    super.error(error);
    const data = { code: PROCESS_STATUS_CODES.ERR_UNKNOWN, error };
    await Sender.event(this.userId, this.name, UserProcess.STATUS_ERROR, data);
  }
}