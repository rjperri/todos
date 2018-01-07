import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { TODOS } from './mock-todos';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class TodoService {

    constructor() { }

    getTodos(): Observable<Todo[]> {
        return of(this.getTodosFromStorage());
    }

    addTodo(todo: Todo): Observable<Todo> {
        const todos: Todo[] = this.getTodosFromStorage();
        const time = new Date();
        const hash = Md5.hashStr(time.valueOf().toString());
        todo.id = hash.toString();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        return of(todo);
    }

    updateTodo(todo: Todo): Observable<Todo> {
        const todos: Todo[] = this.getTodosFromStorage();
        const index = todos.findIndex(t => t.id === todo.id);

        if (index < 0) { return; }

        todos[index] = todo;

        localStorage.setItem('todos', JSON.stringify(todos));
        return of(todo);
    }

    private getTodosFromStorage(): Todo[] {
        const todos: Todo[] = [];

        if (localStorage.getItem('todos') === null) {
            return todos;
        } else {
            return <Todo[]>JSON.parse(localStorage.getItem('todos'));
        }
    }
}
