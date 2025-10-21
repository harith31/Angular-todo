import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = 'https://dummyjson.com/todos';
  private tasks: any[] = []; // local in-memory list

  constructor(private http: HttpClient) {}

  // ✅ Get initial tasks (use DummyJSON, then store locally)
  getTasks(): Observable<any[]> {
    if (this.tasks.length > 0) return of(this.tasks);
    return this.http.get<any>(this.apiUrl).pipe(
      map(res => {
        this.tasks = res.todos || [];
        return this.tasks;
      }),
      catchError(() => of(this.tasks))
    );
  }

  // ✅ Add new task (pretend-save locally)
  addTask(todo: string): Observable<any> {
    const newTask = {
      id: Date.now(), // generate fake ID
      todo,
      completed: false,
      userId: 1
    };
    // simulate API call
    return this.http.post(`${this.apiUrl}/add`, newTask)
    .pipe(
      map(() => {
        this.tasks.push(newTask); // add locally
        return newTask;
        
      }),
      catchError(() => {
        this.tasks.push(newTask); // even if API fails
        return of(newTask);
      })
    );
  }

  // ✅ Mark task as done (pretend update)
  updateTask(id: number): Observable<any> {
    const found = this.tasks.find(t => t.id === id);
    if (found) found.completed = true;

    return this.http.put(`${this.apiUrl}/${id}`, { completed: true }).pipe(
      map(() => found),
      catchError(() => of(found))
    );
  }

  // ✅ Delete task (pretend delete)
  deleteTask(id: number): Observable<any> {
    this.tasks = this.tasks.filter(t => t.id !== id);

    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      map(() => ({ success: true })),
      catchError(() => of({ success: true }))
    );
  }
}
