import { IMChannelPerson, IMMessage, IMMessageShow, Person } from "../models";
import ResponseUpdate from "../responses/response.update";
import errors from "./errors";

export async function save({ channelId, body }, respond) {
  console.log(">>>>> actions/im.save");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    const person = await Person.findOne({ where: { userId: this.authToken.id } });

    const channelPerson = await IMChannelPerson.findOne({ where: { channelId, personId: person.id } });
    if (channelPerson == null) throw new Error(errors.im["001"].code);

    const message = await IMMessage.create({ personId: person.id, channelId, body });
    await IMMessageShow.create({ personId: person.id, messageId: message.id });

    // обновляем канал с группами чатов и конкретную группу
    const responseUpdate = new ResponseUpdate(this.exchange);
    await responseUpdate.update({
      userId: this.authToken.id,
      createAt: new Date(),
      type: "IM.SAVE",
      status: "SUCCESS",
      data: JSON.stringify({ messageId: message.id, event: "create" })
    });

    respond(null, { status: "OK" });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}