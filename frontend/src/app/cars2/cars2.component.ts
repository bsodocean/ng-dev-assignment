import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  AfterViewInit,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

export interface Car {
  id: string;
  model?: string;
  engine?: string;
  color?: string;
}

@Component({
  selector: 'app-cars2',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cars2.component.html',
  styleUrl: './cars2.component.scss',
})
export class Cars2Component implements OnInit {
  // Exposing only the observable (name$) while keeping the BehaviorSubject private helps encapsulate the internal state and prevent outside code from directly manipulating the subject
  private carsSubject = new BehaviorSubject<Car[]>([]);
  public cars$ = this.carsSubject.asObservable();
  isLoading = signal(false);
  http = inject(HttpClient);

  fetchCars() {
    this.http
      .get<{ data: Car[] }>('http://localhost:5001/api/cars')
      .pipe(map((res) => res.data))
      .subscribe({
        next: (cars) => {
          this.carsSubject.next(cars);
          this.isLoading.set(false);
        },
        error: (error) => {
          console.error('Error loading cars', error);
          this.isLoading.set(false);
        },
      });
  }

  filterCars(model?: string) {
    let filteredCarsModels = this.cars$.subscribe((res) =>
      res.forEach((car) => car.model)
    );
  }

  ngOnInit(): void {
    this.fetchCars();
    this.filterCars();
  }
}
