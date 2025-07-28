import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { signal } from '@angular/core';
import { CreateParcelTrackingDto } from '../interfaces/parceltraccking';
import { UpdateParcelTrackingDto } from '../interfaces/parceltraccking'; 
import { ParcelTracking } from '../interfaces/parceltraccking'; 

@Injectable({
  providedIn: 'root',
})
export class ParcelTrackingService {
  private baseUrl = 'http://localhost:3000/tracking'; // Adjust to match your API base

  constructor(private http: HttpClient) {}

  create(dto: CreateParcelTrackingDto) {
    return this.http.post<ParcelTracking>(this.baseUrl, dto);
  }

  findAll() {
    return this.http.get<ParcelTracking[]>(this.baseUrl);
  }

  findOne(id: string) {
    return this.http.get<ParcelTracking>(`${this.baseUrl}/${id}`);
  }

  update(id: string, dto: UpdateParcelTrackingDto) {
    return this.http.patch<ParcelTracking>(`${this.baseUrl}/${id}`, dto);
  }

  remove(id: string) {
    return this.http.delete<{ message: string }>(`${this.baseUrl}/${id}`);
  }
}
