import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingLocation } from '../housinglocation';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img
        class="listing-photo"
        [src]="housingLocation?.photo"
        alt="Exterior photo of {{ housingLocation?.name }}"
        crossorigin
      />
      <section class="listing-description">
        <h2 class="listing-heading">{{ housingLocation?.name }}</h2>
        <p class="listing-location">{{ housingLocation?.city }}, {{ housingLocation?.state }}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units available: {{ housingLocation?.availableUnits }}</li>
          <li>Does this location have wifi: {{ housingLocation?.wifi }}</li>
          <li>Does this location have laundry: {{ housingLocation?.laundry }}</li>
        </ul>
      </section>
      
      <div class="button-group">
        <button (click)="navigateToUpdate()">Update</button>
        <button (click)="deleteLocation()" class="delete-button">Delete</button>
        <button (click)="navigateToHome()">Return</button>
      </div>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  router = inject(Router); 
  housingLocation: HousingLocation | undefined;

  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(housingLocationId).then(housingLocation => {
      this.housingLocation = housingLocation;
    });
  }

  async deleteLocation(): Promise<void> {
    if (!this.housingLocation?.id) return;

    try {
      await this.housingService.deleteHousingLocation(this.housingLocation.id);
      alert('Location deleted successfully.');
      this.router.navigate(['/']); 
    } catch (error) {
      console.error('Error deleting location:', error);
      alert('Failed to delete location.');
    }
  }

  navigateToUpdate(): void {
    if (this.housingLocation?.id) {
        this.router.navigate(['/update', this.housingLocation.id]);
    }
}

  navigateToHome(): void {
    this.router.navigate(['/']);  
}
}
