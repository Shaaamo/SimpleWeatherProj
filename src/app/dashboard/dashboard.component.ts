import {Component} from '@angular/core';
import {ApiService} from '../common/services/api.service';
import {GetWeatherResponse} from '../common/interfaces/get-weather-response.interface';
import {catchError, tap} from 'rxjs';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {JsonPipe, NgForOf, NgIf} from '@angular/common';
import {DivDataComponent} from './div-data/div-data.component';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';


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
  isAdmin: boolean = false;
  selectedCityImage: string | null = null;
  popularCities: Array<{ name: string }> = [];

  weatherObj: GetWeatherResponse | null = null;

  constructor(private readonly api: ApiService, private http: HttpClient) {
    this.fetchAdminData();
  }

  fetchAdminData() {
    const token = localStorage.getItem('token');
    if (!token) return;

    this.http
      .get<{ isAdmin: boolean; cities: { name: string }[] }>(
        'http://localhost:3000/popular-cities',
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .subscribe({
        next: (response) => {
          this.isAdmin = response.isAdmin;
          this.popularCities = response.cities;
        },
        error: () => {
          this.isAdmin = false;
          this.popularCities = [];
        },
      });
  }


  onGetData() {
    this.isLoading = true;

    this.api.getWeather(this.cityControl.value).pipe(
      tap((response) => {
        this.weatherObj = response;
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

  onSelectCity(cityName: string) {
    this.cityControl.setValue(cityName);
    this.onGetData();
    this.http.get(`http://localhost:3000/${cityName.toLowerCase()}`, {
      headers: {'Authorization': `Bearer ${localStorage.getItem('token')}`},
      responseType: 'blob'
    }).subscribe({
      next: (response) => {
        this.selectedCityImage = URL.createObjectURL(response);
      },
      error: (err) => {
        if (err.status === 401) {
          console.error('Unauthorized access');
          this.selectedCityImage = null;
        }
      }
    })
  }

}





