import * as uuid from 'uuid';

import { TodoItem } from '../../models/TodoItem';
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import { UpdateTodoRequest } from '../../requests/UpdateTodoRequest';
import { TodoRepository } from '../repository/todoRepository';

const todoRepo = new TodoRepository()

export async function getTodos(userId: string): Promise<TodoItem[]> {
  return todoRepo.getTodosForUser(userId);
}

export async function getTodo(userId: string, todoId: string): Promise<TodoItem> {
  return todoRepo.getTodo(userId, todoId);
}

export async function updateTodo(userId: string, id: string, payload: UpdateTodoRequest) : Promise<void>{
  return todoRepo.updateTodo(userId, id, payload);
}

export async function updateTodoAttachment(userId: string, id: string): Promise<void> {
  return todoRepo.updateTodoAttachment(userId, id);
}

export async function deleteTodo(userId: string, id: string): Promise<void> {
  return todoRepo.deleteTodo(userId, id);
}

export async function createTodo(
  createTodoRequest: CreateTodoRequest,
  userId: string
): Promise<TodoItem> {
  const id = uuid.v4();

  return await todoRepo.createTodo({
    id,
    userId,
    name: createTodoRequest.name,
    done: false,
    createdAt: new Date().toISOString(),
    dueDate: createTodoRequest.dueDate
  })
}

export async function todoExists(id: string): Promise<boolean> {
  return await todoRepo.todoExists(id);
}
