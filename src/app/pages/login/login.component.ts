import { HttpErrorResponse } from '@angular/common/http';
import { LoginService } from './../../services/login.service';
import { CommonModule } from '@angular/common';
import { Component, ErrorHandler } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import SecureLS from 'secure-ls';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login {
  username: string = '';
  password: string = '';
  warning: string = '';
  ls = new SecureLS();

  constructor(private router: Router, private loginService: LoginService) {}

  login() {
    let nErr = 0;

    if (this.username == '') {
      this.warning += 'username mancante';
      nErr++;
    }

    if (this.password == '') {
      if (nErr == 0) {
        this.warning += 'password mancante';
      } else {
        this.warning = 'username e password mancanti';
      }
      nErr++;
    }

    if (nErr == 0) {
      this.ls.remove('user');
      this.loginService.login(this.username, this.password).subscribe({
        next: (authResponse) => {
          if (authResponse.token != '' && authResponse.token != null) {
            this.ls.set('user', authResponse.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (authError) => {
          this.warning = 'Attenzione! username o password errati...';
        },
      });
    }
  }

  resetWarning() {
    this.warning = '';
  }
}
