import { createAction, handleActions } from "redux-actions";
//action types
const FETCH_ID = "login/FETCH_ID";
const FETCH_PASSWORD = "login/FETCH_PASSWORD";
const FETCH_TEST = "login/FETCH_TEST";
const FETCH_ACCESSTOKEN = "login/ACCESSTOKEN"
//const FETCH_IS_LOGINED = "login/FETCH_IS_LOGINED";

// const CHANGE_LOGIN_STATE = "login/CHANGE_LOGIN_STATE";

//state 초기값
const initialState = {
  id: "",
  password: "",
  test: "test code",
  accessToken: null,
};

//reducer
export const fetchIdActionCreator = createAction(FETCH_ID);
export const fetchPasswordActionCreator = createAction(FETCH_PASSWORD);
export const fetchTestActionCreator = createAction(FETCH_TEST);
export const fetchAccessTokenActionCreator = createAction(FETCH_ACCESSTOKEN);

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
    [FETCH_ACCESSTOKEN]: function(state,action) {
      return {
        accessToken: action.payload
      }
    }
    // [CHANGE_LOGIN_STATE]: function(state, action) {
    //   return {
    //     ...state,
    //     isLogined: !state.isLogined,
    //     // islogined: true,
    //   };
    // },
  },
  initialState
);
