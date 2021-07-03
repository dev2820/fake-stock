import './App.css';
import { Home, Login, Signup, FindPass, NotFound } from '../pages'
import {
  BrowserRouter as Router,
  Switch,
  Route,
//  Link
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/signin">
          <Login />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route>
          <NotFound />  
        </Route>
      </Switch>
      
    </Router>
  );
}

export default App;
