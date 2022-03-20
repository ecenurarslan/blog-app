import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { BlogDetail, Register, Login, Home, AddBlog } from "./Views";
export default function App() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!(user && user.token);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/add-blog">
            <AddBlog />
          </Route>
          <Route path="/blog/:id">
            <BlogDetail />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route>
            <Redirect to={"/" } />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
