import { useState, useEffect } from "react";
import { Modal, Form, message } from "antd";
import { IAddTodoProps, TodoOnFinish, TodoFieldType, TodoOnFinishFailed } from "types/todo";

import { createTodo, updateTodo } from "api/todoServices";
import AddTodoForm from "./CreateTodoForm";
import { todoActions } from "utils/message";

/**
 * AddTodo component: Handles both adding a new todo item and updating an existing one.
 * This component is rendered as a modal with a form for input.
 */
const AddTodo = ({ openAddTodo, setOpenAddTodo, todoItem, setTodos }: IAddTodoProps) => {
  const isUpdate = Boolean(todoItem?.id);

  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (isUpdate && todoItem) {
      form.setFieldsValue({
        title: todoItem.title,
        description: todoItem.description,
      });
    }
  }, [todoItem, form, isUpdate]);

  /**
   * onFinish: Handles the form submission logic.
   * - If updating, calls the updateTodo API and updates the todo in the list.
   * - If creating, calls the createTodo API and adds the new todo to the list.
   */
  const onFinish: TodoOnFinish = async (values) => {
    let apiService = null;

    if (isUpdate && todoItem) {
      apiService = (formValue: TodoFieldType) => updateTodo(todoItem.id, formValue);
    } else {
      apiService = (formValue: TodoFieldType) => createTodo({ ...formValue, completed: false });
    }

    setIsLoading(true);
    try {
      const response = await apiService(values);
      let messageStr = null;

      if (isUpdate && todoItem) {
        setTodos((prev) =>
          prev.map((todo) => {
            if (todo.id === todoItem.id) {
              return response.data;
            }

            return todo;
          })
        );
        messageStr = todoActions.updateTitle;
      } else {
        setTodos((prev) => [response.data, ...prev]);
        messageStr = todoActions.createTodo;
      }
      message.success(messageStr);
      onCancel();
    } catch (err) {
      console.log(err);
      message.error("Operational Failed. Please try again");
    } finally {
      setIsLoading(false);
    }
  };

  const onFinishFailed: TodoOnFinishFailed = (error) => {
    console.log(error);
  };

  const onCancel = () => {
    setOpenAddTodo(false);
  };

  const onOk = () => {
    form.submit();
  };
  return (
    <Modal
      title={isUpdate ? "Update Todo" : "Add Todo"}
      okText={isUpdate ? "Update" : "Create"}
      confirmLoading={isLoading}
      open={openAddTodo}
      onOk={onOk}
      onCancel={onCancel}
    >
      <AddTodoForm form={form} onFinish={onFinish} onFinishFailed={onFinishFailed} />
    </Modal>
  );
};

export default AddTodo;
