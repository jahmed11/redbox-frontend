import { useState } from "react";
import { CheckOutlined, CloseOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { List, Switch, Popconfirm, Tooltip } from "antd";
import AppButton from "Components/Button";
import { TodoProps } from "types/todo";

const Todo = ({ todo, onTodoStatusChange, onEditClick, onDeleteClick }: TodoProps) => {
  const [updateTodoLoading, setUpdateTodoLoading] = useState(false);
  const [deleteTodoLoading, setDeleteTodoLoading] = useState(false);

  const { title, completed, id, description } = todo;
  const actionItems = () => {
    return [
      <Tooltip title={completed ? "Completed" : "Pending"}>
        <Switch
          size="small"
          loading={updateTodoLoading}
          onChange={(checked) => onTodoStatusChange(checked, id, setUpdateTodoLoading)}
          checkedChildren={<CheckOutlined />}
          unCheckedChildren={<CloseOutlined />}
          checked={completed}
        />
      </Tooltip>,
      <Tooltip title="Update">
        <AppButton
          size="small"
          onClick={() => onEditClick(todo)}
          shape="circle"
          icon={<EditOutlined />}
        />{" "}
      </Tooltip>,
      <Popconfirm
        title="Delete the todo"
        description="Are you sure to delete this todo?"
        onConfirm={() => onDeleteClick(todo.id, setDeleteTodoLoading)}
        okText="Yes"
        cancelText="No"
      >
        <Tooltip title="Delete">
          <AppButton
            size="small"
            loading={deleteTodoLoading}
            danger
            shape="circle"
            icon={<DeleteOutlined />}
          />
        </Tooltip>
      </Popconfirm>,
    ];
  };

  return (
    <List.Item key={id} actions={actionItems()}>
      <List.Item.Meta title={title} description={description} />
    </List.Item>
  );
};

export default Todo;
