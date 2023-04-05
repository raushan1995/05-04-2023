import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-dashboard',
  templateUrl: './employee-dashboard.component.html',
  styleUrls: ['./employee-dashboard.component.css']
})
export class EmployeeDashboardComponent implements OnInit {

  formValue !: FormGroup;
  patientModelObj : PatientModel = new PatientModel();
  patientData !: any;
  showAdd !:boolean;
  showUpdate !:boolean;
  
  constructor(private formbuilder:FormBuilder,
    private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      id:[''],
      name : [''],
      address : [''],
      problem : [''],
     
    })
    this.getAllPatient();
  }
  getAllPatient() {
    throw new Error('Method not implemented.');
  }
  clickAddPatient(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }
  postPatientDetails(){
    this.patientModelObj.id = this.formValue.value.id;
    this.patientModelObj.name = this.formValue.value.name;
    this.patientModelObj.address = this.formValue.value.address;
    this.patientModelObj.problem = this.formValue.value.problem;
  

    this.api.postPatient(this.patientModelObj)
    .subscribe(res=>{
      console.log(res);
      alert('Patient Added Successfully')
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPatient();
    },
    err=>{
        alert("Something Went wrong");
    })
  }

  getAllPAtient(){
    this.api.getPatient()
    .subscribe(res=>{
      this.patientData = res;
    })
  }
  deletePatient(row : any){
    this.api.deletePatient(row.id)
    .subscribe(res=>{
      alert("Patient Deleted");
      this.getAllPatient();
    })
  }
  onEdit(row: any){
    this.showAdd=false;
    this.showUpdate=true;
    this.patientModelObj.id=row.id;
    this.formValue.controls['id'].setValue(row.id);
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['problem'].setValue(row.problem);
   

  }
  updateEmployeeDetails(){
    this.patientModelObj.id = this.formValue.value.id;
    this.patientModelObj.name = this.formValue.value.name;
    this.patientModelObj.address = this.formValue.value.address;
    this.patientModelObj.problem = this.formValue.value.problem;
   
    this.api.updatePatient(this.patientModelObj,this.patientModelObj.id)
    .subscribe(res=>{
      alert("Updated Successfully");
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllPatient();
    })
  }
  getAllPatient() {
    throw new Error('Method not implemented.');
  }
}
