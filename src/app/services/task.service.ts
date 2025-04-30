import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../modules/auth/services/auth.service';
import { Observable } from 'rxjs';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: {
    _seconds: number;
    _nanoseconds: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'https://api-rewxlpbppa-uc.a.run.app';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private get headers() {
    return this.authService.authHeaders;
  }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(`${this.apiUrl}/api/tasks`, { headers: this.headers });
  }

  createTask(task: Omit<Task, 'id' | 'createdAt'>): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/api/tasks`, task, { headers: this.headers });
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/api/tasks/${id}`, task, { headers: this.headers });
  }

  deleteTask(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/api/tasks/${id}`, { headers: this.headers });
  }
} 