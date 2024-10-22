import { Component, signal, effect } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { CarsComponent } from './cars/cars.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    AboutComponent,
    CarsComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';

  isLoading = signal(false);

  constructor() {
    effect(() => {
      const spinner = document.getElementById('loading-spinner');
      if (spinner) {
        if (this.isLoading()) {
          spinner.style.display = 'block';
        } else {
          spinner.style.display = 'none';
        }
      }
    });
  }

  ngOnInit(): void {
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 2000);
  }
}
