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
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { IUser } from '../../../interface/user.interface';

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
  readonly data = inject<ITask>(MAT_DIALOG_DATA);

  readonly title = new FormControl('', [
    Validators.required,
    Validators.maxLength(10),
    Validators.minLength(5),
  ]);

  readonly description = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  readonly priority = new FormControl('', [
    Validators.required,
  ]);

  readonly owner = new FormControl('', [
    Validators.required,
  ]);

  readonly dueDate = new FormControl('',[
    Validators.required,
  ]);

  readonly status = new FormControl('Draft', [
    Validators.required,
  ]);

  taskForm = new FormGroup({
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
    if (this.taskForm.valid) {
      const selectedNuid = this.taskForm.value.owner;
      const selectedUser = this.users.find(user => user.nuid === selectedNuid);

      // Map form values to ITask
      const newTask: ITask = {
        title: this.taskForm.value.title ?? '',
        description: this.taskForm.value.description ?? '', // Use empty string if undefined
        priority: this.taskForm.value.priority as 'High' | 'Medium' | 'Low',
        owner: `${selectedUser?.nuid} - ${selectedUser?.firstName} ${selectedUser?.lastName}` ,       
        dueDate: this.convertToDate(this.taskForm.value.dueDate),
        status:this.taskForm.value.status as 'Draft' | 'In Progress' | 'Completed',

      
      };
      console.log(newTask);

      this.taskService.createTask(newTask).subscribe((res) => {
        console.log('Task created successfully:', res);
      });
    } else {
      console.log('Form is invalid');
    }
  }
}
