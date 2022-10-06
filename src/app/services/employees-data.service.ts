import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EmployeesDataService {

  apiUrl:string = "assets/employees-data.json";

  constructor(private http:HttpClient) { }

  getEmployeesData():Observable<any>{
    return this.http.get(this.apiUrl);
  }
}
