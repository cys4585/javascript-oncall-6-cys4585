import { Console } from "@woowacourse/mission-utils";

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

  static async readWorkOrderWeekday() {
    const input = await Console.readLineAsync(
      "평일 비상 근무 순번대로 사원 닉네임을 입력하세요> ",
    );

    InputView.#validateWorkOrderWeekday(input);
    return input.split(",");
  }

  static async readWorkOrderHoliday() {
    const input = await Console.readLineAsync(
      "휴일 비상 근무 순번대로 사원 닉네임을 입력하세요> ",
    );

    InputView.#validateWorkOrderHoliday(input);

    return input.split(",");
  }

  static #validateMonthInformation(input) {
    if (!input.includes(",")) {
      throw new Error("[ERROR] 잘못된 형식의 입력입니다.1");
    }
  }

  static #validateWorkOrderWeekday(input) {
    if (!input.includes(",")) {
      throw new Error("[ERROR] 잘못된 형식의 입력입니다.2");
    }
  }

  static #validateWorkOrderHoliday(input) {
    if (!input.includes(",")) {
      throw new Error("[ERROR] 잘못된 형식의 입력입니다.3");
    }
  }
}

export default InputView;
