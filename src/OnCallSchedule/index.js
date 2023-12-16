import WorkSchedule from "./Domain/WorkSchedule.js";
import InputView from "./UI/InputView.js";
import OutputView from "./UI/OutputView.js";
import retryOnErrorAsync from "./utils/retryOnError.js";

class OnCallSchedule {
  async start() {
    const { month, firstDayOfWeek } = await this.#readMonthInformation();
    const workSchedule = new WorkSchedule(month, firstDayOfWeek);

    const { workOrderWeekday, workOrderHoliday } = await this.#readWorkOrder();
    workSchedule.setWorkerInSchedule(workOrderWeekday, workOrderHoliday);

    OutputView.printOnCallShedule(workSchedule);
  }

  async #readMonthInformation() {
    return retryOnErrorAsync(InputView.readMonthInformation);
  }

  async #readWorkOrder() {
    return retryOnErrorAsync(async () => {
      const workOrderWeekday = await InputView.readWorkOrderWeekday();
      const workOrderHoliday = await InputView.readWorkOrderHoliday();
      return { workOrderWeekday, workOrderHoliday };
    });
  }
}

export default OnCallSchedule;
