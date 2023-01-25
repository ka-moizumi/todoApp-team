import axios from "axios";

// アカウント作成
export const signUpInfo = async (userData) => {
  return await axios.post(`/signUpInfo`, userData);
};

// ユーザ情報を取得
export const getUserInfo = async (userData) => {
  const result = await axios.get(`/getUserInfo`, {
    params: userData,
  });
  return result;
};

// Todoを取得
export const getTodos = async (userId) => {
  return await axios.get(`/todos/${userId}`);
};

//Todoの日付を取得
export const getChartData = async (userId) => {
  return await axios.get(`/getChartData/${userId}`);
};

// メールアドレスが既に登録済みか確認
export const getUserCountToEmail = async (email) => {
  return await axios.get(`/getUserCountToEmail`, { params: { email: email } });
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
  await axios.delete(`/deleteTodo/${id}`);
};

// Todoを全削除
export const clearTodos = async (userId) => {
  await axios.delete(`/clearTodos/${userId}`);
};

// 完了・未完了のステータス切り替え
export const completionChange = async (completion, id) => {
  await axios.patch(`/completionChange`, { completion, id });
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
  await axios.put(`/editTodo/${id}`, {
    title,
    content,
    priority,
    user_id,
    deadline,
  });
};
