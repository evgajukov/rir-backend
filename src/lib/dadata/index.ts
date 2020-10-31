import * as request from "request";

export default class Dadata {

  private static API_URL = "https://dadata.ru/api/v2/clean";
  private static API_KEY = "bea5b313ae276907f1d76cc1c2ac93a9902e11af";
  private static API_SECRET = "5a720bfcd74c746cd1c4cd2dff08a62b5c1d40f0";
  private static METHOD_ADDRESS = "/address";

  async address(value: string) {
    return await this.post(Dadata.METHOD_ADDRESS, [value]);
  }

  private post(method: string, data: any) {
    return new Promise((resolve, reject) => {
      const options = {
        url: Dadata.API_URL + method,
        method: "POST",
        json: data,
        headers: {
          Authorization: `Token ${Dadata.API_KEY}`,
          "X-Secret": Dadata.API_SECRET
        }
      };
      request(options, (error, response, body) => {
        if (error) {
          reject(new Error(error));
          return;
        }

        if (!response) {
          reject(new Error(`Object response is null`));
          return;
        }

        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error(`Failed to load url, status code: ${response.statusCode}`));
          return;
        }

        resolve(body);
      });
    })
  }
}