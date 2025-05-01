import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { TaskService } from './services/task.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    DragDropModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  providers: [
    TaskService
  ]
})
export class TasksModule { } 