import {Employee} from "./Employee";

export interface GetEmployeesResponse {
  content: Employee[];
  page: {
    size: number;
    totalElements: number;
    totalPages: 3;
  }
}
