import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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
export class Register {
  username: string = '';
  password: string = '';
  warning: string = '';

  constructor(
    private toastr: ToastrService,
    private registerService: RegisterService
  ) {}

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

    if (nErr == 0) {
      this.registerService.register(this.username, this.password).subscribe({
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
