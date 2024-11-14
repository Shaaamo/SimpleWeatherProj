import {Component, ElementRef, signal, ViewChild, WritableSignal} from '@angular/core';
import { ApiService } from '../common/services/api.service';
import { GetWeatherResponse } from '../common/interfaces/get-weather-response.interface';
import { catchError, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import { DivDataComponent } from './div-data/div-data.component';
import {RouterLink} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, DivDataComponent, RouterLink, NgForOf, NgIf],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [ApiService]
})
export class DashboardComponent {
  cityControl: FormControl = new FormControl('');
  isError: boolean = false;
  isLoading: boolean = false;
  isLoggedIn: boolean = !!localStorage.getItem('token');
  isAdmin: boolean = localStorage.getItem('isAdmin') === 'true';
  selectedCityImage: string | null = null;
  popularCities = [
    { name: 'Paris', imageUrl: 'http://localhost:3000/paris' },
    { name: 'London', imageUrl: 'http://localhost:3000/london' },
    { name: 'Moscow', imageUrl: 'http://localhost:3000/moscow' },
    { name: 'Warsaw', imageUrl: 'http://localhost:3000/warsaw' },
    { name: 'Berlin', imageUrl: 'http://localhost:3000/berlin' },
    { name: 'Lisbon', imageUrl: 'http://localhost:3000/lisbon' },
    { name: 'Rome', imageUrl: 'http://localhost:3000/rome' },
    { name: 'Sydney', imageUrl: 'http://localhost:3000/sydney' },
    { name: 'Tokyo', imageUrl: 'http://localhost:3000/tokyo' },
  ];


  dataSignal: WritableSignal<GetWeatherResponse | null> = signal<GetWeatherResponse | null>(null);

  constructor(private readonly api: ApiService) {}


  onGetData(){
    this.isLoading = true;

    const cityMatch = this.popularCities.find(city => city.name.toLowerCase() === this.cityControl.value.toLowerCase());
    this.selectedCityImage = cityMatch ? cityMatch.imageUrl : null;

    this.api.getWeather(this.cityControl.value).pipe(
      tap((response) => {
        this.dataSignal.set(response)
        this.isLoading = false;
        this.isError = false;
      }),
      catchError((error) => {
        this.isError = true;
        this.isLoading = false;
        return '';
      })
    ).subscribe()
    this.cityControl.reset();
  }

  onSelectCity(cityName: string, imageUrl: string) {
    this.cityControl.setValue(cityName);
    this.selectedCityImage = imageUrl;
    this.onGetData();
  }

}





