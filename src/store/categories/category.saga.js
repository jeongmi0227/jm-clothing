import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesSuccess, fetchCategoriesFailed } from './category.action';
import { CATEGORIES_ACTION_TYPES } from './category.types';

// generator is the basis for async await
export function* fetchCategoriesAsync() {
    try {
        // anywhere we have a function and want to turn it into an effect then use the call keyword.
        // first arg : callable method, second arg: parameter
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        yield put(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        yield put(fetchCategoriesFailed(error));
    }
}
export function* onFetchCategories() {
    // takeLatest : start the latest action and initalize fetchCategoriesAsync saga
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync);
}

export function* categoriesSaga() {
    // all is essentially effect, run everything inside and only complete when all of it is done.
    yield all([call(onFetchCategories)])
}