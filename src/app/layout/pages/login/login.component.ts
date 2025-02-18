import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  isLoading : boolean = false;

  constructor(private _AuthService: AuthService, private _Router: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
    ])
  });

  submitLoginForm() {
    console.log(this.loginForm.value);
    this.isLoading = true;
    this._AuthService.Login(this.loginForm.value).subscribe({
      next: (data) => {
        console.log('✅ User Logged In Successfully');
        this._Router.navigate(['home']);
        this.isLoading = false;
        localStorage.setItem('userToken', data['token']); 
      },
      error: (err) => {
        if (err.status === 400) {
          console.log('❌ Account does not exist!');
        } else {
          console.log('❌ An error occurred, please try again.');
        }
        this.isLoading = false;
      }
    });
  }
}
