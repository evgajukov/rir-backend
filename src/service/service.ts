import * as wd from "selenium-webdriver";
import * as firefox from "selenium-webdriver/firefox";
import * as proxy from "selenium-webdriver/proxy";

export type tServiceError = {
  code: number,
  description: string
};

export type tProxy = {
  host: string,
  port: string
};

export default class Service {

  // коды и описания ошибок
  protected ERRORS = {
    0: {
      code: 0,
      description: "OK"
    },
    999: {
      code: 999,
      description: "Сбой в работе программы. Обратитесь к службу поддержки сервиса"
    }
  };

  protected BROWSER_FIREFOX = "firefox";
  protected BROWSER_CHROME = "chrome";
  protected TIMEOUT = 2 * 60 * 1000;
  protected SELENIUM_HOST_DEFAULT = `http://127.0.0.1:4444/wd/hub`;
  protected DOWNLOAD_FOLDER = `/root/eosago/public/tmp`;

  protected client: wd.WebDriver;

  private headless: boolean;       // режим без отображения самого браузера
  private proxy: tProxy
  protected downloadForlder: string; // папка для загрузки файлов

  protected error: tServiceError;

  constructor(headless: boolean = true, proxy: tProxy = null) {
    this.headless = headless;
    this.proxy = proxy;
    this.downloadForlder = this.DOWNLOAD_FOLDER;
  }

  public getError() {
    return this.error;
  }

  protected setError(code: number, description: string) {
    this.error = { code, description };
  }

  public setDownloadFolder(folder: string) {
    this.downloadForlder = folder;
  }

  public async getClient(browser: string = this.BROWSER_FIREFOX) {
    if (this.BROWSER_FIREFOX == browser) {
      return this.getFirefoxClient();
    } else if (this.BROWSER_CHROME == browser) {
      return this.getChromeClient();
    }
  }

  private async getFirefoxClient() {
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
  }

  private async getChromeClient() {
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
  }

  protected elementIsDisabled(element: wd.WebElement) {
    return new wd.WebElementCondition("until element is disabled", () => {
      return element.getAttribute("class").then(classes => classes.indexOf("disabled") > -1 ? null : element);
    });
  }

  protected async showElement(element: wd.WebElement) {
    await this.client.executeScript(`arguments[0].style.display="block";`, element);
  }

  protected async sendKeys(element: wd.WebElement, text: string | number, log: string = null) {
    await element.clear();
    await element.sendKeys(text);
    if (log != null) {
      console.log(`        >>> ${log} [value: ${text}]`);
    }
  }

  protected sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}