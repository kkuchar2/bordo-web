import { sortConstants} from "../redux/constants";
import {expose} from "coffeekraken-redux-web-worker";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}

export default expose({
    [sortConstants.SHUFFLE_REQUEST]: async ({ dispatch, action, state }) => {
        let size = action.payload[0];
        let maxValue = action.payload[1];
        let values = new Array(size);

        for (let i = 0; i < size; i++) {
            values[i] = getRandomInt(1, maxValue);
            dispatch({ type: sortConstants.SHUFFLE_STATUS, data: values})
        }
    }
}, self)