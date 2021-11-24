import { Component, OnInit } from '@angular/core';
import { dayCase, monthsCase } from '../constants';
import { Day, Lesson, Schedule } from '../interfaces/group';
import { PopupService } from '../services/popup.service';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss']
})
export class TodayComponent implements OnInit {
  schedule?: Schedule;
  todayInfo?: Lesson[];
  todayDate: number = new Date(2021, 10, 3).getDate();
  todayMonth: string = monthsCase[new Date(2021, 10, 3).getMonth() + 1];
  todayDay: string = dayCase[new Date(2021, 10, 3).getDay()];

  isGlobalPopupOpen = false;

  constructor(
    private scheduleService: ScheduleService,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.scheduleService.getSchedule().subscribe((value) => {
      this.schedule = value as Schedule;
      this.setTodayInfo(value as Schedule);
    });

    this.scheduleService.groupChange.subscribe(group => {
      this.scheduleService.getSchedule().subscribe((value) => {
        this.schedule = value as Schedule;
        this.setTodayInfo(value as Schedule);
      });
    });

    this.popupService.isPopupOpenChange.subscribe(isPopupOpen => {
      this.isGlobalPopupOpen = isPopupOpen;
    });
  }

  setTodayInfo(global: Schedule) {
    const today = new Date(2021, 10, 3);
    const day = today.getDate();
    const month = today.getMonth() + 1;
    this.todayInfo = global[month].find((item: Day) => item.id == day)?.lessons;
  }
}
