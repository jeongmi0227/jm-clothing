// Reselector creates for memorised selector
// Memorization is the process in which we cache 
// the previous value of something so that if the input
// has not changed, then we just return back the same output. (This works when we have pure function)
import { createSelector } from "reselect";

// input selectors are selectors that give us the parameters that we need in order to determine what our output should be.
const selectCategoryReducer = (state) => {
    console.log('selector fired 1');
 return   state.categories;
}

// createSelector creates memoized selector take two arguments.
// 1. an array of input selectors.
// 2. output selector.
export const selectCategories = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => {
        console.log('selector fired 2');
        return categoriesSlice.categories;
    }
);

// selectors do tranformation business logic (selector tranform data into the final shape that we want)
// The reason is that we can have multiple different selectors that perform different transformations on the base format of the data we have.
export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => {
        console.log('selector fired 3');
       return categories.reduce((acc, category) => {
            const { title, items} = category;
            acc[title.toLowerCase()] = items;
            return acc;
        }, {})
    }

);

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)
