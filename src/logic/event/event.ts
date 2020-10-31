export default class Event {
  private static INTERVAL: number = 60 * 60 * 1000;

  private static timerId: NodeJS.Timer;

  static run() {
    if (Event.timerId != null) {
      return;
    }

    console.log("   >> EventСhecker.run");

    Event.timerId = setInterval(async () => {
      console.log(`>>>>> [${new Date()}]: check events...`);

      Promise.all([]);
    }, Event.INTERVAL);
  }

  static stop() {
    if (Event.timerId != null) {
      clearInterval(Event.timerId);
    }
  }
}