import { Component } from '@angular/core';
import { PriorityChartComponent } from './priority-chart/priority-chart.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [PriorityChartComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {

}
