import axios, { AxiosRequestConfig } from "axios";
import { NotificationToken } from "../../models";

export type tPushData = {
  body: string,
  uri: string,
  to?: string,
  all?: boolean
};

export default class Push {

  private static URL = "https://fcm.googleapis.com/fcm/send";
  private static TITLE = "Dom24x7";
  private static ICON = "/img/logo.png";
  private static APP_URL = "https://yarea40.dom24x7.ru/#";

  public static async send(data: tPushData) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `key=AAAAkuwL2rQ:APA91bEk6grefA6S4XsyRcx__soFI1KEzwTtJ3kvWRjzs6MDCGSzCZkFiX-4CD4FYyjbYnvzK27llVjXzdo1tHvEdjSH5KNJ-54A73IrIHHM4YscvdlYqMRG2wb05X6CIIz733wgW4o9`,
        "Content-Type": "application/json"
      }
    };
    if (data.all) {
      // отправляем всем
      const tokens = await NotificationToken.findAll();
      const list = tokens.map(item => item.token);
      const pushData = {
        notification: {
          title: Push.TITLE,
          body: data.body,
          icon: Push.ICON,
          click_action: Push.APP_URL + (data.uri != null ? data.uri : ""),
        },
        registration_ids: list // FIXME: должно быть не более 1000 адресов
      };
      const result = await axios.post(Push.URL, pushData, config);
      return result;
    } else if (data.to) {
      // отправляем конкретному пользователю
      const pushData = {
        notification: {
          title: Push.TITLE,
          body: data.body,
          icon: Push.ICON,
          click_action: Push.APP_URL + (data.uri != null ? data.uri : ""),
        },
        to: data.to
      };
      const result = await axios.post(Push.URL, pushData, config);
      return result;
    }
  }
}