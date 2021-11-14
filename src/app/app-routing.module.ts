import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MonthComponent } from './month/month.component';
import { NoGroupComponent } from './no-group/no-group.component';
import { TodayComponent } from './today/today.component';
import { WeekComponent } from './week/week.component';

const routes: Routes = [
  { path: '', component: NoGroupComponent },
  { path: 'today', component: TodayComponent },
  { path: 'week', component: WeekComponent },
  { path: 'month', component: MonthComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
