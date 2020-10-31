"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const https = require("https");
const request = require("request");
const stream = require("stream");
const fs_utilities_1 = require("./fs_utilities");
class HttpUtilities {
    static getContent(url, type = "text") {
        return new Promise((resolve, reject) => {
            const lib = url.startsWith('https') ? https : http;
            const request = lib.get(url, (response) => {
                if (response.statusCode < 200 || response.statusCode > 299) {
                    reject(new Error(`Failed to load url, status code: ${response.statusCode}`));
                    return;
                }
                if ("text" == type) {
                    const body = [];
                    response.on("data", (chunk) => body.push(chunk));
                    response.on("end", () => resolve(body.join("")));
                }
                else {
                    const body = new stream.Transform();
                    response.on("data", (chunk) => body.push(chunk));
                    response.on("end", () => resolve(body.read()));
                }
            });
            request.on("error", err => reject(err));
        });
    }
    static postContent(url, data, type = "json", username, password) {
        return new Promise((resolve, reject) => {
            let options = { url, method: "POST" };
            if ("json" == type) {
                options.json = data;
            }
            else {
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
        });
    }
    /**
     * Возвращает HTTP код ответа доступа к указанной ссылке
     */
    static getHttpCode(url) {
        return new Promise((resolve, reject) => {
            const lib = url.startsWith('https') ? https : http;
            const request = lib.get(url, (response) => {
                resolve(response.statusCode);
            });
            request.on("error", err => reject(err));
        });
    }
    static saveImageFormUrl(url, fileName, path = `/tmp/`) {
        return __awaiter(this, void 0, void 0, function* () {
            const img = yield HttpUtilities.getContent(url, "binary");
            fs_utilities_1.default.saveWithoutMeta(new Buffer(img).toString("base64"), fileName, path);
        });
    }
}
exports.default = HttpUtilities;
