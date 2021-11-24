import { Component, OnInit } from '@angular/core';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-no-group',
  templateUrl: './no-group.component.html',
  styleUrls: ['./no-group.component.scss']
})
export class NoGroupComponent implements OnInit {

  isGlobalPopupOpen = false;

  constructor(
    private popupService: PopupService
  ) { }

  ngOnInit(): void {
    this.popupService.isPopupOpenChange.subscribe(isPopupOpen => {
      this.isGlobalPopupOpen = isPopupOpen;
    });
  }
}
