import { Component, Input, OnInit } from '@angular/core';
import { lessonsTime, lessonsType } from '../constants';
import { Lesson } from '../interfaces/group';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit {
  @Input() data?: Lesson[];
  @Input() date!: number;
  @Input() month: string = "";
  @Input() day: string = "";
  lessonsTime = lessonsTime;
  lessonsType = lessonsType;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any) {
    if (changes.data?.currentValue) {
      this.data = changes.data.currentValue;
    }
  }

}
