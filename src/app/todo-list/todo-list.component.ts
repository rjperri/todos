import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
// import { TODOS } from '../mock-todos';
import { TodoService } from '../todo.service';

@Component({
    selector: 'app-todo-list',
    templateUrl: './todo-list.component.html',
    styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

    todos: Todo[];
    id: number;
    thing: string;

    constructor(private todoService: TodoService) { }

    ngOnInit() {
        debugger;
        this.getTodos();
    }

    getTodos() {
        this.todoService
            .getTodos()
            .subscribe(todos => {
                this.todos = todos;
                this.id = this.todos.length + 2;
            });
    }

    // addThing(thing: string) {
    //     this.todoService.addThing(thing);
    // }

    add(task: string) {
        const todo: Todo = {id: this.id, task: task, completed: false };
        this.todoService.addTodo(todo);
        this.todos.push(todo);
        this.id++;
    }

}
