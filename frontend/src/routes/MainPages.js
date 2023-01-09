import { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import { Create } from "../pages/create/create";
import { List } from "../pages/list/list";
import { SignUp } from "../pages/login/SignUp";
import { Login } from "../pages/login/Login";
import { Update } from "../pages/update/update";
import { TextContext } from "../providers/textProvider";
import { AuthJudge } from "../functional/AuthJudge";
import { Home } from "../pages/home/home";

const NotFound = () => {
  return <h2>Not Found Page</h2>;
};

export const MainPages = () => {
  const { isAuth } = useContext(TextContext);
  return (
    <Switch>
      <Route exact path="/">
        {isAuth ? <Home /> : <Login />}
      </Route>
      <Route path="/signUp">
        <SignUp />
      </Route>
      <AuthJudge>
        <Switch>
          <Route path="/create/:id">
            <Create />
          </Route>
          <Route path="/list/:id">
            <List />
          </Route>
          <Route path="/update/:id">
            <Update />
          </Route>
        </Switch>
      </AuthJudge>
      <Route>
        <NotFound path="*" />
      </Route>
    </Switch>
  );
};
