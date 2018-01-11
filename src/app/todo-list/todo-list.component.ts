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
        task = task.trim();
        if (!task) { return; }
        this.todoService
            .addTodo({ task: task, completed: false } as Todo)
            .subscribe(todo => {
                this.todos.push(todo);
            });
    }

    updateTaskStatus(todo: Todo) {
        this.todoService
            .updateTodo(todo)
            .subscribe(result => {
                todo = result;
            });
    }

    deleteTask(todo: Todo) {
        this.todos = this.todos.filter(t => t.id !== todo.id);
        this.todoService
            .deleteTodo(todo)
            .subscribe();
    }

    archiveList() {
        this.todoService
            .archiveAll()
            .subscribe(result => {
                this.todos = result;
            });
    }

}

