import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HousingService } from '../housing.service';
import { FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HousingLocation } from '../housinglocation';

@Component({
  selector: 'app-update-location',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <h1>Update Housing Location</h1>
    <form [formGroup]="updateForm" (ngSubmit)="updateLocation()">
      <div class="form-group">
        <label for="name">Name:</label>
        <input id="name" formControlName="name" placeholder="Enter location name" />
      </div>

      <div class="form-group">
        <label for="city">City:</label>
        <input id="city" formControlName="city" placeholder="Enter city" />
      </div>

      <div class="form-group">
        <label for="state">State:</label>
        <input id="state" formControlName="state" placeholder="Enter state" />
      </div>

      <div class="form-group">
        <label for="availableUnits">Available Units:</label>
        <input id="availableUnits" type="number" formControlName="availableUnits" placeholder="Enter number of units" />
      </div>

      <div class="form-group">
        <label>WiFi:</label>
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
        <label>Laundry:</label>
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
        <button type="submit">Save Changes</button>
        <button type="button" (click)="cancel()">Cancel</button>
      </div>
    </form>

  `,
  styleUrls: ['./update-location.component.css']
})
export class UpdateLocationComponent {
  route = inject(ActivatedRoute);
  router = inject(Router);
  housingService = inject(HousingService);

  updateForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    city: new FormControl<string>('', [Validators.required]),
    state: new FormControl<string>('', [Validators.required]),
    availableUnits: new FormControl<number>(0, [Validators.required, Validators.min(0)]),
    wifi: new FormControl<boolean>(false, [Validators.required]),
    laundry: new FormControl<boolean>(false, [Validators.required]),
  });

  housingLocationId!: number;

  constructor() {
    this.housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingService.getHousingLocationById(this.housingLocationId).then(location => {
      if (location) {
        this.updateForm.patchValue({
          name: location.name,
          city: location.city,
          state: location.state,
          availableUnits: location.availableUnits,
          wifi: location.wifi,
          laundry: location.laundry,
        });
      }
    });
  }

  async updateLocation(): Promise<void> {
    try {
      const updatedLocation = await this.housingService.updateHousingLocation(
        this.housingLocationId,
        this.updateForm.value as HousingLocation // Type assertion ensures compatibility
      );
      alert('Location updated successfully!');
      this.router.navigate(['/']); // Redirect to the home page or details page
    } catch (error) {
      console.error('Failed to update location:', error);
      alert('Failed to update location.');
    }
  }

  cancel(): void {
    this.router.navigate(['/details', this.housingLocationId]); // Redirect back to details page
  }
}
