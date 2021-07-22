import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import {
  //HomePage,
  LoginPage,
  SignupPage,
  FindPassPage,
  NotFoundPage,
  FriendListPage,
  ChatListPage
} from "./pages";

export default (
  <Router>
    <Switch>
      <Route exact path="/" component={FriendListPage}></Route>
      <Route path="/login" component={LoginPage}></Route>
      <Route path="/signup" component={SignupPage}></Route>
      <Route path="/findpass" component={FindPassPage}></Route>
      <Route path="/friend" component={FriendListPage}></Route>
      <Route path="/chats" component={ChatListPage}></Route>
      <Route component={NotFoundPage}></Route>
    </Switch>
  </Router>
);
