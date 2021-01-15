import ResponseUpdate from "../responses/response.update";
import errors from "./errors";

export function update({ id, name, event }, respond) {
  console.log(">>>>> actions/admin.update", name);
  try {
    const responseUpdate = new ResponseUpdate(this.exchange);
    if (name == "post") {
      // обновляем канал "posts"
      responseUpdate.update({
        createAt: new Date(),
        type: "POST.SAVE",
        status: "SUCCESS",
        data: JSON.stringify({ postId: id, event })
      });
    }

    respond(null, { status: "OK" });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}