import { Component } from '@angular/core';
import { PriorityChartComponent } from './priority-chart/priority-chart.component';
import { UserSummaryComponent } from './user-summary/user-summary.component';
import { DonutChartComponent } from './donut-chart/donut-chart.component';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [PriorityChartComponent, UserSummaryComponent, DonutChartComponent],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.css'
})
export class ChartsComponent {

}
