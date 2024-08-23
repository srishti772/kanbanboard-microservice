import {
  OnInit,
  Component,
  ChangeDetectionStrategy,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { TaskService } from '../../../../services/task.service';
import { TaskSummary } from '../../../../interface/summary.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './donut-chart.component.html',
  styleUrls: ['./donut-chart.component.css'],
})
export class DonutChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) private chart: BaseChartDirective | undefined;
  private tasksSubscription: Subscription = new Subscription();

  public statusLabels: string[] = ['Draft', 'In Progress', 'Completed'];
  public priorityLabels: string[] = ['High', 'Medium', 'Low'];

  // Donut Chart Data
  public donutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [], // Combined labels for both datasets
    datasets: [
      {
        data: [], // Status-wise data
        label: 'Status',
        backgroundColor: ['#ffeb3b', '#2196f3', '#4caf50'], // Colors for status chart
        borderColor: '#ffffff',
        borderWidth: 1,
      },
      {
        data: [], // Priority-wise data
        label: 'Priority',
        backgroundColor: ['#FF5733', '#FFC300', '#DAF7A6'], // Colors for priority chart
        borderColor: '#ffffff',
        borderWidth: 1,
      },
    ],
  };

  public donutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        display: false,
        position: 'right',
      },
      tooltip: {
        
        callbacks: {
          title : (context)=>{return context[0].dataset.label},
          label: (context) => {
            const datasetLabel = context.dataset.label || '';
            const labelIndex = context.dataIndex;
            const value = context.raw;
  
            let label = '';
  
            if (datasetLabel === 'Status') {
              label = this.statusLabels[labelIndex];
            } else if (datasetLabel === 'Priority') {
              label = this.priorityLabels[labelIndex];
            }
  
            return `${label}: ${value} tasks`;
          },
        },
      },
    },
    cutout: '50%', // Create space for the inner circle
  };

  taskSummary: TaskSummary = {};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTaskSummary();
    this.tasksSubscription.add(
      this.taskService.tasks$.subscribe(() => {
        this.loadTaskSummary(); // Reload task summary when tasks change
      })
    );
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe(); // Cleanup subscription
  }

  loadTaskSummary(): void {
    this.taskService.getTaskSummary().subscribe(
      (summary: TaskSummary) => {
        this.taskSummary = summary;
        console.log('Task Summary:', this.taskSummary);
        this.updateDonutChartData();
      },
      (error) => {
        console.error('Error fetching task summary:', error);
      }
    );
  }

  updateDonutChartData(): void {
    // Initialize counts
    const statusCounts = [0, 0, 0]; // Draft, In Progress, Completed
    const priorityCounts = [0, 0, 0]; // High, Medium, Low
  
    // Populate counts based on taskSummary
    for (const [status, priorities] of Object.entries(this.taskSummary)) {
      const statusIndex = this.statusLabels.indexOf(status);
      if (statusIndex !== -1) {
        statusCounts[statusIndex] = Object.values(priorities).reduce(
          (a, b) => a + b,
          0
        );
      }
  
      // Aggregate priority counts
      for (const [priority, count] of Object.entries(priorities)) {
        const priorityIndex = this.priorityLabels.indexOf(priority);
        if (priorityIndex !== -1) {
          priorityCounts[priorityIndex] += count;
        }
      }
    }
  
    // Assign data to datasets
    this.donutChartData.labels = [...this.statusLabels, ...this.priorityLabels];
    this.donutChartData.datasets[0].data = statusCounts; // Status-wise data for the outer circle
    this.donutChartData.datasets[1].data = priorityCounts; // Priority-wise data for the inner circle
    console.log(this.donutChartData);
  
    // Update chart
    if (this.chart) {
      this.chart.chart?.update(); // Explicitly update the chart
    }
  }
  
}
