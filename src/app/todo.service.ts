import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { TODOS } from './mock-todos';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TodoService {

    constructor() { }

    getTodos(): Observable<Todo[]> {
        return of(this.getTodosFromStorage());
    }

    addTodo(todo: Todo) {
        const todos: Todo[] = this.getTodosFromStorage();
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    private getTodosFromStorage(): Todo[] {
        var todos: Todo[] = [];

        if (localStorage.getItem('todos') === null) {
            return todos;
        } else {
            return <Todo[]>JSON.parse(localStorage.getItem('todos'));
        }
    } 
}
