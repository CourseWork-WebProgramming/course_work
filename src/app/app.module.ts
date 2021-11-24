import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NavComponent } from './nav/nav.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { TableComponent } from './table/table.component';
import { CalendarComponent } from './calendar/calendar.component';
import { GroupPopupComponent } from './group-popup/group-popup.component';
import { NoGroupComponent } from './no-group/no-group.component';
import { TodayComponent } from './today/today.component';
import { WeekComponent } from './week/week.component';
import { MonthComponent } from './month/month.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    ScheduleComponent,
    TableComponent,
    CalendarComponent,
    GroupPopupComponent,
    NoGroupComponent,
    TodayComponent,
    WeekComponent,
    MonthComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
