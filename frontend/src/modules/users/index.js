import { createAction, handleActions } from "redux-actions";
import * as userAPI from '../../api/users'
//action types
const FETCH_EMAIL = "user/FETCH_EMAIL";
const FETCH_USERINFO = "user/FETCH_USERINFO";
const FETCH_FRIENDS_INFO = "user/FETCH_FRIENDS_INFO";
const FETCH_ACCESSTOKEN = "user/FETCH_ACCESSTOKEN";

//state 초기값
const initialState = {
  email: "",
  userInfo: null,
  friendsInfo: [],
  accessToken: null,
};

//reducer
export const fetchEmailActionCreator = createAction(FETCH_EMAIL);
export const fetchUserInfoActionCreator = createAction(FETCH_USERINFO);
export const fetchFriendsInfoActionCreator = createAction(FETCH_FRIENDS_INFO);
export const fetchAccessToken = createAction(FETCH_ACCESSTOKEN);

//thunks
export const requestLogin = (email,password) => async (dispatch) => {
  try {
    const token = await userAPI.requestLogin(email,password);
    dispatch({ type: FETCH_ACCESSTOKEN, payload: { token } });
  }
  catch (err){
    dispatch({ type: FETCH_ACCESSTOKEN, payload: { token:null } });
  }
}

export const requestSignup = (email,password,name) => async (dispatch) => {
  try {
    const token = await userAPI.requestSignup(email,password,name);
    dispatch({ type: FETCH_ACCESSTOKEN, payload: { token } });
  }
  catch (err){
    dispatch({ type: FETCH_ACCESSTOKEN, payload: { token:null } });
  }
}

export const requestRefreshToken = (email,password) => async (dispatch) => {
  try {
    const token = await userAPI.requestRefreshToken(email,password);
    dispatch({ type: FETCH_ACCESSTOKEN, payload: { token } });
  }
  catch (err){
    dispatch({ type: FETCH_ACCESSTOKEN, payload: { token:null } });
  }
}

export const requestLogout = () => async (dispatch) => {
    const token = await userAPI.requestLogout();
    dispatch({ type: FETCH_ACCESSTOKEN, payload: { token:null } });
}

export const requestUserInfo = () => async (dispatch) => {
  try {
    const userInfo = await userAPI.requestUserInfo();
    dispatch({ type: FETCH_USERINFO, payload: { userInfo:userInfo } });
  }
  catch(err) {
    dispatch({ type: FETCH_USERINFO, payload: { userInfo:null } });
  }
}

export const requestFriendsInfo = () => async (dispatch) => {
  try {
    const infoList = await userAPI.requestFriendsInfo();
    dispatch({ type: FETCH_FRIENDS_INFO, payload: { infoList:[] } });
  }
  catch(err) {
    dispatch({ type: FETCH_FRIENDS_INFO, payload: { infoList:[] } });
  }
}

export default handleActions(
  {
    [FETCH_EMAIL]: (state, action) => ({
      ...state,
      email: action.payload
    }),
    [FETCH_USERINFO]: (state, action) => ({
      ...state,
      userInfo: action.payload.userInfo
    }),
    [FETCH_FRIENDS_INFO]: (state, action) => ({
      ...state,
      friendsInfo: action.payload.infoList
    }),
    [FETCH_ACCESSTOKEN]: (state,action) => ({
        ...state,
        accessToken: action.payload.token
    }),
  },
  initialState
);
