import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'umi';
import { notification, Checkbox, List, Button } from 'antd';
import { ConnectState } from '@/models/connect';
import { TodoModelState } from '@/models/todo';
import { CloseOutlined } from '@ant-design/icons';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { TodoListItem } from '@/pages/todoList/data';
import { Dispatch } from 'dva';

interface ITodoListProps extends TodoModelState {
  fetchTodoList(): void;
  fetchAddTodo(todoItem: TodoListItem): void;
  fetchUpdateTodo(todoItem: TodoListItem): void;
  fetchRemoveTodo(ids: number[]): void;
}

interface ITodoListState {
  text: string;
}

const Box = styled.div<{ bgColor?: string }>`
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

const TodoHeader = styled.div`
  > div {
    display: flex;
    > div {
      margin-right: 10px;
    }
  }
`;

class TodoList extends Component<ITodoListProps, ITodoListState> {
  constructor(props: ITodoListProps) {
    super(props);

    this.state = {
      text: '',
    };

    this.handleAddTodo = this.handleAddTodo.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);
    this.handleChangeTodo = this.handleChangeTodo.bind(this);
  }

  componentDidMount() {
    this.props.fetchTodoList();
  }

  private async handleAddTodo() {
    if (!this.state.text) {
      notification.error({
        description: '입력된 내용이 없음.',
        message: '저장 불가',
      });
      return;
    }
    const { fetchAddTodo } = this.props;
    const addTodo = { text: this.state.text, complete: false };
    await fetchAddTodo(addTodo);

    this.setState({ text: '' });
  }

  private handleChangeValue(e: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      text: e.target.value,
    });
  }

  private handleChangeTodo(e: CheckboxChangeEvent, item: TodoListItem) {
    const nextItem = { ...item };
    nextItem.complete = e.target.checked;
    this.props.fetchUpdateTodo(nextItem);
  }

  private handleRemoveTodo(item: TodoListItem) {
    this.props.fetchRemoveTodo([item.id!]);
  }

  render() {
    const todoHeader = () => {
      if (!this.props.todoStatistics) return null;

      const { total, complete } = this.props.todoStatistics;

      return (
        <TodoHeader>
          <h3>TODO LIST</h3>
          <div>
            <div>전체: {total}개</div>
            <div>완료: {complete}개</div>
            <div>미완료: {total - complete}개</div>
          </div>
        </TodoHeader>
      );
    };
    return (
      <Box>
        <HeaderMenu>
          <InputText type="text" value={this.state.text} onChange={this.handleChangeValue} />
          <MyButton onClick={this.handleAddTodo}>add</MyButton>
        </HeaderMenu>
        <TodoListBox>
          <List
            size="small"
            header={todoHeader()}
            bordered
            dataSource={this.props.todoList}
            renderItem={(item) => (
              <List.Item>
                <TodoItem>
                  <div>{item.text}</div>
                  <div>
                    <Checkbox
                      checked={!!item.complete}
                      onChange={(e) => this.handleChangeTodo(e, item)}
                    >
                      {item.complete ? '완료' : '미완료'}
                    </Checkbox>
                  </div>
                  <div>
                    <Button
                      type="text"
                      icon={<CloseOutlined />}
                      size="small"
                      onClick={() => this.handleRemoveTodo(item)}
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

const mapStateToProps = ({ todo }: ConnectState) => ({
  ...todo,
  todoStatistics: {
    total: todo.todoList.length,
    complete: todo.todoList.filter((item) => item.complete).length,
  },
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchTodoList: () => dispatch({ type: 'todo/fetchTodoList' }),
    fetchAddTodo: (item: TodoListItem) => dispatch({ type: 'todo/fetchAddTodo', payload: item }),
    fetchUpdateTodo: (item: TodoListItem) =>
      dispatch({ type: 'todo/fetchUpdateTodo', payload: item }),
    fetchRemoveTodo: (id: number[]) => dispatch({ type: 'todo/fetchRemoveTodo', payload: id }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
