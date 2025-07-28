import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Parcel {
  id?: string;
  weight: number;
  category: string;
  pickupAddress: string;
  destinationAddress: string;
  senderEmail: string;
  receiverEmail: string;
  courierEmail?: string;
  pickupLat?: number;
  pickupLng?: number;
  destinationLat?: number;
  destinationLng?: number;
  status?: 'PENDING' | 'IN_TRANSIT' | 'DELIVERED' | 'CANCELLED'; 
  sender?: any;
  receiver?: any;
  courier?: any;
  editing?: boolean; // optional, for toggling edit mode in UI
}

@Injectable({
  providedIn: 'root',
})
export class ParcelService {
  private baseUrl = 'http://localhost:3000/parcels';

  constructor(private http: HttpClient) {}

  createParcel(parcel: Parcel): Observable<Parcel> {
    return this.http.post<Parcel>(this.baseUrl, parcel);
  }

  getParcels(): Observable<Parcel[]> {
    return this.http.get<Parcel[]>(this.baseUrl);
  }

  getParcel(id: string): Observable<Parcel> {
    return this.http.get<Parcel>(`${this.baseUrl}/${id}`);
  }

  updateParcel(id: string, parcel: Partial<Parcel>): Observable<Parcel> {
    return this.http.patch<Parcel>(`${this.baseUrl}/${id}`, parcel);
  }
  

  deleteParcel(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  assignCourier(parcelId: string, courierEmail: string): Observable<any> {
    return this.http.patch(`${this.baseUrl}/${parcelId}/assign-courier`, {
      courierEmail,
    });
  }
}


