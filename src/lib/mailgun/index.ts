export default class Mailgun {
  static API_KEY = "059a03808ca3f9eb35053d2b0d442ba1-73ae490d-11c6199c";
  static DOMAIN = "mg.yapacar.com";
  static FROM = "YapaCar <noreply@yapacar.com>";

  private mail: any;
  private from: string;

  constructor(apiKey: string, domain: string, from: string) {
    this.mail = require("mailgun-js")({ apiKey, domain });
    this.from = from;
  }

  send(subject: string, to: string, content: string, type: "text" | "html" = "text") {
    try {
      const data = { from: this.from, to, subject, text: type == "text" ? content : null, html: type == "html" ? content : null };
      this.mail.messages().send(data, (error, body) => {
        if (error) return console.error(error);
        console.log(body);
      });
    } catch (error) {
      console.error(error);
    }
  }
}