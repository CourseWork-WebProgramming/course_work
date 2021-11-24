import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PopupService } from '../services/popup.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  currentUrl: string = '/today';

  isGlobalPopupOpen = false;

  constructor(
    private router: Router,
    private popupService: PopupService
  ) {
  }

  ngOnInit(): void {
    this.currentUrl = this.router.url;

    this.popupService.isPopupOpenChange.subscribe(isPopupOpen => {
      this.isGlobalPopupOpen = isPopupOpen;
    });
  }

}
