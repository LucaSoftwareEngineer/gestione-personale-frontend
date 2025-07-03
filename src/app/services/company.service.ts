import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import SecureLS from 'secure-ls';
import { Company } from '../interfaces/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  ls = new SecureLS();
  apiGetCompany = 'http://localhost:8080/api/company/of/user';

  constructor(private http: HttpClient) { }

  getCompanyOfUser():Observable<Company> {
    let token = this.ls.get('user');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Company>(this.apiGetCompany.concat('?token=').concat(token), { headers });
  }

}
