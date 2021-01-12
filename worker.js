import SCWorker from "socketcluster/scworker";
import express from "express";
import bodyParser from "body-parser";
import serveStatic from "serve-static";
import path from "path";
import morgan from "morgan";
import healthChecker from "sc-framework-health-check";
import exchange from "./src";

class Worker extends SCWorker {
  run() {
    console.log('   >> Worker PID:', process.pid);
    let environment = this.options.environment;

    let app = express();
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());

    let httpServer = this.httpServer;
    let scServer = this.scServer;

    if (environment === 'development') {
      // Log every HTTP request. See https://github.com/expressjs/morgan for other
      // available formats.
      app.use(morgan('development'));
    }
    app.use(serveStatic(path.resolve(__dirname, 'public')));

    // Add GET /health-check express route
    healthChecker.attach(this, app);

    httpServer.on('request', app);

    exchange(this);
  }
}

new Worker();
