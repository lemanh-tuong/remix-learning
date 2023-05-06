import { v4 } from 'uuid';
import { delay } from './utils/delay';
import type { Todo } from '~/models/Todo';

class TodoService {
  todos: Todo[] = [
    { id: v4(), title: 'Todo 1', description: 'Todo 1' },
    { id: v4(), title: 'Todo 2', description: 'Todo 2' },
  ];
  getAll = async (): Promise<Todo[]> => {
    await delay(2000);
    return this.todos;
  };

  create = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    await delay(1000);
    const newTodo: Todo = { ...todo, id: v4() };
    this.todos = this.todos.concat(newTodo);
    return newTodo;
  };

  update = async (id: Todo['id'], todo: Omit<Todo, 'id'>): Promise<Todo> => {
    await delay(1000);
    const newTodo: Todo = { ...todo, id };
    this.todos = this.todos.map(item => {
      if (item.id === id) {
        return {
          ...item,
          ...todo,
        };
      }
      return item;
    });
    return newTodo;
  };

  delete = async (id: Todo['id']): Promise<true> => {
    await delay(1000);
    this.todos = this.todos.filter(item => item.id !== id);
    return true;
  };
}

export const todoService = new TodoService();
