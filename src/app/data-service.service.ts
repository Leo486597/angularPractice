import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataServiceService {
  readonly dataUrl = "./assets/data/";

  constructor(private http: HttpClient) { }

  getNthWeekAgoCount(id) {
    console.log('getNthWeekAgoCount');

    if (id === 0) {
      let seq = this.http.get(this.dataUrl + "0thWeekAgoCount.json")
      return seq;
    }

    if (id === 1) {
      let seq = this.http.get(this.dataUrl + "1thWeekAgoCount.json")
      return seq;
    }
  }

  getTopTeams() {
    let seq = this.http.get(this.dataUrl + "topTeam.json")
    return seq;
  }

  getTopDiscrepancies() {
    let seq = this.http.get(this.dataUrl + "topDiscrepancy.json")
    return seq;
  }

  getLatest10WeeksCount() {
    let seq = this.http.get(this.dataUrl + "latest10WeeksCount.json")
    return seq;
  }
}
