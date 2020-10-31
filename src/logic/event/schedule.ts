export default class Schedule {
  private static INTERVAL: number = 10 * 60 * 1000;

  private static timerId: NodeJS.Timer;

  static run() {
    if (Schedule.timerId != null) {
      return;
    }

    console.log("   >> Scheduler.run");

    Schedule.timerId = setInterval(async () => {
      console.log(`>>>>> [${new Date()}]: schedule execute...`);

      Promise.all([]);
    }, Schedule.INTERVAL);
  }

  static stop() {
    if (Schedule.timerId != null) {
      clearInterval(Schedule.timerId);
    }
  }
}