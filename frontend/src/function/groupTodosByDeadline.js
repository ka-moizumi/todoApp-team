//取得したTodo数を分けて返却
export const groupTodosByDeadline = (req) => {
  const today = new Date();
  const getData = req.data;

  //分けたTodo数を配列にする
  const limitTodos = [
    getHighPriorityTodos(getData, today).length,
    getNormalPriorityTodos(getData, today).length,
    getLowPriorityTodos(getData, today).length,
  ];

  const countCompleteTodos = [
    getCompleteTodos(getData, today).length,
    getInCompleteTodos(getData, today).length,
  ];
  return [limitTodos, countCompleteTodos];
};

// 期限ごとにTodoを分ける
const getHighPriorityTodos = (getData, today) => {
  const resData = getData.filter((num) => {
    const formatGetData = new Date(num.deadline);
    const deadline = formatGetData.setDate(formatGetData.getDate() + 1);
    return deadline - today < 86400000 && deadline - today > 0;
  });
  return resData;
};

const getNormalPriorityTodos = (getData, today) => {
  const resData = getData.filter((num) => {
    const formatGetData = new Date(num.deadline);
    const deadline = formatGetData.setDate(formatGetData.getDate() + 1);
    return deadline - today > 86400000 && deadline - today < 259200000;
  });
  return resData;
};

const getLowPriorityTodos = (getData, today) => {
  const resData = getData.filter((num) => {
    const formatGetData = new Date(num.deadline);
    const deadline = formatGetData.setDate(formatGetData.getDate() + 1);
    return deadline - today > 259200000;
  });
  return resData;
};

// 完了・未完了を分ける
const getCompleteTodos = (getData, today) => {
  const resData = getHighPriorityTodos(getData, today).filter((num) => {
    return num.completion === 1;
  });
  return resData;
};

const getInCompleteTodos = (getData, today) => {
  const resData = getHighPriorityTodos(getData, today).filter((num) => {
    return num.completion === 0;
  });
  return resData;
};
