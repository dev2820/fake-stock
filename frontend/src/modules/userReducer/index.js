import { createAction, handleActions } from "redux-actions";
//action types
const FETCH_ID = "login/FETCH_ID";
const FETCH_PASSWORD = "login/FETCH_PASSWORD";
const FETCH_TEST = "login/FETCH_TEST";
const FETCH_IS_LOGINED = "login/FETCH_IS_LOGINED"
//state 초기값
const initialState = {
  id: "",
  password: "",
  test: "test code",
};

//reducer
export const fetchIdActionCreator = createAction(FETCH_ID);
export const fetchPasswordActionCreator = createAction(FETCH_PASSWORD);
export const fetchTestActionCreator = createAction(FETCH_TEST);
export const fetchIsLoginedActionCreator = createAction(FETCH_IS_LOGINED);
export default handleActions(
  {
    [FETCH_ID]: (state, action) => {
      return state;
    },
    [FETCH_PASSWORD]: (state, action) => state,
    [FETCH_TEST]: (state, action) => {
      return {
        test: action.payload.text,
      };
    },
    [FETCH_IS_LOGINED]: function(state,action) {
      return {
        isLogined: action.payload.isLogined
      }
    }
  },
  initialState
);
