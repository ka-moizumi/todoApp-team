const express = require("express");
const app = express();
const port = process.env.PORT || 3001;
const mysql = require("mysql2/promise");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello TEST nodemon package.json test!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("/getTodos", async (req, res) => {
  try {
    const sql = "SELECT id,title,content,priority,deadline FROM TASK";
    const results = await executeQuery(sql);
    res.send(results);
  } catch (err) {
    console.error("error query: " + err.stack);
    res.send({ error: err });
  } finally {
    console.log("### END");
  }
});

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

app.post("/clearTodos", async (req, res) => {
  const sql = "DELETE FROM TASK";
  const results = await executeQuery(sql);
  res.send(results);
});

app.post("/editTodo", async (req, res) => {
  try {
    const sql =
      "UPDATE TASK SET title=?, content=?, priority=?, deadline=? WHERE id=?";
    const placeholder = [
      req.body.title,
      req.body.content,
      req.body.priority,
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
