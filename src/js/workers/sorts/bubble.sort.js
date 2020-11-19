import {state, CheckPause, notifyDataUpdate} from "js/workers/worker.utils.js";

export const bubbleSort = async () => {
    let len = state.data.length;

    for (let i = 0; i < len; i++) {

        for (let j = 0; j < len; j++) {
            await CheckPause(state.pause);

            if (state.abort) {
                return;
            }

            if (state.data[j] > state.data[j + 1]) {
                let tmp = state.data[j];
                state.data[j] = state.data[j + 1];
                state.data[j + 1] = tmp;
                notifyDataUpdate()
            }
        }
    }
}