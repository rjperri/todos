import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';
    items = [{view: "one", value:1},{view: "two", value:2},{view: "three", value:3}];
}
