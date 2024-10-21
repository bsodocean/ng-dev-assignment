import { Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full',
  },
  { path: 'about', component: AboutComponent },
  { path: 'cars', component: CarsComponent },
];
