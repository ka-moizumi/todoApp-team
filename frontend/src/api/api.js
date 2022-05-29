import axios from "axios";

export const getTodos = async () => {
  return await axios.get(`/getTodos`);
};

export const addTodo = async (title, content, priority, deadline) => {
  await axios.post(`/addTodo`, {
    title: title,
    content: content,
    priority: priority,
    user_id: "茂泉",
    deadline: deadline,
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

export const editTodo = async (title, content, priority, deadline, id) => {
  await axios
    .post(`/editTodo`, { title, content, priority, deadline, id })
    .then(() => {
      console.log({ title, content, priority, deadline, id });
    });
};
