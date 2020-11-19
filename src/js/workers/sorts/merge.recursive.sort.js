import {state, CheckPause, notifyDataUpdate} from "js/workers/worker.utils.js";

const merge = async (start, mid, end) => {
    if (state.abort) {
        return;
    }

    let merged = [];
    let leftIdx = start;
    let rightIdx = mid + 1;

    while (leftIdx <= mid && rightIdx <= end) {
        if (state.data[leftIdx] < state.data[rightIdx]) {
            merged.push(state.data[leftIdx]);
            leftIdx += 1;
        }
        else {
            merged.push(state.data[rightIdx]);
            rightIdx += 1;
        }
    }

    while (leftIdx <= mid) {
        merged.push(parseInt(state.data[leftIdx]));
        leftIdx += 1
    }

    while (rightIdx <= end) {
        merged.push(state.data[rightIdx]);
        rightIdx += 1;
    }

    for (let i = 0; i < merged.length; i++) {
        state.data[start + i] = merged[i];
        notifyDataUpdate();
    }

    await CheckPause();
}

const mergeSort = async (start, end) => {
    if (state.abort) {
        return;
    }

    if (end <= start) {
        return;
    }

    const middle = Math.floor(start + ((end - start + 1) / 2)) - 1;

    await mergeSort(start, middle);
    await mergeSort(middle + 1, end);
    await merge(start, middle, end);

    notifyDataUpdate();
}

export const mergeSortRecursive = async () => await mergeSort(0, state.data.length - 1);