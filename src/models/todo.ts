import { Effect, Reducer } from 'umi';
import { TodoListItem } from '@/pages/todoList/data';
import { getTodoList, addTodo, removeTodo, updateTodo } from '@/pages/todoList/service';

export interface TodoModelState {
  todoList: TodoListItem[];
  currentTodo?: object | null;
}

export interface TodoModelType {
  namespace: 'todo';
  state: TodoModelState;
  effects: {
    fetchTodoList: [Effect, object];
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
    currentTodo: null,
  },

  effects: {
    fetchTodoList: [
      function* (_, { call, put }) {
        const response = yield call(getTodoList);
        yield put({
          type: 'saveTodoList',
          payload: response,
        });
      },
      {
        type: 'takeLatest',
      },
    ],
    *fetchAddTodo({ payload }, { call, put }) {
      yield call(addTodo, payload);
      yield put({
        type: 'fetchTodoList',
      });
    },
    *fetchRemoveTodo({ payload }, { call, put }) {
      yield call(removeTodo, { ids: payload });
      yield put({
        type: 'fetchTodoList',
      });
    },
    *fetchUpdateTodo({ payload }, { call, put }) {
      const response = yield call(updateTodo, payload);
      yield put({
        type: 'updateTodo',
        payload: response,
      });
    },
  },

  reducers: {
    saveTodoList(state = { todoList: [] }, action) {
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
