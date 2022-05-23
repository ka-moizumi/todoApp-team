import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { List } from "./pages/list/list";
import { Create } from "./pages/create/create";
import { Header } from "./pages/header/header";
import { Update } from "./pages/update/update";

export const App = () => {
  const NotFound = () => {
    return <h2>Not Found Page</h2>;
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/">
            <h1>Home</h1>
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/update/:id">
            <Update />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};
