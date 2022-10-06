import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpForm!: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private router: Router) { }

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      fname: ['', [Validators.required]],
      lname: [''],
      mobileEmail: [''],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]]
    })
  }

  onSubmit() {
    this.toastr.success("Account Created Successfully", "Success");
    this.router.navigate(['/login']);
  }

}
