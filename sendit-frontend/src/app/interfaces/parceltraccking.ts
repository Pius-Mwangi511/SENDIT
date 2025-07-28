export interface CreateParcelTrackingDto {
    parcelId: string;
    // latitude: number;
    // longitude: number;
    location: string;
    statusNote?: string;
    timestamp: string; 
  }
  

  export interface UpdateParcelTrackingDto {
    location?: string;
    // latitude?: number;
    // longitude?: number;
    timestamp?: Date;
    statusNote?: string;
  }

  export interface ParcelTracking {
    id: string;
    parcelId: string;
    location: string;
    latitude: number;
    longitude: number;
    timestamp: string;
    statusNote?: string;
  }
  