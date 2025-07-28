// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { provideHttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { RegisterDto } from '../interfaces/auth.dtos';
import { LoginDto } from '../interfaces/auth.dtos'; 
import {  ForgotPasswordDto } from '../interfaces/auth.dtos'; 
import {  ResetPasswordDto} from '../interfaces/auth.dtos'; 
import {   VerifyEmailDto } from '../interfaces/auth.dtos';  
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
 
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3000/auth';

  register(dto: RegisterDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, dto);
  }

  login(dto: LoginDto): Observable<{ access_token: string }> {
    return this.http.post<{ access_token: string }>(`${this.baseUrl}/login`, dto);
  }

  forgotPassword(dto: ForgotPasswordDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/forgot-password`, dto);
  }

  resetPassword(dto: ResetPasswordDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/reset-password`, dto);
  }

  verifyEmail(dto: VerifyEmailDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/verify-email`, dto);
  }
  
}
