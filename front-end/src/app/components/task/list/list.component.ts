import { Component, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { ITask } from '../../../interface/task.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskService } from '../../../services/task.service';
import { CreateComponent } from '../create/create.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    MatListModule,
    CommonModule,
    CardComponent,
    MatButtonModule,
    MatIconModule,
    CreateComponent,
  ],

  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit {
  tasks: ITask[] = [
    { _id:'123',
      title: 'Task 1',
      description: 'Description for Task 1',
      status: 'Draft', // Ensure these match the literals
      priority: 'High',
      owner: 'John Doe',
      dueDate: new Date(),
    },
  ];

  createDialogOpen: boolean = false;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks; 
    });
  }

 

  toggleCreateDialogOpen(): void {
    this.createDialogOpen = !this.createDialogOpen;
    console.log(this.createDialogOpen);
  }
}
