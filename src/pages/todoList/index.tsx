import React, { Component } from 'react';

interface ITodoListProps {}

interface ITodoListState {}

class TodoList extends Component<ITodoListProps, ITodoListState> {
  state = {};

  render() {
    return <div>Hello TodoList</div>;
  }
}

export default TodoList;
