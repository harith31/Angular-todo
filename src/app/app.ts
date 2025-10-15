import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Angular Material Modules
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule, MatInputModule, 
            MatButtonModule, MatIconModule, MatListModule,
            MatCardModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})

export class AppComponent {
  newTask: string = '';
  tasks: string[] = [];
  finishedTasks: string[] = [];

  addTask() {
    if (this.newTask.trim() !== '') {
      this.tasks.push(this.newTask.trim());
      this.newTask = '';
    }
  }
  finishTask(index: number) {
    const finished = this.tasks.splice(index, 1)[0];
    this.finishedTasks.push(finished);
}

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}

