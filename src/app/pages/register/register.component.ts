import { Company } from './../../interfaces/Company';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class Register implements OnInit {
  username: string = '';
  password: string = '';
  name: string = '';
  surname: string = '';
  idCompany: string = '';

  companyList: Company[] = [];

  constructor(
    private toastr: ToastrService,
    private registerService: RegisterService
  ) {}

  ngOnInit(): void {
    this.registerService.getCompany().subscribe((json) => {
      for (let k = 0; k < json.length; k++) {
        this.companyList.push(json[k]);
      }
    });
  }

  register() {
    let nErr = 0;

    if (this.username == '') {
      this.toastr.warning('Username mancante...', 'Attenzione!');
      nErr++;
    }

    if (this.password == '') {
      this.toastr.warning('Password mancante...', 'Attenzione!');
      nErr++;
    }

    if (this.name == '') {
      this.toastr.warning('Nome mancante...', 'Attenzione!');
      nErr++;
    }

    if (this.surname == '') {
      this.toastr.warning('Cognome mancante...', 'Attenzione!');
    }

    if (
      this.idCompany == '' ||
      this.idCompany == null ||
      this.idCompany == undefined
    ) {
      this.toastr.warning('Azienda mancante...', 'Attenzione!');
    }

    if (nErr == 0) {
      this.registerService
        .register(
          this.username,
          this.password,
          this.name,
          this.surname,
          this.idCompany
        )
        .subscribe({
          next: (res) => {
            this.toastr.success(
              'Registrazione completata, ora puoi accedere...',
              'Successo!'
            );
          },
          error: (res) => {
            this.toastr.error(
              'Questo username è già stato utilizzato da un altro utente...',
              'Attenzione!'
            );
          },
        });
    }
  }
}
