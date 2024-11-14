import { Component, Input} from '@angular/core';
import {GetWeatherResponse} from '../../common/interfaces/get-weather-response.interface';
import {CommonModule} from '@angular/common';


@Component({
  selector: 'app-div-data',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './div-data.component.html',
  styleUrl: './div-data.component.css'
})
export class DivDataComponent {
  @Input() weatherObj!: GetWeatherResponse | null;
}
