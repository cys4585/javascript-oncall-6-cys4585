const legalHolidays = Object.freeze({
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

const lastDate = Object.freeze({
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

const daysOfWeek = Object.freeze(["월", "화", "수", "목", "금", "토", "일"]);

const weekend = Object.freeze(["토", "일"]);

const CALENDAR = Object.freeze({
  legalHolidays,
  lastDate,
  daysOfWeek,
  weekend,
});

export default CALENDAR;
