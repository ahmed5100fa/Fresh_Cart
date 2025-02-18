import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-password',
  imports: [ReactiveFormsModule],
  templateUrl: './new-password.component.html',
  styleUrl: './new-password.component.scss'
})
export class NewPasswordComponent {
  isLoading: boolean = false;

  newPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ]),
    newPassword : new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$')
    ])
  });

  constructor(private _AuthService: AuthService , private _Router:Router) {}

  submitnewPasswordForm() {
    if (this.newPasswordForm.invalid) return;

    this.isLoading = true;
    this._AuthService.SendNewPassword(this.newPasswordForm.value)
      .subscribe({
        next: () => {
          console.log('✅ Reset Password Done.');
          this._Router.navigate(['/login']);
        },
        error: (error) => {
          console.error('❌ Error sending email: ', error);
        }
      })
      .add(() => this.isLoading = false);
  }

}
