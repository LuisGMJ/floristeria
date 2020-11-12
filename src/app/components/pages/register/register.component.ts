import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm: FormGroup;

  loading = false;

  remember = false;

  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private toastr: ToastrService,
              private router: Router) {
    this.createForm();
  }

  ngOnInit(): void {
    
  }

  get invalidEmail() {
    return this.userForm.get('email').invalid && this.userForm.get('email').touched;
  }
  get invalidName() {
    return this.userForm.get('name').invalid && this.userForm.get('name').touched;
  }
  get invalidPassword() {
    return this.userForm.get('password').invalid && this.userForm.get('password').touched;
  }

  createForm() {
    this.userForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      remember: ['']
    });
  }

  save() {
    if (!this.userForm.valid) {
      this.userForm.markAllAsTouched();
    } else {
      this.loading = true;
      this.authService.register(this.userForm.value);
    }
  }

}
