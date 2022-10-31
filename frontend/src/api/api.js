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

// Todoを取得
export const getTodos = async (user_id) => {
  return await axios.post(`/getTodos`, { user_id });
};

//Todoの日付を取得
export const getTodosDate = async (user_id) => {
  return await axios.post(`/getTodosDate`, { user_id });
};

// Todoを追加
export const addTodo = async (title, content, priority, user_id, deadline) => {
  await axios.post(`/addTodo`, {
    title: title,
    content: content,
    priority: priority,
    user_id: user_id,
    deadline: deadline,
  });
};

// Todoを削除
export const deleteTodo = async (id) => {
  await axios.post(`/deleteTodo`, { id });
};

// Todoを全削除
export const clearTodos = async (user_id) => {
  await axios.post(`/clearTodos`, { user_id });
};

// 完了・未完了のステータス切り替え
export const completionChange = async (completion, id) => {
  await axios.post(`/completionChange`, { completion, id });
};

// Todoを更新
export const editTodo = async (
  title,
  content,
  priority,
  user_id,
  deadline,
  id
) => {
  await axios.post(`/editTodo`, {
    title,
    content,
    priority,
    user_id,
    deadline,
    id,
  });
};
