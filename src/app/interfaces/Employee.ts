import { Company } from './Company';

export interface Employee {
  idEmployee: number | null;
  nome: string;
  cognome: string;
  dataNascita: string;
  dataAssunzione: string;
  ral: number;
  dataLicenziamento: string;
  company: Company;
}
