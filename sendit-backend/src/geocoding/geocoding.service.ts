import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class GeocodingService {
  async getCoordinates(address: string): Promise<{ lat: number; lng: number }> {
    const apiKey = process.env.OPENCAGE_API_KEY;
    const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
      address,
    )}&key=${apiKey}`;

    const res = await axios.get(url);

    const location = res.data.results[0]?.geometry;
    if (!location) {
      throw new Error(`Failed to geocode address: ${address}`);
    }

    return { lat: location.lat, lng: location.lng };
  }
}
