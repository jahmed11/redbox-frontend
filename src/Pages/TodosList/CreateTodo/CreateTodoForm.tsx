import { Form, Input } from "antd";
import { IAddTodoForm } from "types/todo";
import styles from "./style.module.css";
const AddTodoForm = ({ form, onFinishFailed, onFinish }: IAddTodoForm) => {
  return (
    <Form
      layout="vertical"
      form={form}
      name="add-todo"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        rules={[{ required: true, message: "Todo title is required" }]}
        name="title"
        label="Title"
      >
        <Input />
      </Form.Item>
      <Form.Item name="description" label="Description">
        <Input.TextArea className={styles["text-area"]} />
      </Form.Item>
    </Form>
  );
};

export default AddTodoForm;
