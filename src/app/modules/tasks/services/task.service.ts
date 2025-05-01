import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task, TaskStatus } from '../models/task.model';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = `${environment.apiUrl}/tasks`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}`, {
      headers: this.authService.authHeaders
    });
  }

  createTask(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}`, task, {
      headers: this.authService.authHeaders
    });
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${id}`, task, {
      headers: this.authService.authHeaders
    });
  }

  updateTaskStatus(id: string, status: TaskStatus): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}/status`, { status });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`, {
      headers: this.authService.authHeaders
    });
  }
} 