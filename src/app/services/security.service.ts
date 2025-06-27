import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenValidationResponse } from '../interfaces/TokenValidationResponse';

@Injectable({
  providedIn: 'root',
})
export class SecurityService {
  apiValidationToken = 'http://localhost:8080/api/auth/token/validation';

  constructor(private http: HttpClient) {}

  validationToken(token: string): Observable<TokenValidationResponse> {
    const json = {
      token: token,
    };
    return this.http.post<TokenValidationResponse>(
      this.apiValidationToken,
      json
    );
  }
}
