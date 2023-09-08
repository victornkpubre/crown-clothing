import { createAction } from "../../utils/reducer/reducer.utils";
import { CATGORIES_ACTION_TYPES } from "./categories.types";

export const setCategoriesMap = (categoriesMap) => {
    return createAction(CATGORIES_ACTION_TYPES.SET_CATEGORIES_MAP, categoriesMap);
}