import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router"
import { cathedras, groups, years } from '../constants';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-group-popup',
  templateUrl: './group-popup.component.html',
  styleUrls: ['./group-popup.component.scss']
})
export class GroupPopupComponent implements OnInit {
  groupForm!: FormGroup;
  isSubmitDisabled: boolean = false;
  cathedras = cathedras;
  years = years;
  groups = groups;

  @Output() closePopupEvent = new EventEmitter();

  constructor(
    private scheduleService: ScheduleService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    const groupInfo = this.scheduleService.getGroupInfo();
    this.groupForm = this.formBuilder.group({
      cathedra: groupInfo.cathedra ? [groupInfo.cathedra] : [null],
      year: groupInfo.year ? [groupInfo.year] : [null],
      group: groupInfo.group ? [groupInfo.group] : [null],
    });
  }

  closePopup() {
    this.closePopupEvent.emit();
  }

  onSubmit() {
    this.scheduleService.setGroupInfo(this.groupForm.value);
    this.closePopup();
    this.router.navigate(['/today']);
  }
}
