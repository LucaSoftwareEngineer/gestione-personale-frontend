import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { initFlowbite } from 'flowbite';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from '../../services/employee.service';
import { CompanyService } from '../../services/company.service';
import { Employee } from '../../interfaces/Employee';
import { Router } from "@angular/router";

@Component({
  selector: 'app-modal-aggiungi-dipendente',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-aggiungi-dipendente.component.html',
  styleUrl: './modal-aggiungi-dipendente.component.css',
})
export class ModalAggiungiDipendenteComponent implements OnInit {

  nome = '';
  cognome = '';
  dataNascita = '';
  dataAssunzione = '';
  ral = 0;
  statoAssunzione = true;
  dataLicenziamento = '';

  @Output()
  eventEmployeeAdded = new EventEmitter<boolean>();

  constructor(
    private toastr: ToastrService,
    private companyService: CompanyService,
    private employeeService:EmployeeService,
    private router: Router) {

  }

  ngOnInit(): void {
    initFlowbite();
  }

  setStatoAssunzioneAssunto() {
    this.dataLicenziamento = '';
    this.statoAssunzione = true;
  }

  setStatoAssunzioneLicenziato() {
    this.statoAssunzione = false;
  }

  addEmployee() {
    let nErr = 0;
    let strErr = '';

    if (this.nome == '') {
      strErr += 'inserisci il nome... <br>';
      nErr++;
    }

    if (this.cognome == '') {
      strErr += 'inserisci il cognome... <br>';
      nErr++;
    }

    if (this.dataNascita == '') {
      strErr += 'inserisci la data di nascita... <br>';
      nErr++;
    }

    if (this.dataAssunzione == '') {
      strErr += 'inserisci la data di assunzione... <br>';
      nErr++;
    }

    if (this.ral == 0) {
      strErr += 'inserisci la RAL... <br>';
      nErr++;
    }

    if (this.statoAssunzione == false) {
      if (this.dataLicenziamento == '') {
        strErr += 'inserisci la data di licenziamento... <br>';
        nErr++;
      }
    }

    if (nErr == 0) {
      this.companyService.getCompanyOfUser().subscribe(companyOfUser => {
        const employee: Employee = {
          idEmployee: null,
          nome: this.nome,
          cognome: this.cognome,
          dataNascita: this.dataNascita,
          dataAssunzione: this.dataAssunzione,
          ral: this.ral,
          dataLicenziamento: this.dataLicenziamento,
          company: companyOfUser
        }
        this.employeeService.addEmployee(employee).subscribe({
          next: (result) => {
            this.toastr.success('Dipendente aggiunto correttamante', 'Successo!');
            document.getElementById("close-aggiungi-dipendente-modal")?.click();
            this.resetInput();
            this.eventEmployeeAdded.emit(true);
          },
          error: (error) => {this.toastr.error('Qualcosa è andato storto, riprova più tardi', 'Errore!')}
        });
      });
    } else {
      this.toastr.warning(strErr, 'Attenzione!', { enableHtml: true });
    }

  }

  resetInput() {
    this.nome = '';
    this.cognome = '';
    this.dataNascita = '';
    this.ral = 0;
    this.dataAssunzione = '';
    this.dataLicenziamento = '';
  }
}
