import { Component, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ParcelService, Parcel } from '../../../services/parcels'; 
import * as L from 'leaflet';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ParcelTrackingService } from '../../../services/parcel-tracking';
import { ParcelTracking } from '../../../interfaces/parceltraccking';

@Component({
  selector: 'app-view-parcel',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex mt-7">
      <span class="w-[200px] bg-white border border-black-600 rounded-xl shadow-2xl text-center">
        <button class="text-md font-bold" (click)="goBack()">Exit</button>
      </span>
      <div class="flex justify-center items-center w-[1200px]">
        <h1 class="text-2xl font-bold">Parcel Details</h1>
      </div>
    </div>

    <div class="flex justify-evenly mt-10" *ngIf="parcel">
      <h1 class="font-bold text-xl">Sender ➤ {{ parcel.sender?.fullName || parcel.sender?.email }}</h1>
      <h1 class="font-bold text-xl">Receiver ➤ {{ parcel.receiver?.fullName || parcel.receiver?.email }}</h1>
      <h1 class="font-bold text-xl">From ➤ {{ parcel.pickupAddress }}</h1>
      <h1 class="font-bold text-xl">To ➤ {{ parcel.destinationAddress }}</h1>
    </div>

    <div class="mt-10 px-10">
      <div id="map" class="w-full h-[500px] rounded-xl shadow-lg border"></div>
    </div>
  `,
  styles: []
})
export class ViewParcel implements AfterViewInit, OnDestroy {
  parcel!: Parcel;
  private map!: L.Map;
  private mapInitialized = false;

  constructor(
    private route: ActivatedRoute,
    private parcelService: ParcelService,
    private location: Location,
    private parcelTrackingService: ParcelTrackingService
  ) {}

  // ngAfterViewInit(): void {
  //   const parcelId = this.route.snapshot.paramMap.get('id');
  //   if (parcelId) {
  //     this.parcelService.getParcel(parcelId).subscribe({
  //       next: (data) => {
  //         this.parcel = data;
  //         this.initMap();
  //       },
  //       error: (err) => {
  //         console.error('Failed to fetch parcel details', err);
  //       }
  //     });
  //   }
  // }
  ngAfterViewInit(): void {
    const parcelId = this.route.snapshot.paramMap.get('id');
    if (parcelId) {
      this.parcelService.getParcel(parcelId).subscribe({
        next: (data) => {
          this.parcel = data;
  
          // Fetch tracking updates
          this.parcelTrackingService.findAll().subscribe({
            next: (updates) => {
              const currentUpdate = updates
                .filter(u => u.parcelId === parcelId)
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  
              this.initMap(currentUpdate);
            },
            error: (err) => console.error('Failed to load tracking updates', err)
          });
        },
        error: (err) => console.error('Failed to fetch parcel details', err)
      });
    }
  }
  

  // initMap() {
  //   if (this.mapInitialized || !this.parcel) return;
  //   this.mapInitialized = true;

  //   const pickup = {
  //     lat: this.parcel.pickupLat ?? 0,
  //     lng: this.parcel.pickupLng ?? 0
  //   };
  //   const destination = {
  //     lat: this.parcel.destinationLat ?? 0,
  //     lng: this.parcel.destinationLng ?? 0
  //   };

  //   this.map = L.map('map', {
  //     center: [0, 0],
  //     zoom: 2,
  //     worldCopyJump: true
  //   });

  //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //     attribution: '&copy; OpenStreetMap contributors',
  //     maxZoom: 18,
  //   }).addTo(this.map);

  //   const pickupMarker = L.marker([pickup.lat, pickup.lng]).addTo(this.map);
  //   pickupMarker.bindPopup('Pickup Location').openPopup();

  //   const destinationMarker = L.marker([destination.lat, destination.lng]).addTo(this.map);
  //   destinationMarker.bindPopup('Destination Location');

  //   const latlngs: L.LatLngTuple[] = [
  //     [pickup.lat, pickup.lng],
  //     [destination.lat, destination.lng]
  //   ];

  //   const polyline = L.polyline(latlngs, { color: '#0891b2' }).addTo(this.map);
  //   const bounds = L.latLngBounds(latlngs);
  //   this.map.fitBounds(bounds, { padding: [100, 100], maxZoom: 10 });
  // }
  private currentMarker?: L.Marker;

initMap(currentLocation?: ParcelTracking) {
  if (!this.mapInitialized) {
    this.mapInitialized = true;

    const pickup = {
      lat: this.parcel.pickupLat ?? 0,
      lng: this.parcel.pickupLng ?? 0
    };
    const destination = {
      lat: this.parcel.destinationLat ?? 0,
      lng: this.parcel.destinationLng ?? 0
    };

    this.map = L.map('map', {
      center: [0, 0],
      zoom: 2,
      worldCopyJump: true
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
      maxZoom: 18,
    }).addTo(this.map);

    // Add pickup and destination markers
    L.marker([pickup.lat, pickup.lng], {
      icon: L.icon({ iconUrl: 'assets/images/pickup.svg', iconSize: [25, 41], iconAnchor: [12, 41] })
    }).addTo(this.map).bindPopup('Pickup Location').openPopup();

    L.marker([destination.lat, destination.lng], {
      icon: L.icon({ iconUrl: 'assets/images/pickup.svg', iconSize: [25, 41], iconAnchor: [12, 41] })
    }).addTo(this.map).bindPopup('Destination');

    // Draw initial polyline
    const latlngs: L.LatLngTuple[] = [
      [pickup.lat, pickup.lng],
      ...(currentLocation?.latitude !== undefined && currentLocation?.longitude !== undefined
        ? [[currentLocation.latitude, currentLocation.longitude] as [number, number]]
        : []),
      [destination.lat, destination.lng]
    ];

    L.polyline(latlngs, { color: '#0891b2' }).addTo(this.map);
    const bounds = L.latLngBounds(latlngs);
    this.map.fitBounds(bounds, { padding: [100, 100], maxZoom: 10 });
  }

  // Always update current location marker
  if (currentLocation) {
    if (this.currentMarker) {
      this.map.removeLayer(this.currentMarker);
    }
    this.currentMarker = L.marker([currentLocation.latitude, currentLocation.longitude], {
      icon: L.icon({ iconUrl: 'assets/images/current.svg', iconSize: [25, 41], iconAnchor: [12, 41] })
    }).addTo(this.map).bindPopup(`Current Location: ${currentLocation.location}`).openPopup();
  }
}

  

  goBack() {
    this.location.back();
  }
  private updateInterval: any;

  ngOnDestroy() {
    if (this.map) this.map.remove();
    if (this.updateInterval) clearInterval(this.updateInterval);
  }
}

