import { OnInit, Component,ChangeDetectionStrategy, AfterViewInit, ViewChild, OnDestroy} from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { TaskService } from '../../../../services/task.service';
import { TaskSummary } from '../../../../interface/summary.interface';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-priority-chart',
  standalone: true,
  imports: [BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.Default,

  templateUrl: './priority-chart.component.html',
  styleUrls: ['./priority-chart.component.css'],
})
export class PriorityChartComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) private chart: BaseChartDirective | undefined;
  private tasksSubscription: Subscription = new Subscription();


  title = 'ng2-charts-demo';

  // Doughnut
  public doughnutChartLabels: string[] = ['High', 'Medium', 'Low'];
  public doughnutChartDatasets: ChartConfiguration<'doughnut'>['data']['datasets'] = [
    { data: [350, 450, 100], label: 'Tasks' },
  ];

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: false,
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: false,
  };
  public pieChartLabels = [
    ['Download', 'Sales'],
    ['In', 'Store', 'Sales'],
    'Mail Sales',
  ];
  public pieChartDatasets = [
    {
      data: [300, 500, 100],
    },
  ];
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
        data: [], // Will be populated dynamically
        label: 'High',
        backgroundColor: '#FF5733', // Customize colors
      },
      {
        data: [], // Will be populated dynamically
        label: 'Medium',
        backgroundColor: '#FFC300', // Customize colors
      },
      {
        data: [], // Will be populated dynamically
        label: 'Low',
        backgroundColor: '#DAF7A6', // Customize colors
      },
    ],
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
      },
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
          },
        },
      },
    },
  };

  taskSummary: TaskSummary = {};

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTaskSummary();
    this.tasksSubscription.add(this.taskService.tasks$.subscribe(() => {
      this.loadTaskSummary(); // Reload task summary when tasks change
    }));
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe(); // Cleanup subscription
  }
  



  loadTaskSummary(): void {
    this.taskService.getTaskSummary().subscribe(
      (summary: TaskSummary) => {
        this.taskSummary = summary;
        console.log('Task Summary:', this.taskSummary);
        this.updateBarChartData();
      },
      (error) => {
        console.error('Error fetching task summary:', error);
      }
    );
  }

  updateBarChartData(): void {
    // Initialize counts
    const highPriorityCounts = [0, 0, 0]; // Draft, In Progress, Completed
    const mediumPriorityCounts = [0, 0, 0];
    const lowPriorityCounts = [0, 0, 0];

    // Populate counts based on taskSummary
    for (const [status, priorities] of Object.entries(this.taskSummary)) {
      const statusIndex = this.barChartLabels.indexOf(status);

      if (statusIndex !== -1) {
        highPriorityCounts[statusIndex] = priorities.High || 0;
        mediumPriorityCounts[statusIndex] = priorities.Medium || 0;
        lowPriorityCounts[statusIndex] = priorities.Low || 0;
      }
    }

    this.barChartData.datasets[0].data = highPriorityCounts;
    this.barChartData.datasets[1].data = mediumPriorityCounts;
    this.barChartData.datasets[2].data = lowPriorityCounts;

    if (this.chart) {
      this.chart.chart?.update(); // Explicitly update the chart
    }

    
  }
}
