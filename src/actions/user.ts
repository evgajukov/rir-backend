import { User, Person, Role, Resident, Flat } from "../models";
import * as numeral from "numeral";
import SMSC from "../lib/smsc";
import errors from "./errors";

export async function auth({ mobile, code }, respond) {
  console.log(">>>>> actions/user.auth");
  try {
    let user = await User.findOne({ where: { mobile } });
    if (user == null) {
      // не нашли пользователя по номеру телефона, заводим нового пользователя
      user = await User.create({ mobile });
    }
    if (user.banned) throw new Error(errors.user["002"].code);

    if (code == null) {
      // формируем и отправляем одноразовый код авторизации по смс
      user.smsCode = generateAuthCode();
      await user.save();
      await SMSC.send([mobile], user.smsCode);

      respond(null, { status: "OK" });
    } else {
      // проверяем, что код авторизации совпадает с присланным
      if (user.smsCode != code) throw new Error(errors.user["001"].code);
      // все хорошо
      const token = await newToken(user);
      this.setAuthToken(token);
      respond(null, token);
    }
  } catch (error) {
    console.error(error)
    respond(errors.methods.check(errors, error.message));
  }
}

export async function logout(params, respond) {
  console.log(">>>>> actions/user.logout");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    this.deauthenticate();
    respond(null, true);
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}

function generateAuthCode() {
  return numeral(9999 * Math.random()).format("0000");
}

async function newToken(user: User) {
  const person = await Person.findOne({ where: { userId: user.id } });
  const role = await Role.findByPk(user.roleId);
  const resident = await Resident.findOne({ where: { personId: person.id }, include: [{ model: Flat }] });

  const token = {
    id: user.id,
    mobile: user.mobile,
    banned: user.banned,
    role: { id: role.id, name: role.name },
    person,
    resident
  };
  console.log(`actions/user.newToken: ${JSON.stringify(token)}`);
  return token;
}