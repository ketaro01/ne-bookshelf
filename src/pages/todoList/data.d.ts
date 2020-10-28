export interface TodoListItem {
  id: number;
  text?: string;
  complete: boolean;
}

export interface TodoListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TodoListData {
  list: TodoListItem[];
  pagination: Partial<TodoListPagination>;
}

export interface TodoListParams {
  id?: number;
  text?: string;
  complete: boolean;
  pageSize?: number;
  currentPage?: number;
  filter?: { [key: string]: any };
  sorter?: { [key: string]: any };
}
