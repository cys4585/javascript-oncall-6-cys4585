/* eslint-disable */

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

  setWorkerInCalendar(workOrderWeekday, workOrderHoliday) {
    let weekdayIndex = 0;
    let isWeekdayWorkerChanged = false;

    let holidayIndex = 0;
    let isHolidayWorkerChanged = false;
    for (let date = 1; date <= CALENDAR.lastDate[this.#month]; date += 1) {
      let worker;
      if (this.#isWeekday(date)) {
        if (isWeekdayWorkerChanged) {
          worker = workOrderWeekday[weekdayIndex - 1];
          isWeekdayWorkerChanged = false;
        } else {
          worker = workOrderWeekday[weekdayIndex];
          if (date > 1 && this.#calendar[date - 1].worker === worker) {
            worker = workOrderWeekday[weekdayIndex + 1];
            isWeekdayWorkerChanged = true;
          }
        }
        this.#calendar[date].worker = worker;
        weekdayIndex += 1;
        if (weekdayIndex === workOrderWeekday.length) {
          weekdayIndex = 0;
        }
      } else if (this.#isHoliday(date)) {
        if (isHolidayWorkerChanged) {
          worker = workOrderHoliday[holidayIndex - 1];
          isHolidayWorkerChanged = false;
        } else {
          worker = workOrderHoliday[holidayIndex];
          if (date > 1 && this.#calendar[date - 1].worker === worker) {
            worker = workOrderHoliday[holidayIndex + 1];
            isHolidayWorkerChanged = true;
          }
        }
        this.#calendar[date].worker = worker;
        holidayIndex += 1;
        if (holidayIndex === workOrderHoliday.length) {
          holidayIndex = 0;
        }
      }
    }
  }

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
