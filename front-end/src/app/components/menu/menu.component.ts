import { Component, inject , Injector} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';  

import { CreateComponent } from '../task/create/create.component';
import { ITask } from '../../interface/task.interface';


@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [MatListModule, MatIconModule, RouterModule,CommonModule,MatDatepickerModule,MatNativeDateModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
 
  

})
export class MenuComponent {
  readonly dialog = inject(MatDialog);


  collapseMenu:boolean = false;

  collapse():void{
    this.collapseMenu = !this.collapseMenu;
    console.log(this.collapseMenu);
  }

  openCreateTaskDialog(): void {
    this.dialog.open(CreateComponent, {
      width: '500px',
      data: {
        task: {} as ITask,
        isEditing: false
      }
    });
  }
}
