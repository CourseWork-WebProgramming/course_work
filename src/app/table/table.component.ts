import { Component, Input, OnInit } from '@angular/core';
import { dayCase, lessonsType, monthsCase } from '../constants';
import { Day, DayOfWeek } from '../interfaces/group';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  @Input() weekDays!: DayOfWeek[];
  @Input() todayMonth!: number;
  @Input() todayTime?: string[][];
  @Input() weekSchedule: Day[] = [];
  monthsCase = monthsCase;
  lessonsType = lessonsType;
  dayCase = dayCase;

  isGlobalPopupOpen = false;

  constructor(private popupService: PopupService) { }

  ngOnInit(): void {
    this.popupService.isPopupOpenChange.subscribe(isPopupOpen => {
      this.isGlobalPopupOpen = isPopupOpen;
    });
  }

}
