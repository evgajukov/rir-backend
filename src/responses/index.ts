import EventResponse from "./event/event.response";
import AllResponse from "./all/all.response";
import PingResponse from "./ping/ping.response";
import FlatResponse from "./flat/flat.response";
import UserResponse from "./user/user.response";
import PostResponse from "./post/post.response";
import InstructionResponse from "./instruction/instruction.response";
import InviteResponse from "./invite/invite.response";
import DocumentResponse from "./document/document.response";
import FAQResponse from "./faq/faq.response";
import VoteResponse from "./vote/vote.response";

const channels = {
  events: {
    action: "LIST", // events.userId
    response: EventResponse
  },
  ping: {
    action: "PING", // ping
    response: PingResponse
  },
  all: {
    action: "INIT", // all.channelName
    response: AllResponse
  },
  flats: {
    action: "LIST", // flats
    response: FlatResponse
  },
  user: {
    action: "INFO", // user.userId
    response: UserResponse
  },
  posts: {
    action: "LIST", // posts
    response: PostResponse
  },
  instructions: {
    action: "LIST", // instructions
    response: InstructionResponse
  },
  invites: {
    action: "LIST", // invites.userId
    response: InviteResponse
  },
  documents: {
    action: "LIST", // documents
    response: DocumentResponse
  },
  faq: {
    action: "LIST", // faq
    response: FAQResponse
  },
  votes: {
    action: "LIST", // votes.userId
    response: VoteResponse
  },
}

export { channels, EventResponse, PingResponse, FlatResponse, UserResponse, PostResponse, InstructionResponse, InviteResponse, DocumentResponse, VoteResponse };