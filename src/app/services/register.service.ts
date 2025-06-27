import { RegisterRequest } from './../interfaces/RegisterRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Company } from '../interfaces/Company';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  apiRegister = 'http://localhost:8080/api/auth/register';
  apiGetCompany = 'http://localhost:8080/api/company/all';

  constructor(private http: HttpClient) {}

  register(
    username: string,
    password: string,
    name: string,
    surname: string,
    idCompany: string
  ): Observable<any> {
    const role = 'USER';

    let req: RegisterRequest = {
      username: username,
      rawPassword: password,
      role: role,
      name: name,
      surname: surname,
      idCompany: idCompany,
    };

    return this.http.post(this.apiRegister, req);
  }

  getCompany(): Observable<Company[]> {
    return this.http.get<Company[]>(this.apiGetCompany);
  }
}
