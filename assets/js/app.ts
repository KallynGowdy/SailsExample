/// <reference path="typings/angular2/angular2.d.ts"/>
import {Component, View, bootstrap} from 'angular2/angular2';
import { Start } from './components/Todos';

// Annotation section
@Component({
  selector: 'sails-app'
})
@View({
  template: `


  `
})
class App {
  name: string;

  constructor() {
    this.name = 'Alice';
  }
}

bootstrap(App);
