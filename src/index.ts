import * as responses from "./responses";
import publishHooks from "./lib/publish_hooks";
import handleSocket from "./socket_handler";
import { User } from "./models";
import Queue from "./queue";
import config from "./config";
import ResponseUpdate from "./responses/response.update";

export default async function run(worker) {
  const scServer = worker.scServer;
  scServer.on("connection", handleSocket);
  for (let response in responses) {
    if (response == "channels") continue;
    publishHooks(responses[response], scServer.exchange);
  }

  scServer.addMiddleware(scServer.MIDDLEWARE_EMIT, async (req, next) => {
    const allowedEvents = ['user.logout'];
    if (includes(allowedEvents, req.event)) return next();
    if (req.socket.authState !== req.socket.AUTHENTICATED) return next();
    const user = await User.findByPk(req.socket.authToken.id);
    if (user.banned) return next(new Error("BANNED"));
    else if (user.deleted) return next(new Error("DELETED"));
    return next(null);
  });

  const queue = new Queue(config.kue_web.prefix);
  queue.process("EVENT", async job => {
    console.log(`HANDLER JOB (ID: ${job.id}) TYPE "EVENT": ${JSON.stringify(job.data)}`);

    // обновляем данные в каналах
    const responseUpdate = new ResponseUpdate(scServer.exchange);
    await responseUpdate.update(job.data);

    await job.done();
  });
}

function includes(list: Array<string>, str: string): boolean {
  for (let item of list) {
    if (item == str) {
      return true;
    }
  }
  return false;
}