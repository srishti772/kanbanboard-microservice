import { OnInit, Component, ChangeDetectionStrategy, OnDestroy, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions, Chart } from 'chart.js';
import { Subscription } from 'rxjs';
import { TaskService } from '../../../../services/task.service';
import 'chartjs-plugin-annotation'; // Ensure this is correct

@Component({
  selector: 'app-user-summary',
  standalone: true,
  imports: [BaseChartDirective],
  changeDetection: ChangeDetectionStrategy.Default,
  templateUrl: './user-summary.component.html',
  styleUrls: ['./user-summary.component.css'],
})
export class UserSummaryComponent implements OnInit, OnDestroy {
  @ViewChild(BaseChartDirective) private chart: BaseChartDirective | undefined;
  private tasksSubscription: Subscription = new Subscription();

  title = 'Bar Chart';

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [], // User names will be set here
    datasets: [], // Data will be set here
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    indexAxis: 'y',
    maintainAspectRatio: true,
    scales: {
      x: {
        stacked: true,
      
      },
      y: {
        stacked: true,

        ticks: {
          display: true,
          padding: 0,
          align: 'start',
        },
        grid: {
          display: true,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
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

  constructor(private taskService: TaskService) {
    this.addCustomPlugin();
  }

  ngOnInit(): void {
    this.loadChartData();
    this.tasksSubscription.add(this.taskService.tasks$.subscribe(() => {
      this.loadChartData(); // Reload task summary when tasks change
    }));
  }

  ngOnDestroy(): void {
    this.tasksSubscription.unsubscribe();
  }

  private addCustomPlugin(): void {
    const stackLabelsPlugin = {
      id: 'stackLabels',
      afterDatasetsDraw: (chart: any) => {
        const { ctx, scales: { x, y } } = chart;
        ctx.save();

        const labeledStacks: { [key: string]: Set<string> } = {};

        chart.data.datasets.forEach((dataset: any, i: any) => {
          const bars = chart.getDatasetMeta(i).data;

          for (let index = bars.length - 1; index >= 0; index--) {
            const bar = bars[index];
            const stackName = dataset.stack;
            const userName = chart.data.labels[index];

            if (dataset.label === 'High') {
              if (!labeledStacks[userName]) {
                labeledStacks[userName] = new Set<string>();
              }

              if (!labeledStacks[userName].has(stackName)) {
                const labelText = `${stackName}`;
                ctx.textAlign = 'left';
                ctx.font = '9px Arial';
                ctx.fillStyle = 'black';

                const xPosition = bar.x;
                const yPosition = bar.y;

                ctx.fillText(labelText, xPosition, yPosition);

                labeledStacks[userName].add(stackName);
              }
            }
          }
        });

        ctx.restore();
      },
    };

    Chart.register(stackLabelsPlugin);
  }

  private loadChartData(): void {
    this.tasksSubscription.add(
      this.taskService.getUserSummary().subscribe(data => {
        const transformedData = this.transformData(data);
        this.barChartData = transformedData;
      })
    );
  }

  private transformData(apiData: any): ChartConfiguration<'bar'>['data'] {
    const labels: string[] = [];
    const datasets: any[] = [];

    const priorities = ['Low', 'Medium', 'High'];
    const statuses = ['Draft', 'In Progress', 'Completed'];

    // Prepare initial datasets for each status and priority
    statuses.forEach(status => {
      priorities.forEach(priority => {
        datasets.push({
          label: priority,
          data: [],
          backgroundColor: this.getColor(priority),
          stack: status,
        });
      });
    });

    // Process API data
    Object.keys(apiData).forEach(userKey => {
      const userData = apiData[userKey];
      labels.push(userKey.split('-')[1]); // Add user to labels

      statuses.forEach(status => {
        priorities.forEach(priority => {
          const value = userData[status]?.[priority] || 0;
          datasets.find(ds => ds.label === priority && ds.stack === status)!.data.push(value);
        });
      });
    });

    return {
      labels,
      datasets,
    };
  }

  private getColor(priority: string): string {
    switch (priority) {
      case 'Low':
        return '#DAF7A6';
      case 'Medium':
        return '#FFC300';
      case 'High':
        return '#FF5733';
      default:
        return '#000000';
    }
  }
}
