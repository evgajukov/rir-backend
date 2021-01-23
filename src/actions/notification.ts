import { NotificationToken, User } from "../models";
import errors from "./errors";

export async function saveToken({ token }, respond) {
  console.log(">>>>> actions/notification.saveToken");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    const user = await User.findByPk(this.authToken.id);
    if (user == null) throw new Error(errors.user["003"].code);
    if (user.banned) throw new Error(errors.user["002"].code);
    if (user.deleted) throw new Error(errors.user["003"].code);

    const notifToken = await NotificationToken.findOne({ where: { token } });
    if (!notifToken) await NotificationToken.create({ userId: this.authToken.id, token });

    respond(null, { status: "OK" });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}