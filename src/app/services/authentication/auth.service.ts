import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public API = environment.apiBaseUrl;
  constructor(private http: HttpClient) {}
  createUser(payload: any) {
    return this.http.post(`${this.API}auth/create`, payload);
  }
  LoginUser(payload: any) {
    return this.http.post(`${this.API}auth/login`, payload);
  }
}
