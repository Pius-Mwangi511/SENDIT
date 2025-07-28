import { Parcel } from "../services/parcels";

export interface CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone?: string;
  }

  export interface UpdateUserDto{
    name?: string;
    email?: string;
    password?: string;
    profileImage?: string;
    phone?: string;
    role?: 'USER' | 'COURIER' | 'ADMIN';
  }
  
  export interface User{
    name: string;
    email: string;
    password: string;
    phone: string;
    role: 'USER' | 'COURIER' | 'ADMIN';
  }
  export interface AdminParcel extends Parcel {
    editing?: boolean;
    selectedCourierEmail?: string;
  }
  