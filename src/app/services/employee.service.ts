import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import SecureLS from 'secure-ls';
import { Company } from '../interfaces/Company';
import { Employee } from '../interfaces/Employee';
import { CompanyService } from './company.service';
import {GetEmployeesResponse} from "../interfaces/GetEmployeesResponse";

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  ls = new SecureLS();
  token = this.ls.get('user');
  apiGetEmployees = 'http://localhost:8080/api/employee/get';
  apiAddEmployee = 'http://localhost:8080/api/employee/add';
  apiDeleteEmployee = 'http://localhost:8080/api/employee/delete';
  apiEditEmployee = 'http://localhost:8080/api/employee/edit';
  company: Company = { idCompany: 0, name:'' };

  constructor(private http: HttpClient) { }


  getEmployees(company:Company, page: number, nome:string, cognome:string): Observable<GetEmployeesResponse> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.get<GetEmployeesResponse>(
      this.apiGetEmployees + `?page=${page}&size=5&idCompany=${company.idCompany}&nome=${nome}&cognome=${cognome}`,
      { headers }
    );
  }

  addEmployee(employee: Employee): Observable<any> {
    const headers = { Authorization: `Bearer ${this.token}` };
    let json = {
      nome:employee.nome,
      cognome:employee.cognome,
      dataNascita:employee.dataNascita,
      dataAssunzione:employee.dataAssunzione,
      ral:employee.ral,
      dataLicenziamento:employee.dataLicenziamento,
      idCompany:employee.company.idCompany
    }
    return this.http.post(this.apiAddEmployee, json, { headers });
  }

  deleteEmployee(id: number): Observable<any> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.delete<any>(this.apiDeleteEmployee + '?id=' + id, {
      headers,
    });
  }

  getEmployeeDetails(id: number): Observable<Employee[]> {
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.get<Employee[]>(this.apiGetEmployees + `/${id}`, { headers });
  }

  editEmployee(id:number, employee:Employee): Observable<Employee> {
    const json = {
      nome: employee.nome,
      cognome: employee.cognome,
      dataNascita: employee.dataNascita,
      dataAssunzione: employee.dataAssunzione,
      ral: employee.ral,
      dataLicenziamento: employee.dataLicenziamento
    };
    const headers = { Authorization: `Bearer ${this.token}` };
    return this.http.put<Employee>(this.apiEditEmployee + `/${id}`, json, { headers });
  }
}
