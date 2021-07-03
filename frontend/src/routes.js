import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

import { 
    HomePage, 
    SigninPage, 
    SignupPage, 
    FindPassPage, 
    NotFoundPage 
} from './pages'

export default (
    <Router>
        <Switch>
            <Route exact path="/" component={HomePage}></Route>
            <Route path="/signin" component={SigninPage}></Route>
            <Route path="/signup" component={SignupPage}></Route>
            <Route path="/findpass" component={FindPassPage}></Route>
            <Route component={NotFoundPage}></Route>
        </Switch>
    </Router>
);