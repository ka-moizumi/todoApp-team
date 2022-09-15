import axios from "axios";

export const signUpInfo = async (emali, user, password) => {
  return await axios.post(`/signUpInfo`, {
    email: emali,
    user: user,
    password: password,
  });
};

export const getUserInfo = async (email, password) => {
  return await axios.post(`/getUserInfo`, {
    email: email,
    password: password,
  });
};

export const getTodos = async (userId) => {
  return await axios.post(`/getTodos`, { userId: userId });
};

export const addTodo = async (title, content, priority, user_id, deadline) => {
  await axios.post(`/addTodo`, {
    title: title,
    content: content,
    priority: priority,
    user_id: user_id,
    deadline: deadline,
  });
};

export const deleteTodo = async (id) => {
  await axios.post(`/deleteTodo`, { id });
};

export const clearTodos = async () => {
  await axios.post(`/clearTodos`).then(() => {
    getTodos();
  });
};

export const completionChange = async (completion, id) => {
  await axios.post(`/completionChange`, { completion, id });
};

export const editTodo = async (title, content, priority, deadline, id) => {
  await axios.post(`/editTodo`, { title, content, priority, deadline, id });
};
