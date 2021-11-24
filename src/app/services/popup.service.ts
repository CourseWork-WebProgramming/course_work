import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  isPopupOpen: boolean = false;

  isPopupOpenChange: Subject<boolean> = new Subject<boolean>();

  constructor() {
    this.isPopupOpenChange.subscribe((value) => {
      this.isPopupOpen = value;
    });
  }

  openPopup() {
    this.isPopupOpenChange.next(true);
  }

  closePopup() {
    this.isPopupOpenChange.next(false);
  }
}
