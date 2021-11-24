export interface DayOfWeek {
  date: number;
  day: number;
}

export interface DayInfo {
  date: number;
  month: number;
}

export interface GroupInfo {
  cathedra: string;
  year: string;
  group: string;
}

export interface LessonInfo {
  name?: string;
  type?: number;
  professor?: string;
  isOnline?: boolean;
  place?: string;
  isEmpty?: boolean;
}

export interface Lesson {
  time: number;
  isEmpty?: boolean;
  isSplitted?: boolean;
  general?: LessonInfo;
  first?: LessonInfo;
  second?: LessonInfo;
}

export interface Day {
  id: number;
  lessons: Lesson[];
}

export interface Schedule {
  [key: string]: Day[];
}

export interface LessonsAmount {
  id: number;
  lessonsAmount: Lesson[];
}

export interface MonthInfo {
  [key: number]: LessonsAmount
}