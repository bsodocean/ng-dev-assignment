import { Routes } from '@angular/router';
import { CarsComponent } from './cars/cars.component';
import { AboutComponent } from './about/about.component';
import { Cars2Component } from './cars2/cars2.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/about',
    pathMatch: 'full',
  },
  { path: 'about', component: AboutComponent },
  { path: 'cars', component: CarsComponent },
  { path: 'cars2', component: Cars2Component },
];
