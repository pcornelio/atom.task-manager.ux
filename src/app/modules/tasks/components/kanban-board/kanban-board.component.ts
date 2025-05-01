import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faPlus, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { TaskFormComponent } from '../task-form/task-form.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    CommonModule,
    CdkDrag,
    CdkDropList,
    FontAwesomeModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit {
  // Iconos
  faPlus = faPlus;
  faEdit = faEdit;
  faTrash = faTrash;

  tasks: Task[] = [];
  pendingTasks: Task[] = [];
  inProgressTasks: Task[] = [];
  completedTasks: Task[] = [];
  TaskStatus = TaskStatus;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
      this.updateTaskLists();
    });
  }

  updateTaskLists(): void {
    this.pendingTasks = this.tasks.filter(task => task.status === TaskStatus.PENDING);
    this.inProgressTasks = this.tasks.filter(task => task.status === TaskStatus.IN_PROGRESS);
    this.completedTasks = this.tasks.filter(task => task.status === TaskStatus.COMPLETED);
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      
      // Actualizar el estado de la tarea
      const task = event.container.data[event.currentIndex];
      let newStatus: TaskStatus;
      
      if (event.container.id === 'pendingList') {
        newStatus = TaskStatus.PENDING;
      } else if (event.container.id === 'inProgressList') {
        newStatus = TaskStatus.IN_PROGRESS;
      } else {
        newStatus = TaskStatus.COMPLETED;
      }
      
      this.taskService.updateTaskStatus(task.id, newStatus).subscribe(() => {
        this.loadTasks();
      });
    }
  }

  openTaskForm(task?: Task): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '500px',
      data: { task }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTasks();
      }
    });
  }

  deleteTask(id: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
    }
  }
} 