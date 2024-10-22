import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';
import { delay, map } from 'rxjs';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface Car {
  id: string;
  model?: string;
  engine?: string;
  color?: string;
}

@Component({
  selector: 'app-cars',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent, ReactiveFormsModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss',
})
export class CarsComponent implements OnInit {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  isLoading = signal(false);
  noCarsAvailable: boolean = false;
  showForm: boolean = false;
  addCarForm: FormGroup;

  constructor(private http: HttpClient) {
    effect(() => {
      const spinner = document.getElementById('loading-spinner');
      if (spinner) {
        spinner.style.display = this.isLoading() ? 'block' : 'none';
      }
    });

    this.addCarForm = new FormGroup({
      model: new FormControl(''),
      engine: new FormControl(''),
      color: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.fetchCars();
  }

  toggleCarForm() {
    this.showForm = !this.showForm;
  }

  fetchCars() {
    this.isLoading.set(true);

    this.http
      .get<{ data: Car[] }>('http://localhost:5001/api/cars')
      .pipe(
        map((res) => res.data),
        delay(2000)
      )
      .subscribe({
        next: (cars) => {
          console.log(cars);
          this.cars = cars;
          this.filteredCars = cars;
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading cars', error);
          this.isLoading.set(false);
        },
      });
  }

  filterCars(model?: string) {
    this.filteredCars =
      model === 'All' || !model
        ? this.cars
        : this.cars.filter((car) => car.model === model);

    this.noCarsAvailable = this.filteredCars.length === 0;
  }

  onSubmit() {
    if (this.addCarForm.valid) {
      const carModel = this.addCarForm.get('model')?.value;
      const carEngine = this.addCarForm.get('engine')?.value;
      const carColor = this.addCarForm.get('color')?.value;

      this.addCar(carModel, carEngine, carColor);
      this.addCarForm.reset();
      this.showForm = false;
    }
  }

  addCar(model: string, engine: string, color: string) {
    let newCar = {
      id: (this.cars.length + 1).toString(),
      model: model,
      engine: engine,
      color: color,
    };
    this.cars.push(newCar);
    this.http.post('http://localhost:5001/api/cars', newCar).subscribe();
  }

  removeCar(index: number) {
    const carId = this.filteredCars[index].id;
    this.filteredCars.splice(index, 1);

    this.http.delete(`http://localhost:5001/api/cars/${carId}`).subscribe({
      next: (res) => {
        console.log('Car removed succesfully', res);
      },
      error: (err) => {
        console.error('Error removing car', err);
      },
    });
  }
}
