import axios, { AxiosRequestConfig } from "axios";

export default class Push {

  private static URL = "https://fcm.googleapis.com/fcm/send";
  private static TITLE = "Dom24x7";
  private static ICON = "/img/logo.png";
  private static APP_URL = "https://yarea40.dom24x7.ru/#";

  public static async send(body: string, uri: string, to: string) {
    const config: AxiosRequestConfig = {
      headers: {
        Authorization: `key=AAAAkuwL2rQ:APA91bEk6grefA6S4XsyRcx__soFI1KEzwTtJ3kvWRjzs6MDCGSzCZkFiX-4CD4FYyjbYnvzK27llVjXzdo1tHvEdjSH5KNJ-54A73IrIHHM4YscvdlYqMRG2wb05X6CIIz733wgW4o9`,
        "Content-Type": "application/json"
      }
    };
    const data = {
      notification: {
        title: Push.TITLE,
        body,
        icon: Push.ICON,
        click_action: Push.APP_URL + uri,
      },
      to
    };
    console.log(data);
    const result = await axios.post(Push.URL, data, config);
    return result;
  }
}