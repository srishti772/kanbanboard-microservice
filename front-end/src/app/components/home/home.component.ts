import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ListComponent } from '../task/list/list.component';
import { BoardComponent } from '../task/board/board.component';
import { MenuComponent } from '../menu/menu.component';
import { ChartsComponent } from '../task/charts/charts.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';  // Adjust the path if necessary
import { Observable } from 'rxjs';
import { IUser } from '../../interface/user.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIconModule,
    ListComponent,
    BoardComponent,
    MenuComponent,
    ChartsComponent,
    RouterModule,
    CommonModule,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],  // Corrected typo from "styleUrl" to "styleUrls"
})
export class HomeComponent implements OnInit {
  user$: Observable<IUser | null>;

  constructor(private authService: AuthService) {
    this.user$ = this.authService.user$;
    console.log(this.user$);
  }

  ngOnInit(): void {
    this.authService.user$.subscribe(user => {
      console.log('User from user$: ', user);
    });
  }
}
