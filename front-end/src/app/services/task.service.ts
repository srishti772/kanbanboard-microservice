import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ITask } from '../interface/task.interface';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IEntity } from '../interface/entity.interface';

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


  updateTaskStatus(task: ITask): Observable<ITask> {
    const url = `${this.apiUrl}/${task._id}`;

    return this.http.put<ITask>(url, task).pipe(
      tap(() => this.loadTasks())  // Reload tasks after update
    );
  }

  updateTask(reqBody: IEntity): Observable<ITask> {
    const url = `${this.apiUrl}/${reqBody.task._id}`;

    return this.http.put<ITask>(url, reqBody).pipe(
      tap(() => this.loadTasks())  // Reload tasks after update
    );
  }

  deleteTask(task: ITask): Observable<HttpResponse<void>> {

  
    const url = `${this.apiUrl}/${task._id}`;
    return this.http.delete<void>(url, { observe: 'response' }).pipe(
      tap(() => this.loadTasks())  // Reload tasks after update
    );
      
    
   
  }

  createTask(reqBody: IEntity): Observable<ITask>{
    return this.http.post<ITask>(this.apiUrl, reqBody).pipe(
      tap(() => this.loadTasks())
    );
  }

  getTaskSummary(): Observable<any> {
    const summaryUrl = `${this.apiUrl}/summary`;
    return this.http.get<any>(summaryUrl);
  }

  getUserSummary(): Observable<any> {
    const summaryUrl = `${this.apiUrl}/usersummary`;
    return this.http.get<any>(summaryUrl);
  }
}


