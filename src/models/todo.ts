import { Effect, Reducer } from 'umi';
import { TodoListItem } from '@/pages/todoList/data';
import { getTodoList, addTodo, removeTodo, updateTodo } from '@/pages/todoList/service';

export interface TodoModelState {
  todoList: TodoListItem[];
}

export interface TodoModelType {
  namespace: 'todo';
  state: TodoModelState;
  effects: {
    fetchTodoList: Effect;
    fetchAddTodo: Effect;
    fetchRemoveTodo: Effect;
    fetchUpdateTodo: Effect;
  };
  reducers: {
    saveTodoList: Reducer<TodoModelState>;
    updateTodo: Reducer<TodoModelState>;
  };
}

const TodoModel: TodoModelType = {
  namespace: 'todo',

  state: {
    todoList: [],
  },

  effects: {
    *fetchTodoList(_, { call, put }) {
      const response = yield call(getTodoList);
      yield put({
        type: 'saveTodoList',
        payload: response,
      });
    },
    *fetchAddTodo({ payload }, { call, put }) {
      const response = yield call(addTodo, payload);
      yield put({
        type: 'saveTodoList',
        payload: response,
      });
    },
    *fetchRemoveTodo({ payload }, { call }) {
      yield call(removeTodo, payload);
      yield call(this.fetchTodoList);
    },
    *fetchUpdateTodo({ payload }, { call, put }) {
      const response = yield call(updateTodo, payload);
      yield put({
        type: 'saveTodoList',
        payload: response,
      });
    },
  },

  reducers: {
    saveTodoList(state, action) {
      return {
        ...state,
        todoList: action.payload || [],
      };
    },
    updateTodo(state = { todoList: [] }, action) {
      return {
        ...state,
        todoList: state.todoList.map((item) => {
          return item.id === action.payload.id ? action.payload : item;
        }),
      };
    },
  },
};

export default TodoModel;
