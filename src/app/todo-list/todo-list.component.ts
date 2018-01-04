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
        this.getTodos();
    }

    getTodos() {
        this.todoService
            .getTodos()
            .subscribe(todos => {
                this.todos = todos;
            });
    }

    add(task: string) {
        const todo: Todo = {task: task, completed: false };
        this.todoService.addTodo(todo);
        this.todos.push(todo);
    }

}
