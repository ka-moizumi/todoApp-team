const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mysql = require("mysql2/promise");
const itemRegistValidator = require("./itemRegistValidator");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// アカウント作成
app.post(
  "/signUpInfo",
  itemRegistValidator.signUp,

  async (req, res) => {
    if (itemRegistValidator.checkVaridationResult(req, res)) {
      return;
    }

    try {
      const sql =
        "INSERT INTO USER(mail_address, user_name, password) VALUES(?, ?, ?)";
      const placeholder = [req.body.email, req.body.user, req.body.password];
      const results = await executeQuery(sql, placeholder);
      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// ユーザ情報を取得
app.get(
  "/getUserInfo",
  itemRegistValidator.getUser,

  async (req, res) => {
    if (itemRegistValidator.checkVaridationResult(req, res)) {
      return;
    }
    try {
      const sql =
        "SELECT id,user_name FROM USER WHERE mail_address = ? AND password = ?";
      const placeholder = [req.query.email, req.query.password];
      const results = await executeQuery(sql, placeholder);
      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Todoを取得
app.get(`/todos/:userId`, async (req, res) => {
  try {
    const sql =
      "SELECT id, title, content, completion, priority, deadline FROM TASK WHERE user_id = ? ORDER BY id ASC";
    const placeholder = req.params.userId;
    const results = await executeQuery(sql, placeholder);
    res.send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// メールアドレスが既に登録済みか確認
app.get("/getUserCountToEmail", async (req, res) => {
  try {
    const sql =
      "SELECT count(id) AS userCount FROM USER WHERE mail_address = ?";
    const placeholder = req.query.email;
    const results = await executeQuery(sql, placeholder);
    res.send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Todoを追加
app.post(
  "/addTodo",
  itemRegistValidator.addTodo,

  async (req, res) => {
    if (itemRegistValidator.checkVaridationResult(req, res)) {
      return;
    }

    try {
      const sql =
        "INSERT INTO TASK(title, content, priority, user_id, deadline) VALUES(?, ?, ?, ?, ?)";
      const placeholder = [
        req.body.title,
        req.body.content,
        req.body.priority,
        req.body.user_id,
        req.body.deadline,
      ];
      const results = await executeQuery(sql, placeholder);
      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Todoを削除
app.delete(
  "/deleteTodo/:todoId",
  itemRegistValidator.deleteTodo,

  async (req, res) => {
    if (itemRegistValidator.checkVaridationResult(req, res)) {
      return;
    }

    try {
      const sql = "DELETE FROM TASK WHERE id = ?";
      const placeholder = req.params.todoId;
      const results = await executeQuery(sql, placeholder);
      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Todoを全削除
app.delete(
  "/clearTodos/:userId",
  itemRegistValidator.clearTodos,

  async (req, res) => {
    if (itemRegistValidator.checkVaridationResult(req, res)) {
      return;
    }

    try {
      const sql = "DELETE FROM TASK WHERE user_id = ?";
      const placeholder = req.params.userId;
      const results = await executeQuery(sql, placeholder);
      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// 完了・未完了のステータス切り替え
app.patch(
  "/completionChange",
  itemRegistValidator.completionChange,

  async (req, res) => {
    if (itemRegistValidator.checkVaridationResult(req, res)) {
      return;
    }

    try {
      const sql = "UPDATE TASK SET completion = ? WHERE id = ?";
      const placeholder = [req.body.completion, req.body.id];
      const results = await executeQuery(sql, placeholder);
      res.send(results);
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

// Todoを更新
app.put("/editTodo/:id", itemRegistValidator.editTodo, async (req, res) => {
  if (itemRegistValidator.checkVaridationResult(req, res)) {
    return;
  }

  try {
    const sql =
      "UPDATE TASK SET title=?, content=?, priority=?, user_id=?, deadline=? WHERE id=?";
    const placeholder = [
      req.body.title,
      req.body.content,
      req.body.priority,
      req.body.user_id,
      req.body.deadline,
      req.params.id,
    ];
    const results = await executeQuery(sql, placeholder);
    res.send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});

const getConnection = async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "todo",
  });
  return connection;
};

const executeQuery = async (sql, placeholder) => {
  const conn = await getConnection();
  try {
    conn.connect();
    const [results] = await conn.query(sql, placeholder);
    return results;
  } catch (e) {
    console.log(e);
    return e;
  } finally {
    console.log("### CONN END");
    await conn.end();
  }
};

module.exports.executeQuery = executeQuery;
