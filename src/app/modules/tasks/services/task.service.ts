import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://api-rewxlpbppa-uc.a.run.app';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/api/tasks`, {
      headers: this.authService.authHeaders
    });
  }

  createTask(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/api/tasks`, task, {
      headers: this.authService.authHeaders
    });
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/api/tasks/${id}`, task, {
      headers: this.authService.authHeaders
    });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/tasks/${id}`, {
      headers: this.authService.authHeaders
    });
  }
} 