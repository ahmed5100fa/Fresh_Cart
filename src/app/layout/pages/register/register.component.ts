import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { SignUpData } from '../../../shared/interfaces/sign-up-data';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  isLoading : boolean = false;
  constructor(private _AuthService: AuthService, private _Router:Router) {}

  PasswordMatchValidator(x: AbstractControl): ValidationErrors | null {
    const password = x.get('password')?.value;
    const rePassword = x.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }

  registerForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20)
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
    ]),
    rePassword: new FormControl('', [
      Validators.required
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/)
    ])
  }, { validators: this.PasswordMatchValidator });

  sendSignUpData(Data: SignUpData) {
    this.isLoading = true;
    this._AuthService.SignUp(Data).subscribe({
      next: (response) => {
        this.isLoading = false;
        console.log('✅ User Sign Up Success');
        this._Router.navigate(['home']);
        localStorage.setItem('userToken' , response['token'])
      },
      error: (err) => {
        this.isLoading = false;
        if (err.status === 400) {
          console.log('Account already exists!');
        } else {
          console.log('An error occurred, please try again.');
        }
      }
    });
  }

  SubmitRegisterForm() {
    if (this.registerForm.valid) {
      this.sendSignUpData(this.registerForm.value);
    } else {
      console.log('❌ Form is invalid');
      this.registerForm.markAllAsTouched();
    }
  }
}
