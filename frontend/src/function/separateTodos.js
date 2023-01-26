//取得したTodo数を分けて返却
export const separateTodos = (res) => {
  const today = new Date();
  const getData = res.data;

  // 期限ごとにTodoを分ける
  const highPriorityTodos = getData.filter((num) => {
    const formatGetData = new Date(num.deadline);
    const deadline = formatGetData.setDate(formatGetData.getDate() + 1);
    return deadline - today < 86400000 && deadline - today > 0;
  });

  const normalPriorityTodos = getData.filter((num) => {
    const formatGetData = new Date(num.deadline);
    const deadline = formatGetData.setDate(formatGetData.getDate() + 1);
    return deadline - today > 86400000 && deadline - today < 259200000;
  });

  const lowPriorityTodos = getData.filter((num) => {
    const formatGetData = new Date(num.deadline);
    const deadline = formatGetData.setDate(formatGetData.getDate() + 1);
    return deadline - today > 259200000;
  });

  // 完了・未完了を分ける
  const completeTodos = highPriorityTodos.filter((num) => {
    return num.completion === 1;
  });

  const imCompleteTodos = highPriorityTodos.filter((num) => {
    return num.completion === 0;
  });

  //分けたTodo数を配列にする
  const limitTodos = [
    highPriorityTodos.length,
    normalPriorityTodos.length,
    lowPriorityTodos.length,
  ];

  const countCompleteTodos = [completeTodos.length, imCompleteTodos.length];

  return [limitTodos, countCompleteTodos];
};
