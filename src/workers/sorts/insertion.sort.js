import {state, CheckPause, notifySort} from "workers/worker.utils.js";

export async function insertionSort() {
    let length = state.data.length;
    for (let i = 1; i < length; i++) {

        await CheckPause();

        if (state.abort) {
            return;
        }

        let key = state.data[i];
        let j = i - 1;
        while (j >= 0 && state.data[j] > key) {
            state.data[j + 1] = state.data[j];
            j = j - 1;
            notifySort();
        }
        state.data[j + 1] = key;
    }
}