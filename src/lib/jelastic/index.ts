import HttpUtilities from "../../utilities/http_utilities";

export default class JelasticAPI {

  private API_URL = "https://app.jelastic.regruhosting.ru/1.0/#BLOCK#/rest/#METHOD#";
  private BLOCK_AUTH = "users/authentication";
  private BLOCK_ENV = "environment/control";
  private METHOD_SIGNIN = "signin";
  private METHOD_ENV_START = "startenv";
  private METHOD_ENV_STOP = "stopenv";
  private METHOD_ENV_RESTART = "restartnodebyid";

  private SYS_APPID = "1dd8d191d38fff45e62564fcf67fdcd6";

  private LOGIN = "evgajukov@gmail.com";
  private PASSOWRD = "txgZYt25lU";

  private login: string;
  private password: string;
  private session: string;

  constructor(login?: string, password?: string) {
    this.login = login != null ? login : this.LOGIN;
    this.password = password != null ? password : this.PASSOWRD;
  }

  public async signin() {
    const url = this.API_URL.replace("#BLOCK#", this.BLOCK_AUTH).replace("#METHOD#", this.METHOD_SIGNIN);
    const data = {
      appid: this.SYS_APPID,
      login: this.login,
      password: this.password
    };
    const result: any = await HttpUtilities.postContent(url, data, "form");
    const json = JSON.parse(result);
    this.session = json.session;
  }

  public async start(envName: string) {
    const url = this.API_URL.replace("#BLOCK#", this.BLOCK_ENV).replace("#METHOD#", this.METHOD_ENV_START);
    await this.signin();
    const data = {
      envName,
      session: this.session
    };
    await HttpUtilities.postContent(url, data, "form");
  }

  public async stop(envName: string) {
    const url = this.API_URL.replace("#BLOCK#", this.BLOCK_ENV).replace("#METHOD#", this.METHOD_ENV_STOP);
    await this.signin();
    const data = {
      envName,
      session: this.session
    };
    await HttpUtilities.postContent(url, data, "form");
  }

  public async restart(envName: string, nodeId: number) {
    const url = this.API_URL.replace("#BLOCK#", this.BLOCK_ENV).replace("#METHOD#", this.METHOD_ENV_RESTART);
    await this.signin();
    const data = {
      envName,
      nodeId,
      session: this.session
    };
    await HttpUtilities.postContent(url, data, "form");
  }
}