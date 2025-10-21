import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { TodoService } from './todo';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  newTask: string = '';
  tasks: any[] = [];
  finishedTasks: any[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.todoService.getTasks().subscribe((data) => {
      this.tasks = data; 
      this.finishedTasks = this.tasks.filter(t => t.completed);
      this.tasks = this.tasks.filter(t => !t.completed);
    });
  }

  addTask() {
    if (this.newTask.trim() !== '') {
      this.todoService.addTask(this.newTask.trim()).subscribe((data) => {
        this.tasks.push(data);
        this.newTask = '';
        console.log('Task added:', data);
      });
    }
  }

  finishTasks(id: number) {
    this.todoService.updateTask(id).subscribe((updatedTask) => {
      if (updatedTask) {
        this.finishedTasks.push(updatedTask);
        this.tasks = this.tasks.filter(t => t.id !== id);
        console.log('Task marked as finished:', updatedTask);
      }
    });
  }

  deleteTask(id: number) {
    this.todoService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
      this.finishedTasks = this.finishedTasks.filter(t => t.id !== id);
      console.log('Task deleted:', id);
    });
  }

deleteFinishedTask(id: number) {
  this.todoService.deleteTask(id).subscribe(() => {
    this.finishedTasks = this.finishedTasks.filter(t => t.id !== id);
    console.log('Finished task deleted:', id);
  });
}

}
