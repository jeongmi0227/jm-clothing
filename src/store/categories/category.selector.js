// selectors do tranformation business logic (selector tranform data into the final shape that we want)
// The reason is that we can have multiple different selectors that perform different transformations on the base format of the data we have.
export const selectCategoriesMap = (state) =>
    state.categories.categories.reduce((acc, category) => {
        const { title, items} = category;
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});