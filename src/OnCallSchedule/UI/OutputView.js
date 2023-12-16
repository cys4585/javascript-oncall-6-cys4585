import { Console } from "@woowacourse/mission-utils";

class OutputView {
  static printError(error) {
    Console.print(error.message);
  }

  static printOnCallShedule(workSchedule) {
    Console.print("");

    const month = workSchedule.getMonth();

    Object.entries(workSchedule.getCalendar()).forEach(
      ([date, { dayOfWeek, worker }]) => {
        if (workSchedule.isWeekdayAndLegalHoliday(date)) {
          Console.print(`${month}월 ${date}일 ${dayOfWeek}(휴일) ${worker}`);
        }
        Console.print(`${month}월 ${date}일 ${dayOfWeek} ${worker}`);
      },
    );
  }
}

export default OutputView;
