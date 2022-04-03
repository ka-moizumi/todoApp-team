const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => {
  res.send("Hello TEST nodemon package.json test!");
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.listen(port, () => {
  console.log(`listening on *:${port}`);
});
