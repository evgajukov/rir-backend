import { Version } from "../models";
import errors from "./errors";

export async function current(params, respond) {
  console.log(">>>>> actions/version.current");
  try {
    const version = await Version.findOne({ order: [["id", "desc"]] });
    respond(null, { number: version.number, build: version.build });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}