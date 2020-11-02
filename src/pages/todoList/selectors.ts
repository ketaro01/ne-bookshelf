import { createSelector } from 'reselect';
import { TodoModelState } from '@/models/todo';

export const getTodoStatistics = createSelector(
  (state: TodoModelState) => state.todoList,
  (todoList) => {
    return {
      total: todoList.length,
      complete: todoList.filter((item) => {
        return item.complete;
      }).length,
    };
  },
);
