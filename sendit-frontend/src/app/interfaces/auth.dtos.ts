// src/app/services/dtos.ts

export interface RegisterDto {
    name: string;
    email: string;
    phone: string;
    password: string;
  }
  
  export interface LoginDto {
    email: string;
    password: string;
  }
  
  export interface ForgotPasswordDto {
    email: string;
  }
  
  export interface ResetPasswordDto {
    token: string;
    newPassword: string;
  }
  
  export interface VerifyEmailDto {
    token: string;
  }
  