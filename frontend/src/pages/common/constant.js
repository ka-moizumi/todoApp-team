export const ERROR_MESSAGES = {
  getTodos: (errorCode) => `Todoの取得ができません。エラーコード:${errorCode}`,
  registerTodo: (errorCode) =>
    `Todoの登録ができません。エラーコード:${errorCode}`,
  deleteTodos: (errorCode) =>
    `Todoの削除ができません。エラーコード:${errorCode}`,
  changeStatus: (errorCode) =>
    `ステータス更新ができません。エラーコード:${errorCode}`,
  displayChart: (errorCode) =>
    `チャートを表示できません。エラーコード：${errorCode}`,
};
