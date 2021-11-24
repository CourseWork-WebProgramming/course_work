import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { months } from '../constants';
import { MonthTemplate } from '../interfaces/factories';
import { MonthInfo } from '../interfaces/group';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  @Input() selectedDate!: number;
  @Input() selectedMonth!: number;
  @Input() currentMonth!: number;
  @Input() previousMonthArray!: number[];
  @Input() nextMonthArray!: number[];
  @Input() monthTemplate!: MonthTemplate;
  @Input() monthInfo!: MonthInfo;
  @Output() chooseDayEvent = new EventEmitter();
  @Output() changeMonthEvent = new EventEmitter();
  monthDays: number[] = [];
  months = months;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if (changes.monthTemplate?.currentValue?.monthDays) {
      this.monthDays = new Array(changes.monthTemplate?.currentValue?.monthDays);
    }
  }

  chooseDay(value: number) {
    this.chooseDayEvent.emit({
      date: value,
      month: this.currentMonth
    });
  }

  nextMonth() {
    this.changeMonthEvent.emit(this.currentMonth + 1);
  }

  previousMonth() {
    this.changeMonthEvent.emit(this.currentMonth - 1);
  }
}
