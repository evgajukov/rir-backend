import { NotificationToken } from "../models";
import errors from "./errors";

export async function saveToken({ token }, respond) {
  console.log(">>>>> actions/notification.saveToken");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);

    await NotificationToken.create({ userId: this.authToken.id, token });

    respond(null, { status: "OK" });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}