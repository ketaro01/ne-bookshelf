import { Request, Response } from 'express';

let todoList = [
  {
    id: 1,
    text: '기상',
    complete: false,
  },
  {
    id: 2,
    text: '샤워하기',
    complete: false,
  },
  {
    id: 3,
    text: '밥먹기',
    complete: false,
  },
  {
    id: 4,
    text: '출근하기',
    complete: false,
  },
];

const getTodoList = (req: Request, res: Response) => {
  res.json(todoList);
};

const postTodoList = (req: Request, res: Response, u: string, b: Request) => {
  let realUrl = u;
  if (!realUrl || Object.prototype.toString.call(realUrl) !== '[object String]') {
    realUrl = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, ids, id, text, complete } = body;
  const data = { id, text, complete };

  switch (method) {
    case 'delete':
      todoList = todoList.filter((item) => ids.indexOf(item.id) === -1);
      break;
    case 'post':
      (() => {
        const newTodo = {
          ...data,
          id: todoList.length,
        };
        todoList.unshift(newTodo);
        return res.json(newTodo);
      })();
      return;

    case 'update':
      (() => {
        let newTodo = {};
        todoList = todoList.map((item) => {
          if (item.id === id) {
            newTodo = { ...item, ...data };
            return { ...item, ...data };
          }
          return item;
        });
        return res.json(newTodo);
      })();
      return;
    default:
      break;
  }

  const result = {
    list: todoList,
    pagination: {
      total: todoList.length,
    },
  };

  res.json(result);
};

export default {
  'GET /api/todo': getTodoList,
  'POST /api/todo': postTodoList,
};
