import { User, Person, Role, Resident, Flat, Invite } from "../models";
import * as numeral from "numeral";
import SMSC from "../lib/smsc";
import errors from "./errors";

export async function auth({ mobile, invite, code }, respond) {
  console.log(">>>>> actions/user.auth");
  try {
    let user = await User.findOne({ where: { mobile } });
    if (user == null) {
      if (invite == null) {
        throw new Error(errors.user["003"].code);
      } else {
        // проверяем корректность кода приглашения и, если все хорошо, то регистрируем нового пользователя
        let inviteDb = await Invite.findOne({ where: { code: invite, used: false } });
        if (inviteDb == null) throw new Error(errors.invite["001"].code);
        user = await User.create({ mobile, roleId: 2 }); // 2 - USER
        inviteDb.used = true;
        inviteDb.newUserId = user.id;
        await inviteDb.save();
      }
    }
    if (user.banned) throw new Error(errors.user["002"].code);

    if (code == null) {
      // формируем и отправляем одноразовый код авторизации по смс
      user.smsCode = generateCode(4);
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

export async function invite(params, respond) {
  console.log(">>>>> actions/user.invite");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    let code = null;
    let inviteDb = null;
    do {
      code = generateCode(6);
      inviteDb = await Invite.findOne({ where: { code } });
    } while (inviteDb != null);
    await Invite.create({ userId: this.authToken.id, code });
    respond(null, { invite: code });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}

export async function saveProfile({ surname, name, midname, flat }, respond) {
  console.log(">>>>> actions/user.saveProfile");
  try {
    if (!this.authToken) throw new Error(errors.user["004"].code);
    let person = await Person.findOne({ where: { userId: this.authToken.id } });
    if (person == null) {
      // только что зарегистрировались и еще нет профиля
      person = await Person.create({ userId: this.authToken.id, surname, name, midname });
      await Resident.create({ personId: person.id, flatId: flat });
    } else {
      // обновляем только данные по персоне, изменения по квартире пока игнорируем
      person.surname = surname;
      person.name = name;
      person.midname = midname;
      await person.save();
    }
    const resident = await Resident.findOne({ where: { personId: person.id }, include: [{ model: Flat }] });
    respond(null, { status: "OK", person, resident });
  } catch (error) {
    console.error(error);
    respond(errors.methods.check(errors, error.message));
  }
}

function generateCode(len: number) {
  return numeral(parseInt("9".repeat(len)) * Math.random()).format("0".repeat(len));
}

async function newToken(user: User) {
  const person = await Person.findOne({ where: { userId: user.id } });
  const role = await Role.findByPk(user.roleId);
  
  let resident = null;
  if (person != null) resident = await Resident.findOne({ where: { personId: person.id }, include: [{ model: Flat }] });

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