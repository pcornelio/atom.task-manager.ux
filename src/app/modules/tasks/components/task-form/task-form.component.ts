import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Task, TaskStatus } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.task ? 'Editar Tarea' : 'Nueva Tarea' }}</h2>
    <mat-dialog-content>
      <form (ngSubmit)="onSubmit()">
        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Título</mat-label>
          <input matInput [(ngModel)]="task.title" name="title" required>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Descripción</mat-label>
          <textarea matInput [(ngModel)]="task.description" name="description" rows="3" required></textarea>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w-100">
          <mat-label>Estado</mat-label>
          <mat-select [(ngModel)]="task.status" name="status" required>
            <mat-option [value]="TaskStatus.PENDING">Pendiente</mat-option>
            <mat-option [value]="TaskStatus.IN_PROGRESS">En Progreso</mat-option>
            <mat-option [value]="TaskStatus.COMPLETED">Completada</mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-raised-button color="primary" (click)="onSubmit()">
        {{ data.task ? 'Guardar' : 'Crear' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [`
    mat-dialog-content {
      min-width: 400px;
      padding: 20px 0;
    }
    mat-form-field {
      margin-bottom: 16px;
    }
    .w-100 {
      width: 100%;
    }
  `]
})
export class TaskFormComponent {
  task: Task;
  TaskStatus = TaskStatus;

  constructor(
    public dialogRef: MatDialogRef<TaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { task?: Task },
    private taskService: TaskService
  ) {
    this.task = data.task ? { ...data.task } : {
      title: '',
      description: '',
      status: TaskStatus.PENDING,
      userId: '',
      id: '',
      createdAt: { _seconds: 0, _nanoseconds: 0 }
    };
  }

  onSubmit(): void {
    if (this.task.title && this.task.description) {
      if (this.data.task) {
        this.taskService.updateTask(this.data.task.id, this.task).subscribe(() => {
          this.dialogRef.close(this.task);
        });
      } else {
        this.taskService.createTask(this.task).subscribe(() => {
          this.dialogRef.close(this.task);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
} 