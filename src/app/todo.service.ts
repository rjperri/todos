import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { TODOS } from './mock-todos';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TodoService {

    constructor() { }

    getTodos(): Observable<Todo[]> {
        return of(<Todo[]>JSON.parse(localStorage.getItem('Todos')));
    }

    addTodo(todo: Todo) {
        const todos: Todo[] = <Todo[]>JSON.parse(localStorage.getItem('Todos'));
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }

}
