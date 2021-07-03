import { createAction,handleActions } from 'redux-actions';
//action types
const FETCH_ID = 'signin/FETCH_ID'
const FETCH_PASSWORD = 'signin/FETCH_PASSWORD'
const FETCH_TEST = 'signin/FETCH_TEST'
//state 초기값
const initialState = {
    id: "",
    password: "",
    test: "test code"
}

//reducer
export const fetchIdActionCreator = createAction(FETCH_ID);
export const fetchPasswordActionCreator = createAction(FETCH_PASSWORD);
export const fetchTestActionCreator = createAction(FETCH_TEST);
export default handleActions({
    [FETCH_ID]: (state, action) => {
        return state
    },
    [FETCH_PASSWORD]: (state, action) => state,
    [FETCH_TEST]: (state, action) => {
        return {
            test : action.payload.text
        }
    }
}, initialState)