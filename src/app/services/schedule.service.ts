import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { groupNames } from '../constants';
import { GroupInfo } from '../interfaces/group';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  url: string = "http://localhost:4300";
  cathedra: string = "";
  year: string = "";
  group: string = "";

  groupChange: Subject<string> = new Subject<string>();

  constructor(
    private http: HttpClient
  ) {
    this.groupChange.subscribe((value) => {
      this.group = value;
    });
  }

  setCathedra(cathedra: string) {
    this.cathedra = cathedra;
  }

  setYear(year: string) {
    this.year = year;
  }

  setGroup(group: string) {
    this.groupChange.next(group);
  }

  getGroupInfo() {
    return {
      cathedra: this.cathedra,
      year: this.year,
      group: this.group
    }
  }

  setGroupInfo(info: GroupInfo) {
    this.cathedra = info.cathedra || this.cathedra;
    this.year = info.year || this.year;
    this.groupChange.next(info.group || this.group);
  }

  clearGroup() {
    this.groupChange.next("");
  }

  getSchedule() {
    return this.http.get(`${this.url}/${groupNames[this.group]}`);
  }
}
