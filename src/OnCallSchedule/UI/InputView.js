import { Console } from "@woowacourse/mission-utils";
import CALENDAR from "../constants/calendar.js";

const ERROR_MESSAGE =
  "[ERROR] 유효하지 않은 입력 값입니다. 다시 입력해 주세요.";

class InputView {
  /**
   *
   * @returns {{month: number, firstDayOfWeek: string}}
   */
  static async readMonthInformation() {
    const input = await Console.readLineAsync(
      "비상 근무를 배정할 월과 시작 요일을 입력하세요> ",
    );

    InputView.#validateMonthInformation(input);

    const [month, firstDayOfWeek] = input.split(",");
    return { month: parseInt(month, 10), firstDayOfWeek };
  }

  static async readWorkOrder() {
    const workOrderWeekday = await InputView.#readWorkOrderWeekday();
    const workOrderHoliday =
      await InputView.#readWorkOrderHoliday(workOrderWeekday);
    return { workOrderWeekday, workOrderHoliday };
  }

  static async #readWorkOrderWeekday() {
    const input = await Console.readLineAsync(
      "평일 비상 근무 순번대로 사원 닉네임을 입력하세요> ",
    );

    InputView.#validateWorkOrderWeekday(input);
    return input.split(",");
  }

  static async #readWorkOrderHoliday(workOrderWeekday) {
    const input = await Console.readLineAsync(
      "휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ",
    );

    InputView.#validateWorkOrderHoliday(input, workOrderWeekday);

    return input.split(",");
  }

  static #validateMonthInformation(input) {
    if (!input.includes(",")) {
      throw new Error(ERROR_MESSAGE);
    }
    const [month, firstDayOfWeek] = input.split(",");
    if (InputView.#isInvalidMonth(month)) {
      throw new Error(ERROR_MESSAGE);
    }
    if (InputView.#isInvalidFirstDayOfWeek(firstDayOfWeek)) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  static #validateWorkOrderWeekday(input) {
    InputView.#validateWorkerOrderCommon(input);
  }

  static #validateWorkOrderHoliday(input, workOrderWeekday) {
    InputView.#validateWorkerOrderCommon(input);
    const workOrderHoliday = input.split(",");
    if (workOrderHoliday.some((worker) => !workOrderWeekday.includes(worker))) {
      throw new Error(ERROR_MESSAGE);
    }
    if (workOrderWeekday.some((worker) => !workOrderHoliday.includes(worker))) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  static #validateWorkerOrderCommon(input) {
    if (!input.includes(",")) {
      throw new Error(ERROR_MESSAGE);
    }
    const workers = input.split(",");
    if (workers.length < 5 || workers.length > 35) {
      throw new Error(ERROR_MESSAGE);
    }
    if (new Set(workers).size !== workers.length) {
      throw new Error(ERROR_MESSAGE);
    }
    if (workers.some((worker) => worker.length > 5)) {
      throw new Error(ERROR_MESSAGE);
    }
  }

  static #isInvalidMonth(month) {
    if (month.length === 0 || month.length > 2) {
      return true;
    }
    if (Number.isNaN(month)) {
      return true;
    }
    if (parseInt(month, 10) < 1 || parseInt(month, 10) > 12) {
      return true;
    }
    return false;
  }

  static #isInvalidFirstDayOfWeek(firstDayOfWeek) {
    if (firstDayOfWeek.length !== 1) {
      return true;
    }
    if (!CALENDAR.daysOfWeek.includes(firstDayOfWeek)) {
      return true;
    }
    return false;
  }
}

export default InputView;
