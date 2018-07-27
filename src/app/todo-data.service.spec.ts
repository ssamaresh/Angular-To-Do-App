import { TestBed, async, inject } from '@angular/core/testing';
import { Todo } from './todo';
import { TodoDataService } from './todo-data.service';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoDataService
      ]
    });
  });

  it('should be created', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  // Get Todos
  describe('#getAllTodos()', () => {
    it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: false});

      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  // Save Todos
  describe('#save(todo)', () => {
    it('should automatically assign an incrementing id', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});

      service.addTodo(todo1);
      service.addTodo(todo2);

      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));
  });

  // Delete Todo
  describe('#deleteTodoById(id)', () => {
    it('should remove a todo with a corresponding id', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);

      service.deleteTodo(1);
      expect(service.getAllTodos()).toEqual([todo2]);

      service.deleteTodo(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not delete if id is not found', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Hello 1', complete: false});
      const todo2 = new Todo({title: 'Hello 2', complete: true});

      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);

      service.deleteTodo(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  // Update Todo
  describe('#updateTodoById(id, values)', () => {
    it('should return a todo with corresponding id and updated data', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo);
      service.updateTodoById(1, {
        title: 'New Name'
      });
      const updateTodo = service.getTodoById(1);
      expect(updateTodo.title).toEqual('New Name');
    }));

    it('should return null if a todo is not found', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo);
      const updateTodo = service.updateTodoById(2, {
        title: 'new title'
      });
      // const updateTodo = service.getTodoById(2);
      expect(updateTodo).toEqual(null);
    }));
  });

  // Toggle Todo
  describe('#toggleTodoComplete(todo)', () => {
    it('should return the updated todo with inverse complete status', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Hello 1', complete: false});
      service.addTodo(todo);
      const toggledTodo = service.toggleTodoComplete(todo);
      expect(toggledTodo.complete).toEqual(true);
      service.toggleTodoComplete(todo);
      expect(toggledTodo.complete).toEqual(false);
    }));
  });


});


