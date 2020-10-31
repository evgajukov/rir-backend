import Response from "../responses/response";

export default function publishHooks(response: Response, exchange) {
  const types = [ "Create", "Update", "Destroy" ];
  for (let type of types) {
    let method = (response as any).prototype["notify" + type];
    if (typeof method != "function") continue;
    let hook = response["after" + type].bind(response);
    hook((instance, options) => notify("notify" + type, instance, options, exchange));
  }
}

export function notify(type, instance, options, exchange) {
  let transaction = (global as any).namespace.get('transaction');
  if (transaction) {
    if (!transaction.notifyQueue) {
      transaction.notifyQueue = [];
    }
    transaction.notifyQueue.push({ instance, exchange, options, type });
  } else {
    console.log(`${type} to ${instance.constructor.name}#${instance.id}`);
    if (typeof instance[type] == 'function') {
      instance[type](exchange, options);
    }
  }
}