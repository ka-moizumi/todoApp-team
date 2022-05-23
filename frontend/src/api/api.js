import axios from "axios";

export const getTodos = async () => {
  return await axios.get(`/getTodos`);
};

export const addTodo = async (title, content) => {
  await axios.post(`/addTodo`, {
    title: title,
    content: content,
    user_id: "茂泉",
  });
};

export const deleteTodo = async (id) => {
  await axios.post(`/deleteTodo`, { id }).then(() => {});
};

export const clearTodos = async () => {
  await axios.post(`/clearTodos`).then(() => {
    getTodos();
  });
};

export const editTodo = async (title, content, id) => {
  await axios.post(`/editTodo`, { title, content, id }).then(() => {
    console.log({ title, content, id });
  });
};
