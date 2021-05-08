import {CheckSortPause, mark, notifySortUpdate, sortState, unmark} from "workers/worker.utils.js";

const merge = async (start, mid, end) => {
    if (sortState.abort) {
        return;
    }

    mark(start, 2);
    mark(mid, 0);
    mark(end - 1, 2);
    notifySortUpdate();

    let merged = [];
    let leftIdx = start;
    let rightIdx = mid + 1;

    while (leftIdx <= mid && rightIdx <= end) {
        if (sortState.data[leftIdx] < sortState.data[rightIdx]) {
            merged.push(sortState.data[leftIdx]);
            leftIdx += 1;
        }
        else {
            merged.push(sortState.data[rightIdx]);
            rightIdx += 1;
        }
    }

    while (leftIdx <= mid) {
        merged.push(sortState.data[leftIdx]);
        leftIdx += 1;
    }

    while (rightIdx <= end) {
        merged.push(sortState.data[rightIdx]);
        rightIdx += 1;
    }

    unmark(mid);
    notifySortUpdate();

    for (let i = 0; i < merged.length; i++) {
        mark(start + i, 3);
        sortState.data[start + i] = merged[i];
        notifySortUpdate();
    }

    unmark(start);
    unmark(end - 1);
    notifySortUpdate();

    await CheckSortPause();
};

const mergeSort = async (start, end) => {
    if (sortState.abort) {
        return;
    }

    if (end <= start) {
        return;
    }

    const middle = Math.floor(start + ((end - start + 1) / 2)) - 1;

    await mergeSort(start, middle);
    await mergeSort(middle + 1, end);
    await merge(start, middle, end);

    notifySortUpdate();
};

export const mergeSortRecursive = async () => mergeSort(0, sortState.data.length - 1);