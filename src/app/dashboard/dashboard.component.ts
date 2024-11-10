import { Component, signal, WritableSignal } from '@angular/core';
import { ApiService } from '../common/services/api.service';
import { GetWeatherResponse } from '../common/interfaces/get-weather-response.interface';
import { catchError, tap } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DivDataComponent } from './div-data/div-data.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ReactiveFormsModule, JsonPipe, DivDataComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [ApiService]
})
export class DashboardComponent {
  cityControl: FormControl = new FormControl('');
  isError: boolean = false;
  isLoading: boolean = false;

  dataSignal: WritableSignal<GetWeatherResponse | null> = signal<GetWeatherResponse | null>(null);

  constructor(private readonly api: ApiService) {}


  onGetData(){
    this.isLoading = true;
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

}
