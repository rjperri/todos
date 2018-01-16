import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { TODOS } from './mock-todos';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { Md5 } from 'ts-md5/dist/md5';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable()
export class TodoService {

    private todosUrl = 'api/todos'; // URL to we api

    constructor(private http: HttpClient) { }

    /** GET todos from server */
    getTodos(): Observable<Todo[]> {
        return this.http
            .get<Todo[]>(this.todosUrl)
            .pipe(
                tap(todos => this.log('fetching todos')),
                catchError(this.handleError('getTodos', []))
            );
    }

    /** POST: add a new todo to the server */
    addTodo(todo: Todo): Observable<Todo> {
        return this.http
        .post<Todo>(this.todosUrl, todo, httpOptions)
        .pipe(
            // tslint:disable-next-line:no-shadowed-variable
            tap((hero: Todo) => this.log(`added todo w/ id=${todo.id}`)),
            catchError(this.handleError<Todo>('addTodo'))
        );
    }

    updateTodo(todo: Todo): Observable<Todo> {
        const todos: Todo[] = this.getTodosFromStorage();
        const index = todos.findIndex(t => t.id === todo.id);

        if (index < 0) { return; }

        todos[index] = todo;

        localStorage.setItem('todos', JSON.stringify(todos));
        return of(todo);
    }

    deleteTodo(todo: Todo): Observable<Todo> {
        // debugger;
        // tslint:disable-next-line:no-var-keyword
        var todos: Todo[] = this.getTodosFromStorage();
        todos = todos.filter(t => t.id !== todo.id);
        localStorage.setItem('todos', JSON.stringify(todos));
        return of(null);
    }

    archiveAll(): Observable<Todo[]> {
        const todos: Todo[] = this.getTodosFromStorage();
        todos.map(t => t.archived = true);
        localStorage.setItem('todos', JSON.stringify(todos));
        return of(todos.filter(t => t.archived !== true));
    }

    private getTodosFromStorage(): Todo[] {
        // tslint:disable-next-line:no-var-keyword
        var todos: Todo[] = [];

        if (localStorage.getItem('todos') === null) {
            return todos;
        } else {
            todos = <Todo[]>JSON.parse(localStorage.getItem('todos'));
            return todos.filter(t => t.archived !== true);
        }
    }
   
    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {
            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead
            // TODO: better job of transforming error for user consumption
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log('TodoService: ' + message);
    }
}
