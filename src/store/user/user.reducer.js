import { USER_ACTION_TYPE } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error:null,
}
// Context API, dispatch only fire specific reducer
// Every single reducer receives every single action inside of Redux
// By default, whenver we don't respond to an action, then we need return back the current state.
export const userReducer = (state = INITIAL_STATE, action) => {
    // payload is going to store the value that is important for this reducer to know what to update this state value with.
    const { type, payload } = action;

    switch (type) {
        case USER_ACTION_TYPE.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            };
        case USER_ACTION_TYPE.SIGN_OUT_SUCCESS:
            return { ...state, currentUser: null };
        case USER_ACTION_TYPE.SIGN_IN_FAILED:
        case USER_ACTION_TYPE.SIGN_UP_FAILED:
        case USER_ACTION_TYPE.SIGN_OUT_FAILED:
            return { ...state, error: payload };
        // return state reducer did not change, so reducer does not need to update 
        // and this is going to be important when it comes to re-render.
        default:
            return state;
    }
}


