import Response from "../response";

export default class Ping extends Response {
  static async seed(action, params) {
    const env = process.env.NODE_ENV;
    return { id: 1, status: "ok", env };
  }
}