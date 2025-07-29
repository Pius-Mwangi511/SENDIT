import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateUserDto, User } from '../interfaces/user.dtos'; 
import { UpdateUserDto } from '../interfaces/user.dtos'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'http://localhost:3000/users'; // Update to your NestJS API base URL

  constructor(private http: HttpClient) {}

  create(user: CreateUserDto): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }



  findAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  findCouriers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/couriers`);
  }
  
  findOne(id: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  update(id: string, user: UpdateUserDto | FormData): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${id}`, user);
  }

  updateByEmail(email: string, data: FormData | UpdateUserDto): Observable<any> {
    return this.http.patch(`${this.baseUrl}/email/${email}`, data);
  }
  
  


  remove(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
