const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mysql = require("mysql2/promise");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/signUpInfo", async (req, res) => {
  const sql =
    "INSERT INTO USER(mail_address, user_name, password) VALUES(?, ?, ?)";
  const placeholder = [req.body.email, req.body.user, req.body.password];
  const results = await executeQuery(sql, placeholder);
  res.send(results);
});

app.post("/getUserId", async (req, res) => {
  try {
    const sql = "SELECT id,user_name FROM USER WHERE mail_address = ?";
    const placeholder = [req.body.email];
    const results = await executeQuery(sql, placeholder);
    res.send(results);
  } catch (err) {
    console.log(err);
  }
});

app.post("/getUserInfo", async (req, res) => {
  try {
    const sql =
      "SELECT id,user_name FROM USER WHERE mail_address = ? AND password = ?";
    const placeholder = [req.body.email, req.body.password];
    const results = await executeQuery(sql, placeholder);
    res.send(results);
  } catch (err) {
    console.log(err);
  }
});

// Todoを取得
app.post("/getTodos", async (req, res) => {
  try {
    console.log(req.body.user_id);
    const sql =
      "SELECT id, title, content, completion, priority, DATE_FORMAT(deadline, '%m/%d') AS deadline FROM TASK WHERE user_id = ?";
    const placeholder = [req.body.user_id];
    const results = await executeQuery(sql, placeholder);
    res.send(results);
  } catch (err) {
    console.error("error query: " + err.stack);
    res.send({ error: err });
  } finally {
    console.log("### END");
  }
});

// Todoの日付を取得
app.post("/getTodosDate", async (req, res) => {
  try {
    const sql = "SELECT completion, deadline FROM TASK WHERE user_id = ?";
    const placeholder = [req.body.user_id];
    const results = await executeQuery(sql, placeholder);
    res.send(results);
  } catch (err) {
    console.log({ errror: err });
  }
});

// Todoを追加
app.post("/addTodo", async (req, res) => {
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
});

app.post("/deleteTodo", async (req, res) => {
  const sql = "DELETE FROM TASK WHERE id=?";
  const placeholder = req.body.id;
  const results = await executeQuery(sql, placeholder);
  res.send(results);
});

app.post("/completionChange", async (req, res) => {
  try {
    const sql = "UPDATE TASK SET completion = ? WHERE id = ?";
    const placeholder = [req.body.completion, req.body.id];
    const results = await executeQuery(sql, placeholder);
    res.send(results);
  } catch (err) {
    console.log(err);
  }
});

app.post("/clearTodos", async (req, res) => {
  const sql = "DELETE FROM TASK WHERE user_id = ?";
  const placeholder = [req.body.user_id];
  const results = await executeQuery(sql, placeholder);
  res.send(results);
});

app.post("/editTodo", async (req, res) => {
  try {
    const sql =
      "UPDATE TASK SET title=?, content=?, priority=?, user_id=?, deadline=? WHERE id=?";
    const placeholder = [
      req.body.title,
      req.body.content,
      req.body.priority,
      req.body.user_id,
      req.body.deadline,
      req.body.id,
    ];
    const results = await executeQuery(sql, placeholder);
    res.send(results);
  } catch (err) {
    console.log(err);
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
