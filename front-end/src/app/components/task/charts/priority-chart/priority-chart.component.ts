import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { ChartOptions } from 'chart.js';



@Component({
  selector: 'app-priority-chart',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './priority-chart.component.html',
  styleUrl: './priority-chart.component.css',
})
export class PriorityChartComponent {
  title = 'ng2-charts-demo';

  // Doughnut
  public doughnutChartLabels: string[] = [ 'High', 'Medium', 'Low' ];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
      { data: [ 350, 450, 100 ], label: 'Tasks' },
    ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false
  };


  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [ [ 'Download', 'Sales' ], [ 'In', 'Store', 'Sales' ], 'Mail Sales' ];
  public pieChartDatasets = [ {
    data: [ 300, 500, 100 ]
  } ];
  public pieChartLegend = true;
  public pieChartPlugins = [];
  
  public barChartLegend = true;
  // Bar Chart Labels
  public barChartLabels: string[] = ['Draft', 'In Progress', 'Completed'];

  // Bar Chart Data
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: this.barChartLabels,
    datasets: [
      {
        data: [2, 1, 0], // Example data for High priority
        label: 'High Priority',
        backgroundColor: '#FF5733', // Customize colors
      },
      {
        data: [2, 3, 1], // Example data for Medium priority
        label: 'Medium Priority',
        backgroundColor: '#FFC300', // Customize colors
      },
      {
        data: [1, 2, 1], // Example data for Low priority
        label: 'Low Priority',
        backgroundColor: '#DAF7A6', // Customize colors
      }
    ]
  };

  // Bar Chart Options
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    scales: {
      x: {
        stacked: true, // Stack bars on x-axis
      },
      y: {
        stacked: true, // Stack bars on y-axis
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const value = context.raw;
            return `${label}: ${value} tasks`;
          }
        }
      }
    }
  };


  constructor() {
  }
}
