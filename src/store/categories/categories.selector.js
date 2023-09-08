import {createSelector} from 'reselect';

const selectCategoriesReducer = (state) => {
    return state.categories;
};

export const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => {
        console.log(categoriesSlice.categories);
        return categoriesSlice.categories;
    }
) 


export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) =>
        categories.reduce((acc, docSnapshot) => {
            const {title, items} = docSnapshot;
            acc[title.toLowerCase()] =items;
            return acc;
        }, 
    {})
);
