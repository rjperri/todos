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

    constructor(private todoService: TodoService) { }

    ngOnInit() {
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

    add(task: string) {
        this.todos.push({id: this.id, task: task, completed: false });
        this.id++;
    }

}
