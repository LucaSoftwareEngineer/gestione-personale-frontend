import { AuthRequest } from './../interfaces/AuthRequest';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthResponse } from '../interfaces/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  apiLogin = 'http://localhost:8080/api/auth/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<AuthResponse> {
    let auth: AuthRequest = {
      username: username,
      password: password,
    };
    return this.http.post<AuthResponse>(this.apiLogin, auth);
  }
}
