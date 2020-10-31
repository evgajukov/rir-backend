import * as http from "http";
import * as https from "https";
import * as request from "request";
import * as stream from "stream";
import FSUtilities from "./fs_utilities";

export default class HttpUtilities {
  static getContent(url: string, type: "text" | "binary" = "text") {
    return new Promise((resolve, reject) => {
      const lib = url.startsWith('https') ? https : http;
      const request = (lib as any).get(url, (response) => {
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(new Error(`Failed to load url, status code: ${response.statusCode}`));
          return;
        }

        if ("text" == type) {
          const body = [];
          response.on("data", (chunk) => body.push(chunk));
          response.on("end", () => resolve(body.join("")));
        } else {
          const body = new stream.Transform();
          response.on("data", (chunk) => body.push(chunk));
          response.on("end", () => resolve(body.read()));
        }  
      });
      request.on("error", err => reject(err));
    });
  }

  static postContent(url: string, data: any, type: "json" | "form" = "json", username?: string, password?: string) {
    return new Promise((resolve, reject) => {
      let options: any = { url, method: "POST" };
      if ("json" == type) {
        options.json = data;
      } else {
        options.form = data;
      }
      if (username && password) {
        options["headers"] = {
          Authorization: "Basic " + new Buffer(username + ":" + password).toString("base64")
        };
      }
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

  /**
   * Возвращает HTTP код ответа доступа к указанной ссылке
   */
  static getHttpCode(url: string) {
    return new Promise((resolve, reject) => {
      const lib = url.startsWith('https') ? https : http;
      const request = (lib as any).get(url, (response) => {
        resolve(response.statusCode);
      });
      request.on("error", err => reject(err));
    });
  }

  static async saveImageFormUrl(url: string, fileName: string, path: string = `/tmp/`) {
    const img: any = await HttpUtilities.getContent(url, "binary");
    FSUtilities.saveWithoutMeta(new Buffer(img).toString("base64"), fileName, path);
  }
}