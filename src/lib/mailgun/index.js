"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Mailgun {
    constructor(apiKey, domain, from) {
        this.mail = require("mailgun-js")({ apiKey, domain });
        this.from = from;
    }
    send(subject, to, content, type = "text") {
        try {
            const data = { from: this.from, to, subject, text: type == "text" ? content : null, html: type == "html" ? content : null };
            this.mail.messages().send(data, (error, body) => {
                if (error)
                    return console.error(error);
                console.log(body);
            });
        }
        catch (error) {
            console.error(error);
        }
    }
}
exports.default = Mailgun;
Mailgun.API_KEY = "059a03808ca3f9eb35053d2b0d442ba1-73ae490d-11c6199c";
Mailgun.DOMAIN = "mg.yapacar.com";
Mailgun.FROM = "YapaCar <noreply@yapacar.com>";
