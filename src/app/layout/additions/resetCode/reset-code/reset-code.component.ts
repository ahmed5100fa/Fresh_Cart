import { Component, ChangeDetectorRef } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { NewPasswordComponent } from "../../newPassword/new-password/new-password.component";

@Component({
  selector: 'app-reset-code',
  imports: [ReactiveFormsModule, NewPasswordComponent],
  templateUrl: './reset-code.component.html',
  styleUrl: './reset-code.component.scss'
})
export class ResetCodeComponent {

  isLoading: boolean = false;
  ResetCode: boolean = true;
  resetNewPassword: boolean = false;

  resetCodeForm: FormGroup = new FormGroup({
    resetCode: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]{4,6}$')
    ])
  });

  constructor(private _AuthService: AuthService, private cdr: ChangeDetectorRef) {} 

  submitCodeForm() {
    if (this.resetCodeForm.invalid) return;

    this.isLoading = true;
    this._AuthService.SendCodeResetPassword(this.resetCodeForm.value)
      .subscribe({
        next: () => {
          console.log('✅ Code sent for password reset');
          this.ResetCode = false;
          this.resetNewPassword = true;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('❌ Error sending code: ', error);
        }
      })
      .add(() => this.isLoading = false);
  }
}
