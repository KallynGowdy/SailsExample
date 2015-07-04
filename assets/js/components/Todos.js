if (typeof __decorate !== "function") __decorate = function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
if (typeof __metadata !== "function") __metadata = function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
if (typeof __param !== "function") __param = function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
/// <reference path="../typings/angular2/angular2.d.ts"/>
/// <reference path="../typings/socket.io-client/socket.io-client.d.ts"/>
var angular2_1 = require('angular2/angular2');
var di_1 = require('angular2/di');
var http_1 = require('angular2/http');
var Todos = (function () {
    function Todos(http) {
        var _this = this;
        this.http = http;
        io.socket.get('/todo/addtodo');
        this.http.get('/todo')
            .map(function (res) { return res.json(); })
            .subscribe(function (todos) { return _this.todos = todos.map(function (t) { return t.text; }); });
        io.socket.on('todo', function (obj) {
            if (obj.verb === 'created') {
                _this.todos.push(obj.data.text);
                _this.todos = _this.todos.slice(0);
                console.info("Added " + obj.data.text + ";" + _this.todos);
            }
        });
    }
    Todos.prototype.addTodo = function (todo) {
        this.todos.push(todo);
        io.socket.post('/todo/addTodo', { text: todo });
    };
    Todos.prototype.doneTyping = function ($event) {
        if ($event.which == 13) {
            this.addTodo($event.target.value);
            $event.target.value = null;
        }
    };
    Todos = __decorate([
        angular2_1.Component({
            selector: 'todos'
        }),
        angular2_1.View({
            template: "\n   <ul>\n    <li *ng-for=\"#todo of todos\">\n      {{ todo }}\n    </li>\n   </ul>\n   <input #todotext (keyup)=\"doneTyping($event)\">\n   <button (click)=\"addTodo(todotext.value)\">Add Todo</button>\n  ",
            directives: [angular2_1.NgFor, angular2_1.NgIf]
        }),
        __param(0, di_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [Object])
    ], Todos);
    return Todos;
})();
angular2_1.bootstrap(Todos, [http_1.httpInjectables]);
//# sourceMappingURL=Todos.js.map