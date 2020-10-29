import request from '@/utils/request';
import { TodoListItem, TodoListParams } from './data';

export async function getTodoList(params?: TodoListParams) {
  return request('/api/todo', {
    params,
  });
}

export async function removeTodo(params: { ids: number[] }) {
  return request('/api/todo', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addTodo(params: TodoListItem) {
  return request('/api/todo', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateTodo(params: TodoListParams) {
  return request('/api/todo', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
