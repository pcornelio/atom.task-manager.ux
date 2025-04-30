import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../auth/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faTrash, faSave, faTimes, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  // Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;
  faSave = faSave;
  faTimes = faTimes;
  faSignOutAlt = faSignOutAlt;

  tasks: Task[] = [];
  newTask: Omit<Task, 'id' | 'createdAt'> = {
    title: '',
    description: '',
    completed: false,
    userId: ''
  };
  editingTask: Task | null = null;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  createTask(): void {
    if (this.newTask.title && this.newTask.description) {
      const taskToCreate = {
        ...this.newTask,
        userId: this.authService.token?.split('.')[0] || ''
      };
      
      this.taskService.createTask(taskToCreate).subscribe(() => {
        this.loadTasks();
        this.newTask = { title: '', description: '', completed: false, userId: '' };
      });
    }
  }

  startEdit(task: Task): void {
    this.editingTask = { ...task };
  }

  cancelEdit(): void {
    this.editingTask = null;
  }

  updateTask(): void {
    if (this.editingTask) {
      this.taskService.updateTask(this.editingTask.id, {
        title: this.editingTask.title,
        description: this.editingTask.description,
        completed: this.editingTask.completed
      }).subscribe(() => {
        this.loadTasks();
        this.editingTask = null;
      });
    }
  }

  updateTaskStatus(task: Task): void {
    this.taskService.updateTask(task.id, { completed: !task.completed })
      .subscribe(() => this.loadTasks());
  }

  deleteTask(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 