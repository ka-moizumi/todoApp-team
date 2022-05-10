import axios from "axios";

export const getTodos = async () => {
  return await axios.get(`/getTodos`);
};

export const addTodo = async (title) => {
  await axios
    .post(`/addTodo`, { title: title, content: "テスト", user_id: "茂泉" })
    .then(() => {
      getTodos();
    });
};

export const deleteTodo = async (id) => {
  await axios.post(`/deleteTodo`, { id: id }).then(() => {
    getTodos();
  });
};

export const clearTodos = async () => {
  await axios.post(`/clearTodos`).then(() => {
    getTodos();
  });
};

export const editTodo = async (edit, id) => {
  await axios.post(`/editTodo`, { title: edit, id: id }).then(() => {
    getTodos();
  });
};
