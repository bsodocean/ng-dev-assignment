import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { map } from 'rxjs';

export interface Car {
  id: string;
  model: string;
  engine: string;
  color: string;
}

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss',
})
export class CarsComponent {
  carModels: Car[] = [];
  filteredCars: Car[] = [];

  constructor(private http: HttpClient) {
    this.fetchCars();
  }

  fetchCars() {
    this.http
      .get<{ data: Car[] }>('http://localhost:5001/api/cars')
      .pipe(map((res) => res.data))
      .subscribe((cars) => {
        this.carModels = cars;
        this.filteredCars = cars; // Initialize with all cars
      });
  }

  filterCars(model?: string) {
    if (model === 'All' || !model) {
      this.filteredCars = this.carModels;
    } else {
      this.filteredCars = this.carModels.filter((car) => car.model === model);
    }
  }

  removeCar(index: number) {
    this.filteredCars.splice(index, 1);
  }
}
