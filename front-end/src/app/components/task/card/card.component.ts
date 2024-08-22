import { Component, Input, OnInit } from '@angular/core';
import { ITask } from '../../../interface/task.interface';
import { MatIcon } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { IUser } from '../../../interface/user.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [MatCardModule, MatIcon, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent implements OnInit {
  @Input() task: ITask = {} as ITask;
  @Input() variant: string = "default";

  isCollapsed: boolean = true;

  constructor(private taskService: TaskService) {}

    ngOnInit(): void {
    }
  
   
  
  

  deleteTask(task: ITask): void {
    this.taskService.deleteTask(this.task).subscribe((res) => {
      console.log(res);
    });
  }
  toggleCollapse(): void {
    this.isCollapsed = !this.isCollapsed;
    console.log('clicked' + this);
  }

  getPriorityClass(priority: string): string {
    switch (priority) {
      case 'High':
        return 'priority-high';
      case 'Medium':
        return 'priority-medium';
      case 'Low':
        return 'priority-low';
      default:
        return '';
    }
  }

  getProgressBars(status: string) {
    switch (status) {
      case 'Draft':
        return [{ class: 'progress-draft' }];
      case 'In Progress':
        return [{ class: 'progress-draft' }, { class: 'progress-in-progress' }];
      case 'Completed':
        return [
          { class: 'progress-draft' },
          { class: 'progress-in-progress' },
          { class: 'progress-completed' },
        ];
      default:
        return [];
    }
  }

  getCardClass(): string {
    return this.variant === 'default' ? 'default-background' : 'variant-background';
  }

  getOwnerName(): string | undefined {
    const ownerParts = this.task.owner?.split(' - ') || [];
     return ownerParts.length > 1 ? ownerParts[1] : this.task.owner;
  }
}
