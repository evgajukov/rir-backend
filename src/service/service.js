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
const wd = require("selenium-webdriver");
const firefox = require("selenium-webdriver/firefox");
const proxy = require("selenium-webdriver/proxy");
class Service {
    constructor(headless = true, proxy = null) {
        // коды и описания ошибок
        this.ERRORS = {
            0: {
                code: 0,
                description: "OK"
            },
            999: {
                code: 999,
                description: "Сбой в работе программы. Обратитесь к службу поддержки сервиса"
            }
        };
        this.BROWSER_FIREFOX = "firefox";
        this.BROWSER_CHROME = "chrome";
        this.TIMEOUT = 2 * 60 * 1000;
        this.SELENIUM_HOST_DEFAULT = `http://127.0.0.1:4444/wd/hub`;
        this.DOWNLOAD_FOLDER = `/root/eosago/public/tmp`;
        this.headless = headless;
        this.proxy = proxy;
        this.downloadForlder = this.DOWNLOAD_FOLDER;
    }
    getError() {
        return this.error;
    }
    setError(code, description) {
        this.error = { code, description };
    }
    setDownloadFolder(folder) {
        this.downloadForlder = folder;
    }
    getClient(browser = this.BROWSER_FIREFOX) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.BROWSER_FIREFOX == browser) {
                return this.getFirefoxClient();
            }
            else if (this.BROWSER_CHROME == browser) {
                return this.getChromeClient();
            }
        });
    }
    getFirefoxClient() {
        return __awaiter(this, void 0, void 0, function* () {
            let client = new wd.Builder()
                .usingServer(this.SELENIUM_HOST_DEFAULT)
                .withCapabilities({ browserName: this.BROWSER_FIREFOX })
                .withCapabilities(wd.Capabilities.firefox().set("acceptInsecureCerts", true));
            let options = new firefox.Options()
                // 0 - desktop, 1 - file download folder, 2 - specified location
                .setPreference("browser.download.folderList", 2)
                .setPreference("browser.download.dir", this.downloadForlder)
                .setPreference("browser.helperApps.neverAsk.saveToDisk", "application/pdf,application/vnd.adobe.xfdf,application/vnd.fdf,application/vnd.adobe.xdp+xml,application/x-pdf,application/acrobat,applications/vnd.pdf,text/pdf,text/x-pdf,application/vnd.cups-pdf,application/octet-stream")
                .setPreference("plugin.scan.plid.all", false)
                .setPreference("plugin.scan.Acrobat", "99.0")
                .setPreference("plugin.disable_full_page_plugin_for_types", "application/pdf,application/vnd.adobe.xfdf,application/vnd.fdf,application/vnd.adobe.xdp+xml,application/x-pdf,application/acrobat,applications/vnd.pdf,text/pdf,text/x-pdf,application/vnd.cups-pdf,application/octet-stream")
                .setPreference("browser.download.manager.showWhenStarting", false)
                .setPreference("pdfjs.disabled", true);
            if (this.headless) {
                console.log(`!!!!! HEADLESS MODE !!!!!`);
                options = options.headless();
            }
            client = client.setFirefoxOptions(options);
            if (this.proxy != null) {
                client = client.setProxy(proxy.manual({ https: `${this.proxy.host}:${this.proxy.port}` }));
            }
            return client.build();
        });
    }
    getChromeClient() {
        return __awaiter(this, void 0, void 0, function* () {
            const chromeOptions = {
                args: ["--disable-gpu", "--no-sandbox", "--disable-extensions", "--disable-dev-shm-usage"]
            };
            if (this.headless) {
                console.log(`!!!!! HEADLESS MODE !!!!!`);
                chromeOptions.args.push("--headless");
            }
            let client = new wd.Builder()
                .usingServer(this.SELENIUM_HOST_DEFAULT)
                .withCapabilities({ browserName: this.BROWSER_CHROME })
                .withCapabilities(wd.Capabilities.chrome().set("chromeOptions", chromeOptions));
            return client.build();
        });
    }
    elementIsDisabled(element) {
        return new wd.WebElementCondition("until element is disabled", () => {
            return element.getAttribute("class").then(classes => classes.indexOf("disabled") > -1 ? null : element);
        });
    }
    showElement(element) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.client.executeScript(`arguments[0].style.display="block";`, element);
        });
    }
    sendKeys(element, text, log = null) {
        return __awaiter(this, void 0, void 0, function* () {
            yield element.clear();
            yield element.sendKeys(text);
            if (log != null) {
                console.log(`        >>> ${log} [value: ${text}]`);
            }
        });
    }
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}
exports.default = Service;
