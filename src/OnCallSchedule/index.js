import InputView from "./UI/InputView.js";
import retryOnErrorAsync from "./utils/retryOnError.js";

class OnCallSchedule {
  async start() {
    const { month, firstDayOfWeek } = await this.#readMonthInformation();
    console.log(month, firstDayOfWeek);

    const { workOrderWeekday, workOrderHoliday } = await this.#readWorkOrder();
    console.log(workOrderWeekday);
    console.log(workOrderHoliday);
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
