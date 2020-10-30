import { createSelector } from 'reselect';
import { TodoModelState } from '@/models/todo';

export const getTodoStatistics = createSelector(
  (state: TodoModelState) => state.todoList,
  (todoList) => ({
    total: todoList.length,
    complete: todoList.filter((item) => {
      console.log('filterd');
      return item.complete;
    }).length,
  }),
);
