import { Component, OnInit } from '@angular/core';
import { dayCase, lessonsTime, monthsCase } from '../constants';
import { Day, DayOfWeek, Lesson, Schedule } from '../interfaces/group';
import { PopupService } from '../services/popup.service';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-week',
  templateUrl: './week.component.html',
  styleUrls: ['./week.component.scss']
})
export class WeekComponent implements OnInit {
  schedule: Schedule = {};
  weekSchedule: Day[] = [];
  todaySchedule!: Day;
  todayTime?: string[][];
  todayDate: number = new Date(2021, 10, 3).getDate();
  todayMonth: number = new Date(2021, 10, 3).getMonth() + 1;
  todayMonthName: string = monthsCase[new Date(2021, 10, 3).getMonth() + 1];
  todayDay: number = new Date(2021, 10, 3).getDay();
  todayDayName: string = dayCase[new Date(2021, 10, 3).getDay()];
  weekDays!: DayOfWeek[];
  selectedDate: number = new Date(2021, 10, 3).getDate();
  selectedDay: number = new Date(2021, 10, 3).getDay();

  isGlobalPopupOpen = false;

  monthsCase = monthsCase;
  dayCase = dayCase;

  constructor(
    private scheduleService: ScheduleService,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.scheduleService.getSchedule().subscribe((value) => {
      this.schedule = value as Schedule;
      this.setWeekDays();
      this.setTodaySchedule();
      this.setWeekSchedule();
    });

    this.scheduleService.groupChange.subscribe(group => {
      this.scheduleService.getSchedule().subscribe((value) => {
        this.schedule = value as Schedule;
        this.setTodaySchedule();
        this.setWeekSchedule();
      });
    });

    this.popupService.isPopupOpenChange.subscribe(isPopupOpen => {
      this.isGlobalPopupOpen = isPopupOpen;
    });
  }

  setTodaySchedule() {
    this.todaySchedule = this.schedule[this.todayMonth].find((day: Day) => day.id === this.selectedDate) as Day;
    this.todayTime = this.todaySchedule.lessons.map((item: Lesson) => lessonsTime[item.time].split('.'));
  }

  setWeekDays() {
    const weekStart = this.todayDate - this.todayDay + 1;
    const resultArray = [];
    for (let i = weekStart; i < weekStart + 5; i++) {
      const date = new Date(2021, this.todayMonth - 1, i);
      resultArray.push({
        date: i,
        day: date.getDay()
      });
    }
    this.weekDays = resultArray;
  }

  setWeekSchedule() {
    const resultArray: Day[] = [];
    const weekStart = this.todayDate - this.todayDay + 1;
    for (let i = weekStart; i < weekStart + 5; i++) {
      const daySchedule = this.schedule[this.todayMonth].find((day: Day) => day.id === Number(i));
      resultArray.push(daySchedule as Day);
    }

    this.weekSchedule = resultArray;
  }

  chooseDay(day: DayOfWeek) {
    this.selectedDate = day.date;
    this.selectedDay = day.day;
    this.setTodaySchedule();
  }

}
