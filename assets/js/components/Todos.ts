/// <reference path="../typings/angular2/angular2.d.ts"/>
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts"/>
import {Component, View, bootstrap, NgFor, NgIf} from 'angular2/angular2';
import { Inject } from 'angular2/di';
import { Http, httpInjectables } from 'angular2/http';
import { Socket } from 'socket.io-client';
import { Observable, Subject } from 'rx';

@Component({
  selector: 'todos'
})
@View({
  template: `
   <ul>
    <li *ng-for="#todo of todos">
      {{ todo }}
    </li>
   </ul>
   <input #todotext (keyup)="doneTyping($event)">
   <button (click)="addTodo(todotext.value)">Add Todo</button>
  `,
  directives: [NgFor, NgIf]
})
class Todos {
  todos: Array<string>;
  http: Http;
  constructor(@Inject(Http)http) {
    this.http = http;
    io.socket.get('/todo/addtodo');
    this.http.get('/todo')
      .map(res => res.json())
      .subscribe(todos => this.todos = todos.map(t => t.text));
    io.socket.on('todo', obj => {
      if (obj.verb === 'created') {
        this.todos.push(obj.data.text);
        this.todos = this.todos.slice(0);
        console.info("Added " + obj.data.text + ";" + this.todos);
      }
    });
  }

  addTodo(todo:string) {
    this.todos.push(todo);
    io.socket.post('/todo/addTodo', {text: todo});
  }

  doneTyping($event) {
    if ($event.which == 13) {
      this.addTodo($event.target.value);
      $event.target.value = null;
    }
  }
}

bootstrap(Todos, [httpInjectables]);
