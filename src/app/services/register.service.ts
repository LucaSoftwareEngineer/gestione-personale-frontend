import { RegisterRequest } from './../interfaces/RegisterRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  apiRegister = 'http://localhost:8080/api/auth/register';

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Observable<any> {
    const role = 'USER';

    let req: RegisterRequest = {
      username: username,
      rawPassword: password,
      role: role,
    };

    return this.http.post(this.apiRegister, req);
  }
}
