import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import {
    MatInputModule, MatButtonModule, MatSelectModule,
    MatIconModule, MatListModule, MatCardModule, MatCheckboxModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoService } from './todo.service';

@NgModule({
    declarations: [
        AppComponent,
        TodoListComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatListModule,
        MatCardModule,
        MatCheckboxModule,
        MatIconModule
    ],
    providers: [TodoService],
    bootstrap: [AppComponent]
})
export class AppModule { }
