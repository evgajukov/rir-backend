"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notify = void 0;
function publishHooks(response, exchange) {
    const types = ["Create", "Update", "Destroy"];
    for (let type of types) {
        let method = response.prototype["notify" + type];
        if (typeof method != "function")
            continue;
        let hook = response["after" + type].bind(response);
        hook((instance, options) => notify("notify" + type, instance, options, exchange));
    }
}
exports.default = publishHooks;
function notify(type, instance, options, exchange) {
    let transaction = global.namespace.get('transaction');
    if (transaction) {
        if (!transaction.notifyQueue) {
            transaction.notifyQueue = [];
        }
        transaction.notifyQueue.push({ instance, exchange, options, type });
    }
    else {
        console.log(`${type} to ${instance.constructor.name}#${instance.id}`);
        if (typeof instance[type] == 'function') {
            instance[type](exchange, options);
        }
    }
}
exports.notify = notify;
