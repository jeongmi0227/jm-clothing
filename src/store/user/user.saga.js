import { takeLatest, all, call, put } from 'redux-saga/effects';

import { USER_ACTION_TYPE } from './user.types';

import { signInSuccess, signInFailed } from './user.action';

import { getCurrentUser, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
    try {
        // every single step that yields you want to be as descriptive as possible
        // creating an effect for it, effect is essentially a plain object describes what is trying to happen.
        // The key thing to know is that anywhere we are going to make some kind of call to either a new saga or to some function method
        // if it's an API call or asynchronous call, use the call effect
        const userSnapshot = yield call(createUserDocumentFromAuth, userAuth, additionalDetails);
        
        yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        
    } catch (error) {
        yield put(signInFailed(error));
    }
    
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth,userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION,isUserAuthenticated);
}
export function* userSagas() {
    yield all([call(onCheckUserSession)]);
}