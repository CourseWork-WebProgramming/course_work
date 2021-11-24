import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { dayCase, monthsCase, monthTemplates } from '../constants';
import { MonthTemplate } from '../interfaces/factories';
import { Day, DayInfo, Lesson, MonthInfo, Schedule } from '../interfaces/group';
import { PopupService } from '../services/popup.service';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-month',
  templateUrl: './month.component.html',
  styleUrls: ['./month.component.scss']
})
export class MonthComponent implements OnInit {
  schedule!: Schedule;
  monthInfo: MonthInfo = {};
  previousMonthArray: number[] = [];
  nextMonthArray: number[] = [];
  monthTemplate: MonthTemplate = monthTemplates[new Date(2021, 10, 3).getMonth() + 1];
  currentMonthEvent = new BehaviorSubject(new Date(2021, 10, 3).getMonth() + 1);
  currentMonth: number = new Date(2021, 10, 3).getMonth() + 1;
  selectedDate: number = new Date(2021, 10, 3).getDate();
  selectedMonth: number = new Date(2021, 10, 3).getMonth() + 1;
  selectedDay: number = new Date(2021, 10, 3).getDay();
  selectedDayInfo?: Lesson[] = [];
  monthsCase = monthsCase;
  dayCase = dayCase;
  isDayPopupOpen = false;
  isGlobalPopupOpen = false;

  constructor(
    private scheduleService: ScheduleService,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.scheduleService.getSchedule().subscribe((value) => {
      this.schedule = value as Schedule;
      this.setMonthInfo(value as Schedule);
      this.setMonthTemplate();
      this.chooseDay({
        date: this.selectedDate,
        month: this.selectedMonth
      }, true);
    });

    this.scheduleService.groupChange.subscribe(group => {
      this.scheduleService.getSchedule().subscribe((value) => {
        this.schedule = value as Schedule;
        this.setMonthInfo(value as Schedule);
        this.setMonthTemplate();
      });
    });

    this.popupService.isPopupOpenChange.subscribe(isPopupOpen => {
      this.isGlobalPopupOpen = isPopupOpen;
    });

    this.currentMonthEvent.subscribe((value) => {
      this.currentMonth = value;
      this.setMonthInfo(this.schedule);
      this.setMonthTemplate();
    });
  }

  setMonthTemplate() {
    this.monthTemplate = monthTemplates[this.currentMonth];
    const previousArray: number[] = [];
    if (this.monthTemplate.previousMonthDays) {
      const previousMonthTemplate = monthTemplates[this.currentMonth - 1];
      for (let i = this.monthTemplate.previousMonthDays - 1; i >= 0; i--) {
        previousArray.push(previousMonthTemplate.monthDays - i);
      }
      this.previousMonthArray = previousArray;
    }
    const nextArray: number[] = [];
    if (this.monthTemplate.nextMonthDays) {
      for (let z = 1; z <= this.monthTemplate.nextMonthDays; z++) {
        nextArray.push(z);
      }
      this.nextMonthArray = nextArray;
    }
  }

  setMonthInfo(global: Schedule) {
    if (global) {
      const monthSchedule = global[this.currentMonth];
      const monthObject: MonthInfo = {};
      monthSchedule.forEach((item: Day) => {
        monthObject[item.id] = {
          id: item.id,
          lessonsAmount: item.lessons.filter((lesson: Lesson) => !lesson.isEmpty)
        };
      });

      this.monthInfo = monthObject;
    }
  };

  chooseDay(info: DayInfo, def = false) {
    this.selectedDate = info.date;
    this.selectedMonth = info.month;
    this.selectedDay = new Date(2021, info.month - 1, info.date).getDay();
    this.selectedDayInfo = this.schedule[info.month].find((item: Day) => item.id == info.date)?.lessons;

    if (window.innerWidth <= 860 && !def) {
      this.isDayPopupOpen = true;
    }
  }

  closePopup() {
    this.isDayPopupOpen = false;
  }

  changeMonth(month: number) {
    if (month !== 0 && month !== 13) {
      this.currentMonthEvent.next(month);
    }
  }

}
