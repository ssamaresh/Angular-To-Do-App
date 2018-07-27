import { Injectable } from '@angular/core';
import { Todo } from './todo';

@Injectable()
export class TodoDataService {

  lastId: number = 0;
  todos: Todo[] = [];

  constructor() { }

  // ADD Todo - POST Method
  addTodo(todo: Todo): TodoDataService {
    if (!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  // DELETE Todo - DELETE Method
  deleteTodo(id: number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  // UPDATE Todo - PUT Method
  updateTodoById(id: number, values: Object = {}): Todo {
    const todo = this.getTodoById(id);
    if (!todo) {
      return null;
    }
    Object.assign(todo, values);
    return todo;
  }

  // GET Todos - GET Method
  getAllTodos(): Todo[] {
    return this.todos;
  }

  // GET Todo = GET Method
  getTodoById(id: number): Todo {
    return this.todos.filter(todo => todo.id === id).pop();
  }

  // TOGGLE TODO
  toggleTodoComplete(todo: Todo) {
    const updatedTodo = this.updateTodoById(todo.id, {complete: !todo.complete});
    return updatedTodo;
  }

}
