import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetWeatherResponse } from '../interfaces/get-weather-response.interface'

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey: string = '67e3c998ce59e08da1d0d97b3b6dee11'

  constructor(private http: HttpClient) { }

  getWeather(city: string): Observable<GetWeatherResponse> {
    const apiUrl: string = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${this.apiKey}`;

    return this.http.get<GetWeatherResponse>(apiUrl)
  }

}
