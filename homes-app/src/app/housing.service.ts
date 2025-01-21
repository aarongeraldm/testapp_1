import { Injectable } from '@angular/core';
import { HousingLocation } from './housinglocation';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  url = 'http://localhost:3000/locations';

  constructor() { }
   
  async getAllHousingLocations(): Promise<HousingLocation[]> {
    const data = await fetch(this.url);
    return await data.json() ?? [];
  }

  async getHousingLocationById(id: number): Promise<HousingLocation | undefined> {
    const data = await fetch(`${this.url}/${id}`);
    return await data.json() ?? {};
  }

  async createHousingLocation(location: HousingLocation): Promise<HousingLocation | undefined> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location }),
    });
    return await response.json();
  }

  async deleteHousingLocation(id: number): Promise<void> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'DELETE',
    });
  
  }

  async updateHousingLocation(id: number, location: Partial<HousingLocation>): Promise<HousingLocation | undefined> {
    const response = await fetch(`${this.url}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location }),
    });
    return await response.json();
  }
  

}
