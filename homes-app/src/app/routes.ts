import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { UpdateLocationComponent } from './update-location/update-location.component';

const routeConfig: Routes = [
    {
        path: '',
        component: HomeComponent,
        title: 'Home Page'    
    },
    {
        path: 'details/:id',
        component: DetailsComponent,
        title: 'Details Page'    
    },
    {
        path: 'add',
        component: AddLocationComponent,
        title: 'Add Location Page'    
    },
    {
        path: 'update/:id',
        component: UpdateLocationComponent,
        title: 'Update Location Page'    
    },

];

export default routeConfig;


