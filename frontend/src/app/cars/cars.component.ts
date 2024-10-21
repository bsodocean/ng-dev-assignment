import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, Component } from '@angular/core';
import { BehaviorSubject, distinct, map, Subject } from 'rxjs';

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
  constructor(private http: HttpClient) {
    this.fetchCars();
    // this.fetchMeInfo();
  }

  // public carModels: BehaviorSubject<any> = new BehaviorSubject([]);

  carModels: any;

  // fetchCarModels() {
  //   this.http
  //     .get<{ data: Car[] }>('http://localhost:5001/api/cars')
  //     .pipe(
  //       map((response) => {
  //         return response.data.map((car) => car.model);
  //       })
  //     )
  //     .subscribe((models) => (this.carModels = models));
  // }

  fetchCars() {
    this.http
      .get<{ data: Car[] }>('http://localhost:5001/api/cars')
      .pipe(
        map((res) => {
          return res.data;
        })
      )
      .subscribe((cars) => ((this.carModels = cars), console.log(cars)));
  }

  removeCar() {
    this.http.delete('http://localhost:5001/api/cars');
  }

  // fetchMeInfo() {
  //   this.http.get('http://localhost:5001/api/cars').subscribe();
  // }
}
