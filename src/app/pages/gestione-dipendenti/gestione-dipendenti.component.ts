import { Component, inject, OnInit, signal, Signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { initFlowbite, initModals, initTooltips, Tooltip } from 'flowbite';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Employee } from '../../interfaces/Employee';
import { EmployeeService } from '../../services/employee.service';
import { TooltipDataLicenziamentoComponent } from '../../components/tooltip-data-licenziamento/tooltip-data-licenziamento.component';
import { ToastrService } from 'ngx-toastr';
import { ModalAggiungiDipendenteComponent } from '../../components/modal-aggiungi-dipendente/modal-aggiungi-dipendente.component';
import { CompanyService } from "../../services/company.service";
import {filter} from "rxjs";

@Component({
  selector: 'app-gestione-dipendenti',
  standalone: true,
  imports: [
    NavbarComponent,
    SidebarComponent,
    CommonModule,
    FormsModule,
    TooltipDataLicenziamentoComponent,
    ModalAggiungiDipendenteComponent
  ],
  templateUrl: './gestione-dipendenti.component.html',
  styleUrl: './gestione-dipendenti.component.css',
})
export class GestioneDipendentiComponent implements OnInit {
  employeeService = inject(EmployeeService);
  companyService = inject(CompanyService);
  employees: Employee[] = [];
  paginationCounter = 0;
  modal_delete_employee_id: number | null = null;
  modal_edit_employee_id: number | null = null;
  totalPages: number = 0;
  pages:number[] = [];
  tmp_filter_nome: string = "";
  tmp_filter_cognome: string = "";
  filter_nome: string = '';
  filter_cognome: string = '';

  //inputs for Modal Edit Employee
  nome = '';
  cognome = '';
  dataNascita = '';
  dataAssunzione = '';
  ral = 0;
  statoAssunzione = true;
  dataLicenziamento = '';

  constructor(private toastr: ToastrService) {}

  ngOnInit(): void {
    initFlowbite();
    initModals();
    initTooltips();
    this.initPagination();
  }

  initPagination() {
    this.employees = [];
    this.pages = [];
    this.paginationCounter = 0;
    this.filter_nome = '';
    this.filter_cognome = '';
    this.companyService.getCompanyOfUser().subscribe(company => {
      this.employeeService.getEmployees(company, 0, this.filter_nome, this.filter_cognome).subscribe(json => {
        this.employees = json.content;
        this.totalPages = json.page.totalPages-1;
        for (let i = 0; i <= this.totalPages; i++) {
          this.pages.push(i);
        }
      });
    });
  }

  applyFilter() {

    let nErr = 0;

    if (this.tmp_filter_nome == '') {
      this.toastr.warning("Inserisci nome...", "Attenzione!");
      nErr++;
    }

    if (this.tmp_filter_cognome == '') {
      this.toastr.warning("Inserisci cognome...", "Attenzione!");
      nErr++;
    }

    if (nErr == 0) {
      this.employees = [];
      this.pages = [];
      this.filter_nome = this.tmp_filter_nome;
      this.filter_cognome = this.tmp_filter_cognome;
      this.paginationCounter = 0;
      this.companyService.getCompanyOfUser().subscribe(company => {
        this.employeeService.getEmployees(company, 0, this.filter_nome, this.filter_cognome).subscribe(json => {
          this.employees = json.content;
          this.totalPages = json.page.totalPages - 1;
          for (let i = 0; i <= this.totalPages; i++) {
            this.pages.push(i);
          }
        });
      });
    }
  }

  cancelFilter() {
    this.initPagination();
  }

  paginationBack() {
    this.paginationCounter--;
    this.companyService.getCompanyOfUser().subscribe(company => {
      this.employeeService.getEmployees(company, this.paginationCounter, this.filter_nome, this.filter_cognome).subscribe(json => {
        this.employees = json.content;
      });
    });
  }

