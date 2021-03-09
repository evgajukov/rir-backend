import HttpUtilities from "../../utilities/http_utilities";

export default class SMSC {
  
  private static options = {
    api: {
      send: "https://smsc.ru/sys/send.php"
    },
    charset: "utf-8",
    translit: 0,
  };

  static async send(phones: Array<string>, message: string) {
    const phonesString = phones.join(",");
    console.log(`Отправка смс на номера: ${phonesString}`);
    console.log(`Сообщение: ${message}`);
    const data = {
      login: process.env.SMSC_LOGIN,
      psw: process.env.SMSC_PASSWORD,
      charset: SMSC.options.charset,
      sender: process.env.SMSC_SENDER,
      phones: phonesString,
      mes: message
    };
    const result = await HttpUtilities.postContent(SMSC.options.api.send, data, "form");
    console.log(`>>> RESULT: ${result}`);
  }
}