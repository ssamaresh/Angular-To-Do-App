import { Todo } from './todo';

describe('Todo', () => {
  it('should create an instance', () => {
    expect(new Todo()).toBeTruthy();
  });

  it('should accept values in the constructor', () => {
    const todo = new Todo({
      title: 'Hello',
      complete: false
    });
    expect(todo.title).toEqual('Hello');
    expect(todo.complete).toEqual(false);
  });
});
