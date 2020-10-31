import EventResponse from "./event/event.response";
import PingResponse from "./ping/ping.response";
import FlatResponse from "./flat/flat.response";
import UserResponse from "./user/user.response";

const channels = {
  events: {
    action: "LIST", // events.userId
    response: EventResponse
  },
  ping: {
    action: "PING", // ping
    response: PingResponse
  },
  flats: {
    action: "LIST", // flats
    response: FlatResponse
  },
  user: {
    action: "INFO", // user.userId
    response: UserResponse
  },
}

export { channels, EventResponse, PingResponse, FlatResponse, UserResponse };