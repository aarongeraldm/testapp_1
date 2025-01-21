import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housinglocation';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h2>Add a New Housing Location</h2>
    <article class="form-container">
      <form [formGroup]="addLocationForm" (submit)="addLocation()">
        <div class="form-group">
          <label for="name">Location Name</label>
          <input id="name" type="text" formControlName="name" required placeholder="Enter location name" />
        </div>

        <div class="form-group">
          <label for="city">City</label>
          <input id="city" type="text" formControlName="city" required placeholder="Enter city" />
        </div>

        <div class="form-group">
          <label for="state">State</label>
          <input id="state" type="text" formControlName="state" required placeholder="Enter state" />
        </div>

        <div class="form-group">
          <label for="photo">Photo URL</label>
          <input id="photo" type="text" formControlName="photo" placeholder="Enter photo URL" />
        </div>

        <div class="form-group">
          <label for="availableUnits">Available Units</label>
          <input id="availableUnits" type="number" formControlName="availableUnits" required placeholder="Enter number of units" />
        </div>

        <div class="form-group">
          <label>WiFi</label>
          <div class="radio-group">
            <label>
              <input type="radio" formControlName="wifi" value="true" /> Yes
            </label>
            <label>
              <input type="radio" formControlName="wifi" value="false" /> No
            </label>
          </div>
        </div>

        <div class="form-group">
          <label>Laundry</label>
          <div class="radio-group">
            <label>
              <input type="radio" formControlName="laundry" value="true" /> Yes
            </label>
            <label>
              <input type="radio" formControlName="laundry" value="false" /> No
            </label>
          </div>
        </div>

        <div class="button-group">
          <button type="submit" class="primary">Add Location</button>
          <button type="button" (click)="navigateToHome()">Return</button>
        </div>
      </form>
    </article>

  `,
  styleUrls: ['./add-location.component.css'],
})
export class AddLocationComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  housingService = inject(HousingService);
  router = inject(Router); 


  addLocationForm = new FormGroup({
    name: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    photo: new FormControl(''),
    availableUnits: new FormControl(0),
    wifi: new FormControl(false),
    laundry: new FormControl(false),
  });

  async addLocation() {
    const newLocation: HousingLocation = {
      id: 0, 
      name: this.addLocationForm.value.name ?? '',
      city: this.addLocationForm.value.city ?? '',
      state: this.addLocationForm.value.state ?? '',
      photo: this.addLocationForm.value.photo ?? '',
      availableUnits: this.addLocationForm.value.availableUnits ?? 0, 
      wifi: this.addLocationForm.value.wifi ?? false,
      laundry: this.addLocationForm.value.laundry ?? false,
    };

    try {
      const createdLocation = await this.housingService.createHousingLocation(newLocation);
      if (createdLocation) {
        alert('Location added successfully!');
        this.addLocationForm.reset();
      } else {
        alert('Failed to add location. Please try again.');
      }
    } catch (error) {
      console.error('Error adding location:', error);
      alert('An error occurred while adding the location. Please try again.');
    }
  }

  navigateToHome(): void {
    this.router.navigate(['/']);  
}
}
