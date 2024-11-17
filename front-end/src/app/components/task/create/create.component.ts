import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../../services/task.service';
import { UserService } from '../../../services/user.service';
import { ITask } from '../../../interface/task.interface';
import { futureDateValidator } from '../../../validators/custom-validators';  
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IUser } from '../../../interface/user.interface';
import { IEntity } from '../../../interface/entity.interface';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],


})

export class CreateComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<CreateComponent>);
  readonly data = inject<{ task: ITask, isEditing: boolean }>(MAT_DIALOG_DATA);

  isEditing = this.data.isEditing;

  readonly id = new FormControl(this.data.task._id || '');


  readonly title = new FormControl(this.data.task.title ||'', [
    Validators.required,
    Validators.maxLength(20),
    Validators.minLength(5),
  ]);

  readonly description = new FormControl(this.data.task.description || '', [
    Validators.required,
    Validators.minLength(5),
  ]);

  readonly priority = new FormControl(this.data.task.priority || '', [
    Validators.required,
  ]);

  readonly owner = new FormControl(this.data.task.owner?.split(' - ')[0]  || '', [
    Validators.required,
  ]);

  readonly dueDate = new FormControl(this.data.task.dueDate || '',[
    Validators.required,
    futureDateValidator(),

  ]);

  readonly status = new FormControl(this.data.task.status  || 'Draft', [
    Validators.required,
  ]);

  taskForm = new FormGroup({
    id: this.id,
    title: this.title,
    description: this.description,
    priority: this.priority,
    owner: this.owner,
    dueDate: this.dueDate,
    status: this.status,
  });
  users: IUser[] = [];


  ngOnInit() {
    this.userService.users$.subscribe(users => {
      this.users = users; 
    });

     
    if (this.isEditing) {
      const taskOwnerNuid = this.data.task.owner?.split(' - ')[0]; 
      this.owner.setValue(taskOwnerNuid ?? null);
    }
  }
  constructor(private taskService: TaskService, private userService: UserService){};
  private convertToDate(dateValue: any): Date | undefined {
    if (!dateValue) {
      return  new Date(""); 
    }
  
    const parsedDate = new Date(dateValue);
    return isNaN(parsedDate.getTime()) ? undefined : parsedDate; 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
 
  onSubmit(): void {
    if (!this.taskForm.valid) {
      console.log('Form is invalid');
      return;
    }
   
    const selectedNuid = this.taskForm.value.owner;
    const selectedUser = this.users.find(user => user.nuid === selectedNuid);
  
    // Map form values to ITask
    const newTask: ITask = {
      ...(this.isEditing && this.taskForm.value.id ? { _id: this.taskForm.value.id as string } : {}),
      title: this.taskForm.value.title ?? '',
      description: this.taskForm.value.description ?? '',
      priority: this.taskForm.value.priority as 'High' | 'Medium' | 'Low',
      owner: `${selectedUser?.nuid} - ${selectedUser?.firstName} ${selectedUser?.lastName}`,
      dueDate: this.convertToDate(this.taskForm.value.dueDate),
      status: this.taskForm.value.status as 'Draft' | 'In Progress' | 'Completed',
    };
  
    const newReq: IEntity = {
      action: this.isEditing ? 'edit' : 'create',
      task: newTask,
      owner: selectedUser as IUser,
    };
  
    console.log(newTask);
  
    // Choose the correct service method based on isEditing
    const serviceCall = this.isEditing
      ? this.taskService.updateTask(newReq)
      : this.taskService.createTask(newReq);
  
    serviceCall.subscribe(
      (response) => {
        console.log(this.isEditing ? 'Task updated' : 'Task created successfully:', response);
        this.dialogRef.close({ success: true, task: newTask });
      },
      (error) => {
        console.error(this.isEditing ? 'Error updating task:' : 'Error creating task:', error);
      }
    );
  }
  
}
