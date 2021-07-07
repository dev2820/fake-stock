/* 
 * root reducer
 */
import { combineReducers } from "redux";
import signinReducer from "./signinReducer";

const rootReducer = combineReducers({
    signinReducer
});

export default rootReducer;