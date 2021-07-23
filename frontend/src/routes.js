import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  //HomePage,
  LoginPage,
  SignupPage,
  FindPassPage,
  NotFoundPage,
  FriendListPage,
  ChatListPage,
} from "./pages";

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={FriendListPage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/signup" component={SignupPage} />
      <Route path="/findpass" component={FindPassPage} />
      <Route path="/friend" component={FriendListPage} />
      <Route path="/chats" component={ChatListPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </Router>
);
