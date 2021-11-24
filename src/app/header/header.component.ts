import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../services/popup.service';
import { ScheduleService } from '../services/schedule.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isPopupOpen: boolean = false;
  group: string = "";

  isGlobalPopupOpen = false;

  constructor(
    private scheduleService: ScheduleService,
    private router: Router,
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.router.navigate(['/']);
    this.scheduleService.groupChange.subscribe(value => {
      this.group = value;
    });

    this.popupService.isPopupOpenChange.subscribe(isPopupOpen => {
      this.isGlobalPopupOpen = isPopupOpen;
    });
  }

  openPopup() {
    this.isPopupOpen = true;
    this.popupService.openPopup();
  }

  closePopup() {
    this.isPopupOpen = false;
    this.popupService.closePopup();
  }
}
