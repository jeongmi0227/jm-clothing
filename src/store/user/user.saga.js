import { takeLatest, all, call, put } from 'redux-saga/effects';

import { USER_ACTION_TYPE } from './user.types';

import {
    signInSuccess,
    signInFailed,
    signUpFailed,
    signOutSuccess,
    signOutFailed,
    signUpSuccess
} from './user.action';

import {
    getCurrentUser,
    createUserDocumentFromAuth,
    signInWithGooglePopup,
    signInAuthUserWithEmailAndPassword,
    createAuthUserWithEmailAndPassword,
    signOutUser
} from '../../utils/firebase/firebase.utils';

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
export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup);
        yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
        yield put(signInFailed(error));
    }
}

export function* signInWithEmail({ payload: { email, password } }) {
    try {
      const { user } = yield call(
        signInAuthUserWithEmailAndPassword,
        email,
        password
      );
      yield call(getSnapshotFromUserAuth, user);
    } catch (error) {
      yield put(signInFailed(error));
    }
}
export function* signUp({ payload: { email, password, displayName } }) {
    try {
        const { user } = yield call(
            createAuthUserWithEmailAndPassword,
            email,
            password
        );
        yield put(signUpSuccess(user, { displayName }));
    } catch (error) {
        yield put(signUpFailed(error));
    }
}  

export function* signUpAfterSignUp({ payload: { user, additionalDetails } }) {
    yield call(getSnapshotFromUserAuth, user, additionalDetails);
}


export function* singOut() {
    try {
        yield call(signOutUser);  
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailed(error));
    }
}

export function* isUserAuthenticated() {
    try {
        console.log("isUserAuthenticated");
        const userAuth = yield call(getCurrentUser);
        if (!userAuth) return;
        yield call(getSnapshotFromUserAuth,userAuth);
    } catch (error) {
        yield put(signInFailed(error));
    }
}


export function* onGoogleSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.GOOGLE_SIGN_IN_START, signInWithGoogle);
}
export function* onCheckUserSession() {
    yield takeLatest(USER_ACTION_TYPE.CHECK_USER_SESSION,isUserAuthenticated);
}
export function* onEmailSignInStart() {
    yield takeLatest(USER_ACTION_TYPE.EMAIL_SIGN_IN_START,signInWithEmail)
}
export function* onSignUpStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_START,signUp);
}
export function* onSignUpSuccess() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_UP_SUCCESS, signUpAfterSignUp);
}
export function* onSignOutStart() {
    yield takeLatest(USER_ACTION_TYPE.SIGN_OUT_START, singOut);
}
export function* userSagas() {
    yield all([
        call(onCheckUserSession),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onSignOutStart),
    ]);
}
