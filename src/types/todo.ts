import { Dispatch, SetStateAction } from "react";
import type { FormProps, FormInstance } from "antd";

export type ID = string;

export type UpdateKey = "title" | "completed" | "description";
export type UpdateValue = string | boolean;

export type Todo = {
  id: ID;
  title: string;
  completed: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateTodo = Omit<Todo, "id" | "createdAt" | "updatedAt">;

export interface TodoProps {
  todo: Todo;
  onTodoStatusChange: (
    checked: boolean,
    id: ID,
    setUpdateTodoLoading: Dispatch<SetStateAction<boolean>>
  ) => void;
  onEditClick: (item: Todo) => void;
  onDeleteClick: (id: ID, setDeleteTodoLoading: Dispatch<SetStateAction<boolean>>) => void;
}

export interface IAddTodoProps {
  openAddTodo: boolean;
  setOpenAddTodo: Dispatch<SetStateAction<boolean>>;
  todoItem: Todo | null;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export interface IListHeaderProps {
  onAddClick: () => void;
}

export type IFormValues = {
  title: string;
};

export type UpdateTodo = {
  title?: string;
  completed?: boolean;
};

export type TodoFieldType = {
  title: string;
  description?: string;
};

export type TodoOnFinish = FormProps<TodoFieldType>["onFinish"];

export type TodoOnFinishFailed = FormProps<TodoFieldType>["onFinishFailed"];

export interface IAddTodoForm {
  form: FormInstance;
  onFinishFailed: TodoOnFinishFailed;
  onFinish: TodoOnFinish;
}
