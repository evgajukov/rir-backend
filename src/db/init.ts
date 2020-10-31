import sequelize from "../db";
import { Router } from "express";

import { httpError } from "../middlewares/errors";

export default () => {
  let sync = Router();

  sync.use(httpError);

  sync.get("/", async (req, res) => {
    try {
      await sequelize.sync();
      res.send("OK");
    } catch (e) {
      res.send("ERROR");
    }
  });

  return sync;
}