export interface Months {
  [key: number]: string;
}

export interface Days {
  [key: number]: string;
}

export interface MonthTemplate {
  id: number;
  previousMonthDays: number;
  monthDays: number;
  nextMonthDays: number;
  rows: number;
}

export interface Lessons {
  [key: number]: string;
}