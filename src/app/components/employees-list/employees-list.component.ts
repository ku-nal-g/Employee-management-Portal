import { ToastrService } from 'ngx-toastr';
import { EmployeesDataService } from './../../services/employees-data.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss']
})
export class EmployeesListComponent implements OnInit {

  adminEmail!: string;
  employeesList: any;
  deleteEmpName!: string;
  deleteEmpIndex!: number;
  date: any = new Date();
  imagePath: any;
  editEmpIndex!: number;
  searchText: any;

  insertEmployee!: FormGroup;
  editEmployee!: FormGroup;

  constructor(private authService: AuthService, private employeesDataService: EmployeesDataService, private toastr: ToastrService, private fb: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.adminEmail = localStorage.getItem('email') || '{}';
    setTimeout(()=>{
      this.employeesDataService.getEmployeesData().subscribe((res)=>{
        this.employeesList = res;
        this.spinner.hide();
      })
    },2000)
    this.createInsertFormGroup();
    this.editFormGroup();
  }
  logOut() {
    this.authService.logout();
    this.toastr.success("Logged out Successfully", "Success");
  }
  getDeleteEmpName(empName: string) {
    this.deleteEmpName = empName;
    this.deleteEmpIndex = this.employeesList.findIndex((x: { name: string; }) => x.name == this.deleteEmpName);
  }
  deleteEmployee() {
    this.employeesList.splice(this.deleteEmpIndex, 1);
    this.toastr.success("Employee deleted SuccessFully", "Success");
  }
  createInsertFormGroup() {
    this.insertEmployee = this.fb.group({
      name: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      education: ['1', [Validators.required]],
      image: ['', [Validators.required]],
      company: ['', [Validators.required]],
      experience: ['', [Validators.required]],
      salary: ['', Validators.required]
    })
  }
  addEmployee() {
    let reqObj = {
      id: this.employeesList.length + 1,
      image: this.imagePath,
      name: this.insertEmployee.value.name,
      birthdate: this.insertEmployee.value.birthDate,
      gender: this.insertEmployee.value.gender,
      education: this.insertEmployee.value.education,
      company: this.insertEmployee.value.company,
      experience: this.insertEmployee.value.experience,
      Salary: this.insertEmployee.value.salary,
    }
    this.employeesList.push(reqObj);
    this.toastr.success("Employee Added SuccessFully", "Success");
  }
  changeDateForm() {
    let month = (this.date.getMonth() + 1).toString();
    let date = (this.date.getDate()).toString();
    if (month.length < 2) month = "0" + month
    if (date.length < 2) date = "0" + date
    return (this.date.getFullYear() + "-" + month + "-" + date);
  }
  //Image upload
  selectFile(event: any) {
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imagePath = reader.result;
    }
  }
  editFormGroup() {
    this.editEmployee = this.fb.group({
      empName: [''],
      empBirthDate: [''],
      empGender: [''],
      empEducation: [''],
      empImage: [''],
      empCompany: [''],
      empExperience: [''],
      empSalary: ['']
    })
  }
  fillEditFormGroup(empName: string) {
    this.editEmpIndex = this.employeesList.findIndex((x: { name: string; }) => x.name == empName);
    this.editEmployee.patchValue({
      'empName': this.employeesList[this.editEmpIndex].name, 'empBirthDate': this.employeesList[this.editEmpIndex].birthdate,
      'empGender': this.employeesList[this.editEmpIndex].gender, 'empEducation': this.employeesList[this.editEmpIndex].education,
      'empCompany': this.employeesList[this.editEmpIndex].company, 'empExperience': this.employeesList[this.editEmpIndex].experience,
      'empSalary': this.employeesList[this.editEmpIndex].Salary
    })
  }
  employeeEditFunction() {
    this.employeesList[this.editEmpIndex].name = this.editEmployee.value.empName;
    if(this.imagePath){
      console.log(this.imagePath);
      this.employeesList[this.editEmpIndex].image = this.imagePath;
    }
    else{
      this.employeesList[this.editEmpIndex].image = this.employeesList[this.editEmpIndex].image;
    }
    this.employeesList[this.editEmpIndex].birthdate = this.editEmployee.value.empBirthDate;
    this.employeesList[this.editEmpIndex].gender = this.editEmployee.value.empGender;
    this.employeesList[this.editEmpIndex].education = this.editEmployee.value.empEducation;
    this.employeesList[this.editEmpIndex].company = this.editEmployee.value.empCompany;
    this.employeesList[this.editEmpIndex].experience = this.editEmployee.value.empExperience;
    this.employeesList[this.editEmpIndex].Salary = this.editEmployee.value.empSalary;
    this.toastr.success("Employee edited Successfully", "Success");
  }
  applyFilter(event: Event) {
    this.searchText = (event.target as HTMLInputElement).value;
    console.log(this.searchText);
  }
}
