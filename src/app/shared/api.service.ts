import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {map} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  updatePatient(patientModelObj: any, id: any) {
    throw new Error('Method not implemented.');
  }
  deletePatient(id: any) {
    throw new Error('Method not implemented.');
  }

  constructor(private http : HttpClient) { }

  postPatient(data : any){
    return this.http.post<any>("http://localhost:8090/api/v1/addPatient", data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  getPatient(){
    return this.http.get<any>("http://localhost:8090/api/v1/findAllPatient")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
  
}


