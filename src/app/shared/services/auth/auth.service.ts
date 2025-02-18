import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Environment } from './enum/environment';
import { RightSignUp, SignUpData } from '../../interfaces/sign-up-data';
import { BehaviorSubject, Observable, catchError, throwError } from 'rxjs';
import { Login } from '../../interfaces/login';
import { VerfyToken } from '../../interfaces/verfy-token';
import { NewPassword, ResetCode, ResetPassword, ResResetCode, ResResetPassword } from '../../interfaces/reset-password';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) {}

  SignUp(Data: SignUpData): Observable<RightSignUp> {
    return this._HttpClient.post<RightSignUp>(`${Environment.BaseUrl}/api/v1/auth/signup`, Data).pipe(
      catchError((error) => {
        console.error('❌ API Error:', error);
        return throwError(() => error); // Error will be handled in the subscription part
      })
    );
  }

  Login(Data : Login): Observable<RightSignUp> {
    return this._HttpClient.post<RightSignUp>(`${Environment.BaseUrl}/api/v1/auth/signin`, Data).pipe(
      catchError((error) => {
        console.error('❌ Login API Error:', error);
        return throwError(() => error);
      })
    );
  }

  SendEmailResetPassword(Data: ResetPassword): Observable<ResResetPassword> {
    return this._HttpClient.post<ResResetPassword>(`${Environment.BaseUrl}/api/v1/auth/forgotPasswords`, Data).pipe(
      catchError((error) => {
        console.error('❌ Reset Password API Error:', error);
        return throwError(() => error);
      })
    );
  }


  SendCodeResetPassword(Data: ResetCode): Observable<ResResetCode> {
    return this._HttpClient.post<ResResetCode>(`${Environment.BaseUrl}/api/v1/auth/verifyResetCode`, Data).pipe(
      catchError((error) => {
        console.error('❌ Reset Code API Error:', error);
        return throwError(() => error);
      })
    );
  }

  SendNewPassword(Data: NewPassword): Observable<any> {
    return this._HttpClient.put<any>(`${Environment.BaseUrl}/api/v1/auth/resetPassword`, Data).pipe(
      catchError((error) => {
        console.error('❌ Reset Code API Error:', error);
        return throwError(() => error);
      })
    );
  }

  verfyToken():Observable<VerfyToken>{
    return this._HttpClient.get<VerfyToken>(`${Environment.BaseUrl}/api/v1/auth/verifyToken` , {
      headers:{
        token : localStorage.getItem('userToken') || '',
      }
    })
  }
}
