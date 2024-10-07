import { CreateTodo, UpdateTodo, ID } from "../types/todo";
import axiosInstance from "./api";

export const getTodos = () => {
  return axiosInstance({
    method: "GET",
    url: "/tasks",
  });
};

export const createTodo = (data: CreateTodo) => {
  return axiosInstance({
    method: "POST",
    url: "/tasks",
    data,
  });
};

export const updateTodo = (id: ID, data: UpdateTodo) => {
  return axiosInstance({
    method: "PUT",
    url: `/tasks/${id}`,
    data,
  });
};

export const deleteTodo = (id: ID) => {
  return axiosInstance({
    method: "DELETE",
    url: `/tasks/${id}`,
  });
};
