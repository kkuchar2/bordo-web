import {CheckSortPause, mark, markExclusive, notifySortUpdate, sortState, unmark} from "workers/worker.utils.js";

export const bubbleSort = async () => {
    let len = sortState.data.length;

    for (let i = 0; i < len; i++) {


        for (let j = 0; j < len - i - 1; j++) {
            await CheckSortPause(sortState.pause);

            if (sortState.abort) {
                return;
            }

            markExclusive(j + 1, 0);

            if (sortState.data[j] > sortState.data[j + 1]) {
                let tmp = sortState.data[j];
                sortState.data[j] = sortState.data[j + 1];
                sortState.data[j + 1] = tmp;
                notifySortUpdate();
            }
        }
    }
};