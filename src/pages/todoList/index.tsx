import React, { Component } from 'react';
import styled from 'styled-components';
import { notification, Checkbox, List, Button } from 'antd';
import { CloseOutlined } from '@ant-design/icons';

interface ITodoListProps {}

interface ITodoListState {
  todos: object[];
}

const Box = styled.div<{ bgColor: string }>`
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 20px;
  background-color: ${(props) => props.bgColor || '#eee'};
`;

const HeaderMenu = styled.div`
  width: 100%;
  display: flex;
`;

const MyButton = styled.button`
  border: none;
  border-radius: 8px;
  width: 100px;
  height: 28px;
  background-color: black;
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: 0;
  margin-left: 10px;
  opacity: 1;
  transition: opacity 0.25s;
  cursor: pointer;
  &:hover,
  :active {
    opacity: 0.6;
  }
`;

const InputText = styled.input`
  outline: 0;
  border: none;
  border-radius: 8px;
  width: 160px;
  box-shadow: 2px 2px 4px 2px rgb(0, 0, 0, 0.2);
  padding: 0 10px;
  box-sizing: border-box;
`;
const TodoListBox = styled.div`
  width: 400px;
  margin-top: 60px;
`;
const TodoItem = styled.div`
  display: flex;
  width: 400px;
  > div:nth-child(1) {
    flex: 2;
  }
  > div:nth-child(2) {
    flex: 1;
  }
  > div:nth-child(3) {
    flex: 0.25;
  }
`;

class TodoList extends Component<ITodoListProps, ITodoListState> {
  constructor(props) {
    super(props);

    this.state = {
      todos: [{ text: '기본', complete: true }],
      text: '',
    };

    this.handleTodoAdd = this.handleTodoAdd.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeTodo = this.handleChangeTodo.bind(this);
  }

  private handleTodoAdd() {
    if (!this.state.text) {
      notification.error({
        description: '입력된 내용이 없음.',
        message: '저장 불가',
      });
      return;
    }
    const nextState = {
      todos: [...this.state.todos, { text: this.state.text, complete: false }],
      text: '',
    };
    this.setState(nextState);
  }

  private handleChangeValue(e: InputEvent) {
    this.setState({
      text: e.target.value,
    });
  }

  private handleChangeTodo(e: inputEvent, todoIndex: number) {
    const copyTodos = this.state.todos.slice();
    const nextTodos = copyTodos.map((item, i) => {
      return todoIndex === i ? { ...item, complete: e.target.checked } : item;
    });
    this.setState({ todos: nextTodos });
  }

  private handleRemoveTodo(todoIndex: number) {
    const copyTodos = this.state.todos.slice();
    const nextTodos = copyTodos.filter((_, i) => i !== todoIndex);
    this.setState({ todos: nextTodos });
  }

  render() {
    return (
      <Box>
        <HeaderMenu>
          <InputText type="text" value={this.state.text} onChange={this.handleChangeValue} />
          <MyButton onClick={this.handleTodoAdd}>add</MyButton>
        </HeaderMenu>
        <TodoListBox>
          <List
            size="small"
            header={<div>TODO LIST</div>}
            bordered
            dataSource={this.state.todos}
            renderItem={(item, i) => (
              <List.Item>
                <TodoItem>
                  <div>{item.text}</div>
                  <div>
                    <Checkbox
                      checked={!!item.complete}
                      onChange={(e) => this.handleChangeTodo(e, i)}
                    >
                      {item.complete ? '완료' : '미완료'}
                    </Checkbox>
                  </div>
                  <div>
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      size="small"
                      onClick={() => this.handleRemoveTodo(i)}
                    />
                  </div>
                </TodoItem>
              </List.Item>
            )}
          />
        </TodoListBox>
      </Box>
    );
  }
}

export default TodoList;
