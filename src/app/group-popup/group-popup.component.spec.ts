import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupPopupComponent } from './group-popup.component';

describe('GroupPopupComponent', () => {
  let component: GroupPopupComponent;
  let fixture: ComponentFixture<GroupPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
