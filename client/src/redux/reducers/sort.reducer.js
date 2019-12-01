import {sortConstants} from "../constants";

const initialState = {
    sorted: false,
    shuffled: true
};

export function sorting(state = initialState, action) {
    switch (action.type) {
        case sortConstants.SHUFFLE_REQUEST:
            return {
                sorted: false,
                shuffled: false,
            };
        case sortConstants.SHUFFLE_FINISHED:
            return {
                sorted: false,
                shuffled: true,
            };
        case sortConstants.SORT_REQUEST:
            return {
                sorted: false,
                shuffled: false,
            };
        case sortConstants.SORT_FINISHED:
            return {
                sorted: true,
                shuffled: false,
            };
        default:
            return state
    }
}
