const LEGAL_HOLIDAYS = Object.freeze({
  1: [1],
  2: [],
  3: [1],
  4: [],
  5: [5],
  6: [6],
  7: [],
  8: [15],
  10: [3, 9],
  11: [],
  12: [25],
});

const LAST_DATE = Object.freeze({
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
});

const DAYS_OF_WEEK = Object.freeze(["월", "화", "수", "목", "금", "토", "일"]);

const WEEKEND = Object.freeze(["토", "일"]);

class WorkSchedule {
  #month;

  #calendar;

  constructor(month, firstDayOfWeek) {
    this.#month = month;
    this.#calendar = {};
    this.#generateCalendar(month, firstDayOfWeek);
  }

  getMonth() {
    return this.#month;
  }

  getCalendar() {
    return { ...this.#calendar };
  }

  // eslint-disable-next-line max-lines-per-function
  setWorkerInSchedule(workOrderWeekday, workOrderHoliday) {
    let weekdayIndex = 0;
    let holidayIndex = 0;

    Object.keys(this.#calendar).forEach((date) => {
      if (this.#isWeekday(date)) {
        this.#calendar[date].worker = workOrderWeekday[weekdayIndex];
        weekdayIndex += 1;
        if (weekdayIndex === workOrderWeekday.length) {
          weekdayIndex = 0;
        }
      } else if (this.#isHoliday(date)) {
        this.#calendar[date].worker = workOrderHoliday[holidayIndex];
        holidayIndex += 1;
        if (holidayIndex === workOrderHoliday.length) {
          holidayIndex = 0;
        }
      }
    });
  }

  isWeekdayAndLegalHoliday(date) {
    return (
      !WEEKEND.includes(this.#calendar[date].dayOfWeek) &&
      this.#calendar[date].isLegalHoliday
    );
  }

  #generateCalendar(month, firstDayOfWeek) {
    let currentDayOfWeek = DAYS_OF_WEEK.indexOf(firstDayOfWeek);

    for (let date = 1; date <= LAST_DATE[month]; date += 1) {
      this.#calendar[date] = {
        dayOfWeek: DAYS_OF_WEEK[currentDayOfWeek],
        isLegalHoliday: LEGAL_HOLIDAYS[month].includes(date),
      };

      currentDayOfWeek += 1;
      if (currentDayOfWeek === DAYS_OF_WEEK.length) {
        currentDayOfWeek = 0;
      }
    }
  }

  #isHoliday(date) {
    return (
      WEEKEND.includes(this.#calendar[date].dayOfWeek) ||
      this.#calendar[date].isLegalHoliday
    );
  }

  #isWeekday(date) {
    return !this.#isHoliday(date);
  }
}

export default WorkSchedule;
