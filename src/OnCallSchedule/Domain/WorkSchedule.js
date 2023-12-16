import CALENDAR from "../constants/calendar.js";

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
  setWorkerInCalendar(workOrderWeekday, workOrderHoliday) {
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

  // modifyToAvoidConsecutiveWorkdays() {
  //   let prevWorker = null;
  //   let currWorker = null;
  //   let nextWorker = null;

  //   for (let date = 2; date <= LAST_DATE[this.#month]; date += 1) {
  //     prevWorker = this.#calendar[date - 1].worker;
  //     currWorker = this.#calendar[date].worker;
  //     nextWorker = this.#calendar[date + 1].worker;
  //     if ()
  //   }
  // }

  isWeekdayAndLegalHoliday(date) {
    return (
      !CALENDAR.weekend.includes(this.#calendar[date].dayOfWeek) &&
      this.#calendar[date].isLegalHoliday
    );
  }

  #generateCalendar(month, firstDayOfWeek) {
    let currentDayOfWeek = CALENDAR.daysOfWeek.indexOf(firstDayOfWeek);

    for (let date = 1; date <= CALENDAR.lastDate[month]; date += 1) {
      this.#calendar[date] = {
        dayOfWeek: CALENDAR.daysOfWeek[currentDayOfWeek],
        isLegalHoliday: CALENDAR.legalHolidays[month].includes(date),
      };

      currentDayOfWeek += 1;
      if (currentDayOfWeek === CALENDAR.daysOfWeek.length) {
        currentDayOfWeek = 0;
      }
    }
  }

  #isHoliday(date) {
    return (
      CALENDAR.weekend.includes(this.#calendar[date].dayOfWeek) ||
      this.#calendar[date].isLegalHoliday
    );
  }

  #isWeekday(date) {
    return !this.#isHoliday(date);
  }
}

export default WorkSchedule;
