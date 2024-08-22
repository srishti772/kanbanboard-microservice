import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { ITask } from '../../../interface/task.interface';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [[CdkDropList, CdkDrag, CardComponent, CommonModule]],
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  tasks: ITask[] = [];
  draftTasks: ITask[] = [];
  inProgressTasks: ITask[] = [];
  completedTasks: ITask[] = [];
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.draftTasks = tasks.filter((task) => task.status === 'Draft');
      this.inProgressTasks = tasks.filter(
        (task) => task.status === 'In Progress'
      );
      this.completedTasks = tasks.filter((task) => task.status === 'Completed');
    });

    // Load tasks initially
    this.taskService.loadTasks();
  }

  onDrop(event: CdkDragDrop<ITask[]>): void {
    const task = event.item.data;
    const targetColumnId = event.container.id; // Get the ID of the target column
    const sourceColumnId = event.previousContainer.id; // Get the ID of the source column

    // Update the task's status
    task.status = targetColumnId as 'Draft' | 'In Progress' | 'Completed';

    if (targetColumnId != sourceColumnId) {
      // Save updated task status to the server
      this.taskService.updateTask(task).subscribe((response) => {
        console.log('resss**', response);

      });
    }
  }
}
