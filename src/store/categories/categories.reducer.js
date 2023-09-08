import { CATGORIES_ACTION_TYPES } from "./categories.types";

const INITIAL_STATE = {
    categories: []
}

export const categoriesReducer = (state = INITIAL_STATE, action = {}) => {
    const {type, payload} = action;
    
    switch (type) {
        case CATGORIES_ACTION_TYPES.SET_CATEGORIES_MAP:
            return {
                ...state,
                categories: payload
            }
        default:
            return state;
    }
}