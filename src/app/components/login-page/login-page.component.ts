import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  login!: FormGroup;
  userEmail!: string;
  userPassword!: string;
  isChecked!: any;
  showEyeBtn:boolean = true;
  isHidden:boolean = true;

  constructor(private router: Router, private authService: AuthService, private fb: FormBuilder, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      check: [''],
    })
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/employees-list']);
    }
    this.userEmail = localStorage.getItem('email') || '{}';
    this.userPassword = localStorage.getItem('password') || '{}';
    this.isChecked = localStorage.getItem('check') || '{}';
    if (this.userPassword != '{}') {
      this.login.patchValue({ email: this.userEmail });
      this.login.patchValue({ password: this.userPassword });
      this.login.patchValue({ check: this.isChecked });
    }
  }
  onSubmit() {
    if (this.login.valid) {
      this.authService.login(this.login.value).subscribe(
        (_res) => {
          localStorage.setItem('email', this.login.value.email);
          this.toastr.success('Logged in Successfully', 'Success');
          this.router.navigate(['/employees-list']);
        },
        (_err: Error) => {
          this.toastr.error('Oops Enter Correct Details!!!', 'Error')
        }
      );
    }
       // remember me checked case
       if (this.login.value.check) {
        localStorage.setItem("email", this.login.value.email);
        localStorage.setItem("password", this.login.value.password);
        localStorage.setItem("check", this.login.value.check);
      }
  }
  eyeButtonFunc(){
    this.showEyeBtn = !this.showEyeBtn;
    this.isHidden = !this.isHidden;
  }
}
