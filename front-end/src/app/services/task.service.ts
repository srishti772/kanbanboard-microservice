import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ITask } from '../interface/task.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'http://localhost:8060/api/tasks';
  private tasksSubject = new BehaviorSubject<ITask[]>([]);
  tasks$ = this.tasksSubject.asObservable();


  constructor(private http: HttpClient) {}


  loadTasks(): void {
    this.http.get<Array<ITask>>(this.apiUrl).subscribe((tasks) => {
      this.tasksSubject.next(tasks);
    });
  }


  updateTask(task: ITask): Observable<ITask> {
    const url = `${this.apiUrl}/${task._id}`;

    return this.http.put<ITask>(url, task).pipe(
      tap(() => this.loadTasks())  // Reload tasks after update
    );
  }

  deleteTask(task: ITask): Observable<HttpResponse<void>> {

  
    const url = `${this.apiUrl}/${task._id}`;
    return this.http.delete<void>(url, { observe: 'response' }).pipe(
      tap(() => this.loadTasks())  // Reload tasks after update
    );
      
    
   
  }

  createTask(task: ITask): Observable<ITask>{
    return this.http.post<ITask>(this.apiUrl, task).pipe(
      tap(() => this.loadTasks())
    );
  }
}
