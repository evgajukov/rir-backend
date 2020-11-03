import HttpUtilities from "../../utilities/http_utilities";

export default class SMSC {
  
  private static options = {
    api: {
      send: "https://smsc.ru/sys/send.php"
    },
    login: "evgajukov",
    password: "Tck89mta7s3z",
    charset: "utf-8",
    translit: 0,
    sender: "YAPACAR"
  };

  static async send(phones: Array<string>, message: string) {
    const phonesString = phones.join(",");
    console.log(`Отправка смс на номера: ${phonesString}`);
    console.log(`Сообщение: ${message}`);
    const data = {
      login: SMSC.options.login,
      psw: SMSC.options.password,
      charset: SMSC.options.charset,
      sender: SMSC.options.sender,
      phones: phonesString,
      mes: message
    };
    const result = await HttpUtilities.postContent(SMSC.options.api.send, data, "form");
    console.log(`>>> RESULT: ${result}`);
  }
}