import { Days, Lessons, Months, MonthTemplate } from "./interfaces/factories";
import { Cathedra, Group, Year } from "./interfaces/select";

const cathedras: Cathedra[] = [
  { id: 1, name: "Програмних систем і технологій" },
  { id: 2, name: "Інтелектуальних технологій" },
  { id: 3, name: "Прикладних інформаційних систем" },
  { id: 4, name: "Технологій управління" },
  { id: 5, name: "Кібербезпеки та захисту інформації" },
  { id: 6, name: "Інформаційні системи та технології" },
  { id: 7, name: "Мережевих та інтернет технологій" },
];

const years: Year[] = [
  { id: 1, name: "1 курс" },
  { id: 2, name: "2 курс" },
  { id: 3, name: "3 курс" },
  { id: 4, name: "4 курс" },
  { id: 5, name: "5 курс" },
  { id: 6, name: "6 курс" },
];

const groups: Group[] = [
  { id: 1, name: "МІТ-11" },
  { id: 2, name: "МІТ-21" },
  { id: 3, name: "МІТ-31" },
  { id: 4, name: "МІТ-41" },
];

const months: Months = {
  1: "Січень",
  2: "Лютий",
  3: "Березень",
  4: "Квітень",
  5: "Травень",
  6: "Червень",
  7: "Липень",
  8: "Серпень",
  9: "Вересень",
  10: "Жовтень",
  11: "Листопад",
  12: "Грудень",
};

const monthsCase: Months = {
  1: "Січня",
  2: "Лютого",
  3: "Березня",
  4: "Квітня",
  5: "Травня",
  6: "Червня",
  7: "Липня",
  8: "Серпня",
  9: "Вересня",
  10: "Жовтня",
  11: "Листопада",
  12: "Грудня",
};

const dayCase: Days = {
  1: "Понеділок",
  2: "Вівторок",
  3: "Середа",
  4: "Четвер",
  5: "П'ятниця",
  6: "Субота",
  0: "Неділя",
};

const monthTemplates: MonthTemplate[] = [
  {
    id: 0,
    previousMonthDays: 1,
    monthDays: 31,
    nextMonthDays: 3,
    rows: 5,
  },
  {
    id: 1,
    previousMonthDays: 4,
    monthDays: 31,
    nextMonthDays: 0,
    rows: 5,
  },
  {
    id: 2,
    previousMonthDays: 0,
    monthDays: 28,
    nextMonthDays: 0,
    rows: 4,
  },
  {
    id: 3,
    previousMonthDays: 0,
    monthDays: 31,
    nextMonthDays: 4,
    rows: 5,
  },
  {
    id: 4,
    previousMonthDays: 3,
    monthDays: 30,
    nextMonthDays: 2,
    rows: 5,
  },
  {
    id: 5,
    previousMonthDays: 5,
    monthDays: 31,
    nextMonthDays: 6,
    rows: 6,
  },
  {
    id: 6,
    previousMonthDays: 1,
    monthDays: 30,
    nextMonthDays: 4,
    rows: 5,
  },
  {
    id: 7,
    previousMonthDays: 3,
    monthDays: 31,
    nextMonthDays: 1,
    rows: 5,
  },
  {
    id: 8,
    previousMonthDays: 6,
    monthDays: 31,
    nextMonthDays: 5,
    rows: 6,
  },
  {
    id: 9,
    previousMonthDays: 2,
    monthDays: 30,
    nextMonthDays: 3,
    rows: 5,
  },
  {
    id: 10,
    previousMonthDays: 4,
    monthDays: 31,
    nextMonthDays: 0,
    rows: 5,
  },
  {
    id: 11,
    previousMonthDays: 0,
    monthDays: 30,
    nextMonthDays: 5,
    rows: 5,
  },
  {
    id: 12,
    previousMonthDays: 2,
    monthDays: 31,
    nextMonthDays: 2,
    rows: 5,
  }
];

const lessonsTime: Lessons = {
  1: "9:00.-.10:20",
  2: "10:30.-.11:50",
  3: "12:10.-.13:30",
  4: "13:40.-.15:00",
  5: "15:10.-.16:30",
  6: "16:40.-.18:00",
  7: "18:10.-.19:30",
};

const lessonsType: Lessons = {
  1: "Лекція",
  2: "Практика",
  3: "Лабораторна",
  4: "Семінар"
};

const groupNames: Record<string, string> = {
  "МІТ-21": "mit-21",
};

export {
  cathedras,
  years,
  groups,
  months,
  monthsCase,
  monthTemplates,
  lessonsTime,
  lessonsType,
  dayCase,
  groupNames
};
