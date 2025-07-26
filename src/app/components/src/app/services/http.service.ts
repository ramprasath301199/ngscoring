import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public API = environment.apiBaseUrl;
  private http = inject(HttpClient);
  GetallTeams() {
    return this.http.get(this.API + 'team/getallteams');
  }
  createTeam(payload: any) {
    return this.http.post(this.API + 'team/createteam', payload);
  }
  getAllsquad(id: any) {
    return this.http.get(`${this.API}squad/team/${id}`);
  }
  createPlayer(
    teamId: any,
    mobile: any,
    firstname: any,
    lastname: any,
    profile: any
  ) {
    const payload = {
      teamId,
      mobile,
      firstname,
      lastname,
      profile,
    };
    return this.http.post(`${this.API}squad/team/add`, payload);
  }
  createplayerExcel(data: any) {
    const formdata = new FormData();
    formdata.append('file', data);
    return this.http.post(`${this.API}squad/add-excel`, formdata);
  }
  createMatch(payload: any) {
    return this.http.post(`${this.API}match/create-match`, payload);
  }
  getallMatch() {
    return this.http.get(`${this.API}match/getallmatch`);
  }
  createUser(payload: any) {
    return this.http.post(`${this.API}auth/createuser`, payload);
  }
  LoginUser(payload: any) {
    return this.http.post(`${this.API}auth/loginuser`, payload);
  }
}