  paginationNext() {
    this.paginationCounter++;
    this.companyService.getCompanyOfUser().subscribe(company => {
      this.employeeService.getEmployees(company, this.paginationCounter, this.filter_nome, this.filter_cognome).subscribe(json => {
        this.employees = json.content;
      });
    });
  }

  openDeleteEmployeeModal(idEmployee: number | null) {
    document.getElementById('openDeleteEmployeeModal')?.click();
    this.modal_delete_employee_id = idEmployee;
  }

  deleteEmployee() {
    if (this.modal_delete_employee_id != null) {
      this.employeeService
        .deleteEmployee(this.modal_delete_employee_id)
        .subscribe({
          next: (res) => {
            this.toastr.success(
              'Dipendente eliminato correttamente',
              'Successo!'
            );
            this.initPagination();
          },
          error: (res) => {
            this.toastr.error(
              'Qualcosa è andato storto, riprova più tardi...',
              'Attenzione!'
            );
          },
        });
    }
  }

  handleEventEmployeeAdded(event:boolean) {
    this.initPagination();
  }

  openEditEmployeeModal(idEmployee: number | null) {
    if (idEmployee != null) {
      this.modal_edit_employee_id = idEmployee;
      this.employeeService.getEmployeeDetails(idEmployee).subscribe(json => {
        this.nome = json[0].nome;
        this.cognome = json[0].cognome;
        this.dataNascita = json[0].dataNascita;
        this.dataAssunzione = json[0].dataAssunzione;
        this.dataLicenziamento = json[0].dataLicenziamento;
        this.dataAssunzione = json[0].dataAssunzione;
        this.ral = json[0].ral;
        if (this.dataLicenziamento == null || this.dataLicenziamento == '' || this.dataLicenziamento == undefined) {
          this.statoAssunzione = true;
        } else {
          this.statoAssunzione = false;
        }
        document.getElementById('openEditEmployeeModal')?.click();
      });
    }
  }

  editEmployee() {
    let strWarning = '';
    let nWarning = 0;

    if (this.nome == '') {
      strWarning += 'Inserisci nome <br>';
      nWarning++;
    }

    if (this.cognome == '') {
      strWarning += 'Inserisci cognome <br>';
      nWarning++;
    }

    if (this.dataNascita == '') {
      strWarning += 'Inserisci data di nascita <br>';
      nWarning++;
    }

    if (this.dataAssunzione == '') {
      strWarning += 'Inserisci data di assunzione <br>';
      nWarning++;
    }

    if (this.ral == 0 || this.ral == null) {
      strWarning += 'Inserisci ral <br>';
      nWarning++;
    }

    if (this.statoAssunzione == false) {
      if (this.dataLicenziamento == '' || this.dataLicenziamento == null) {
        strWarning += 'Inserisci data di licenziamento <br>';
        nWarning++;
      }
    } else {
      this.dataLicenziamento = '';
    }

    if (nWarning == 0) {
      this.companyService.getCompanyOfUser().subscribe(company => {
        if (this.modal_edit_employee_id != null) {
          let employee: Employee = {
            idEmployee: this.modal_edit_employee_id,
            nome: this.nome,
            cognome: this.cognome,
            dataNascita: this.dataNascita,
            dataAssunzione: this.dataAssunzione,
            ral: this.ral,
            dataLicenziamento: this.dataLicenziamento,
            company: company
          }
          this.employeeService.editEmployee(this.modal_edit_employee_id, employee).subscribe({
            next: (res) => {
              this.toastr.success("Modifiche salvate", 'Successo!');
              document.getElementById('close-modifica-dipendente-modal')?.click();
              this.initPagination();
            },
            error: (res) => {this.toastr.error('Qualcosa è andato storto riprova più tardi', 'Errore!')}
          });
        }
      });
    } else {
      this.toastr.warning(strWarning, 'Attenzione!', {enableHtml:true});
    }
  }

  setStatoAssunzioneAssunto() {
    this.statoAssunzione = true;
  }

  setStatoAssunzioneLicenziato() {
    this.statoAssunzione = false;
  }
}
