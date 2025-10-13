import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
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

