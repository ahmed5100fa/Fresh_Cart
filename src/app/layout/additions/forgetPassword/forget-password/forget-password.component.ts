import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { ResetCodeComponent } from "../../resetCode/reset-code/reset-code.component";

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule, ResetCodeComponent],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
  isLoading: boolean = false;
  forgetpass : boolean = true;
  resetCode : boolean = false;

  forgetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
    ])
  });

  constructor(private _AuthService: AuthService) {}

  submitForm() {
    if (this.forgetPasswordForm.invalid) return;

    this.isLoading = true;
    this._AuthService.SendEmailResetPassword(this.forgetPasswordForm.value)
      .subscribe({
        next: () => {
          console.log('✅ Email sent for password reset');
          this.forgetpass = false;
          this.resetCode = true;
          console.log('forgetpass:', this.forgetpass, 'resetCode:', this.resetCode); 
        },
        error: (error) => {
          console.error('❌ Error sending email: ', error);
        }
      })
      .add(() => this.isLoading = false);
  }

}
