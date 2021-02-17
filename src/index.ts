import * as responses from "./responses";
import publishHooks from "./lib/publish_hooks";
import handleSocket from "./socket_handler";
import { User } from "./models";

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
}

function includes(list: Array<string>, str: string): boolean {
  for (let item of list) {
    if (item == str) {
      return true;
    }
  }
  return false;
}