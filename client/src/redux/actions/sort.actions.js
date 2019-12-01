import {sortService} from "../../services/sortservice";
import {sortConstants} from "../constants";

export const sortActions = {
    shuffle,
    sort,
};

function shuffle() {
    return dispatch => {
       dispatch({ type: sortConstants.SHUFFLE_REQUEST });

       sortService.shuffle().then(shuffledData => {
         console.log("Received shuffled data");
         dispatch({ type: sortConstants.SHUFFLE_FINISHED });
       });
    };
}

function sort() {
    return dispatch => dispatch({ type: sortConstants.SORT_REQUEST })
}
