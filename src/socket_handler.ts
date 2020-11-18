import db from "./db";

import * as user from "./actions/user";
import * as ping from "./actions/ping";

import * as responses from "./responses";

export default function handleSocket(socket) {
  socket.on("subscribe", channel => seedData(channel, socket));

  const { Session } = db.models;
  socket.on("authenticate", (Session as any).onLogin.bind(socket));
  socket.on("deauthenticate", (Session as any).onLogout.bind(socket));
  socket.on("disconnect", (Session as any).onLogout.bind(socket));

  bindActions(socket, "user", user);
  bindActions(socket, "test", ping);
}

function bindActions(socket, namespace, actions) {
  for (let action in actions) {
    socket.on([namespace, action].join('.'), actions[action].bind(socket));
  }
}

function publishData(socket, channel, rows) {
  console.log(`publishData to CHANNEL: ${channel}`);
  if (rows != null) {
    if (rows instanceof Array) {
      for (let data of rows) {
        socket.emit("#publish", { channel, data: { event: "create", data } });
      }
    } else {
      let data = rows;
      socket.emit("#publish", { channel, data: { event: "create", data } });
    }
  }  
  socket.emit("#publish", { channel, data: { event: "ready" } });
}

async function seedData(channel, socket) : Promise<void> {
  let [name, ...params] = channel.split('.');

  console.log(`### [${new Date()}] channel = ${channel}`);
  console.log(`### [${new Date()}] name = ${name}`);
  console.log(`### [${new Date()}] params = ${params}`);
  let respChannel = responses.channels[name];
  if (!respChannel) {
    console.error(`### [${new Date()}] Не найден канал ответа по ${name}`);
    return;
  }

  let response = respChannel.response;
  if (response && typeof response.seed === "function") {
    publishData(socket, channel, await response.seed(respChannel.action, normalizeParams(params), socket));
  }
}

/**
 * Нормализует параметры канала
 * @param params список параметров канала
 */
function normalizeParams(params): number | Array<number> {
  if (params instanceof Array) {
    return params.map(item => {
      const intValue = parseInt(item);
      return intValue == item ? intValue : item;
    });
  } else {
    const intValue = parseInt(params);
    return intValue == params ? intValue : params;
  }
}