import { useEffect, useState } from "react";
import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { List } from "./pages/list";
import { Create } from "./pages/create";
import { Update } from "./pages/update";

function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    axios.get("/api").then((res) => {
      setMessage(res.data.message);
    });
  }, []);

  return (
    <div className="App">
      <h1>フロントエンド</h1>
      <p>{message}</p>

      <BrowserRouter>
        <div>
          <Link to="/">Home</Link>
        </div>
        <div>
          <Link to="/list">Todoリスト一覧</Link>
        </div>
        <div>
          <Link to="/create">Todo新規作成</Link>
        </div>
        <div>
          <Link to="/update">Todo更新</Link>
        </div>

        <Switch>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/update">
            <Update />
          </Route>
          <Route path="/">
            <h1>Home</h1>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
