import Event from "./event/event.response";
import Ping from "./ping/ping.response";

import UserResponse from "./user/user.response";

const channels = {
  events: {
    action: "LIST", // events.userId
    response: Event
  },
  ping: {
    action: "PING", // ping
    response: Ping
  },
  user: {
    action: "INFO", // user.userId
    response: UserResponse
  },
}

export {
  channels, Event, Ping,
  UserResponse
};