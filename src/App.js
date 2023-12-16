import OnCallSchedule from "./OnCallSchedule/index.js";

class App {
  async run() {
    await new OnCallSchedule().start();
  }
}

export default App;
