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
        return this.http
            .put(this.todosUrl, todo, httpOptions)
            .pipe(
                tap(_ => this.log(`updated todo id=${todo.id}`)),
                catchError(this.handleError<any>('updateTodo'))
            )
    }

    deleteTodo(todo: Todo): Observable<Todo> {
        const id = typeof todo === 'number' ? todo : todo.id;
        const url = `${this.todosUrl}/${id}`;

        return this.http
            .delete<Todo>(url, httpOptions)
            .pipe(
                tap(_ => this.log(`deleted todo id=${id}`)),
                catchError(this.handleError<Todo>('deleteTodo'))
            );
    }

    archiveAll(): Observable<Todo[]> {
        //This will need to be changed to be on backend
       return this.http
        .get<Todo[]>(this.todosUrl)
        .pipe(
            tap(todos => this.log('fetching todos')),
            catchError(this.handleError('getTodos', []))
        );
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
