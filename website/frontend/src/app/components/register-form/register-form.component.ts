import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { first } from 'rxjs/operators';
import * as crypto from 'crypto-js';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //     this.router.navigate(['/']);
    // }
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      userName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    const {
      userName,
      firstName,
      lastName,
      email,
      password
    } = this.registerForm.value;
    const user = {
      userName,
      firstName,
      lastName,
      email,
      password: crypto.SHA256(password).toString()
    };

    this.userService
      .register(user as any)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['/']);
        },
        error => {
          // this.alertService.error(error.error);
          console.log(error.error);
        }
      );
  }
}
