import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm: FormGroup;

  loading = false;

  showVerificationMessage: boolean;

  constructor(private fb: FormBuilder,
              private authService: AuthService) {
    this.createForm();
  }

  ngOnInit(): void {
    if (localStorage.getItem('email')) {
      this.userForm.get('email').setValue(localStorage.getItem('email'));
      this.userForm.get('remember').setValue(true);
    }
  }

  get invalidEmail() {
    return this.userForm.get('email').invalid && this.userForm.get('email').touched;
  }

  get invalidPassword() {
    return this.userForm.get('password').invalid && this.userForm.get('password').touched;
  }

  createForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      remember: ['']
    });
  }

  login() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
    } else {
      this.loading = true;
      this.authService.login(this.userForm.value).then(() => {
        if (this.userForm.get('remember').value) {
          localStorage.setItem('email', this.userForm.get('email').value);
        } else {
          localStorage.removeItem('email');
        }
        /* setTimeout(() => {
          console.log(this.authService.emailVerified);
        this.showVerificationMessage = this.authService.emailVerified;
        }, 1000); */
      }).finally(() => {
        this.loading = false;
      });

      this.authService.emailVerified.subscribe(res => {
        console.log(res);
        this.showVerificationMessage = res;
      });
    }
  }

}
