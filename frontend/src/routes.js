import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  HomePage,
  LoginPage,
  SignupPage,
  FindPassPage,
  NotFoundPage,
} from "./pages";

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={HomePage}></Route>
      <Route path="/login" component={LoginPage}></Route>
      <Route path="/signup" component={SignupPage}></Route>
      <Route path="/findpass" component={FindPassPage}></Route>
      <Route component={NotFoundPage}></Route>
    </Switch>
  </Router>
);
