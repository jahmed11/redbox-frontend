import { List, message } from "antd";
import { useState, useEffect, useRef, Dispatch, SetStateAction } from "react";
import Todo from "./Todo";
import ListHeader from "./ListHeader/ListHeader";
import AddTodo from "./CreateTodo";
import { getTodos, updateTodo, deleteTodo } from "api/todoServices";
import { Todo as ITodo, Todo as TodoType, ID, UpdateKey, UpdateValue } from "types/todo";
import { todoActions } from "utils/message";

import styles from "./todoList.module.css";

/**
 * TodosList component: Manages and displays a list of todo items.
 * Allows for adding, updating, and deleting todos, as well as toggling their completion status.
 */
const TodosList = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [openAddTodo, setOpenAddTodo] = useState<boolean>(false);
  const [todoLoading, setTodoLoading] = useState(false);

  const selectedTodoRef = useRef<ITodo | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setTodoLoading(true);
        const response = await getTodos();
        setTodos(response.data);
      } catch (err) {
        console.log("err", err);
      } finally {
        setTodoLoading(false);
      }
    })();
  }, []);

  /**
   * filterTodoById: Removes a todo from the list based on its ID.
   */
  const filterTodoById = (id: ID) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  /**
   * updateById: Updates a specific field of a todo item based on its ID.
   */
  const updateById = (id: ID, key: UpdateKey, value: UpdateValue) => {
    setTodos((prev) =>
      prev.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            [key]: value,
          };
        }

        return todo;
      })
    );
  };

  /**
   * onTodoStatusChange: Handles the toggling of a todo's completion status.
   */
  const onTodoStatusChange = async (
    checked: boolean,
    id: ID,
    setUpdateTodoLoading: Dispatch<SetStateAction<boolean>>
  ) => {
    try {
      setUpdateTodoLoading(true);
      await updateTodo(id, { completed: checked });
      updateById(id, "completed", checked);
      message.success(todoActions.updateStatus);
    } catch (err) {
      console.log(err);
      message.error("Operational Failed. Please try again");
    } finally {
      setUpdateTodoLoading(false);
    }
  };

  /**
   * onAddClick: Opens the AddTodo modal for creating or editing a todo.
   */
  const onAddClick = (todo?: ITodo) => {
    if (todo) {
      selectedTodoRef.current = todo;
    }
    setOpenAddTodo(true);
  };

  /**
   * onDeleteClick: Deletes a todo based on its ID.
   */
  const onDeleteClick = async (id: ID, setDeleteTodoLoading: Dispatch<SetStateAction<boolean>>) => {
    try {
      setDeleteTodoLoading(true);
      await deleteTodo(id);
      filterTodoById(id);
      message.success(todoActions.deleteTodo);
    } catch (err) {
      console.log("err", err);
      message.error("Operational Failed. Please try again");
    } finally {
      setDeleteTodoLoading(false);
    }
  };

  const addTodoProps = {
    openAddTodo,
    setOpenAddTodo,
    todoItem: selectedTodoRef.current,
    setTodos,
  };

  const todoProps = {
    onDeleteClick,
    onEditClick: onAddClick,
    onTodoStatusChange,
  };

  return (
    <>
      {openAddTodo && <AddTodo {...addTodoProps} />}
      <div className={styles["todoList-container"]}>
        <List
          rowKey="id"
          loading={todoLoading}
          header={<ListHeader onAddClick={onAddClick} />}
          dataSource={todos}
          renderItem={(todo) => <Todo todo={todo} {...todoProps} />}
        />
      </div>
    </>
  );
};

export default TodosList;
