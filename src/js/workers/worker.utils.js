import {
    bubbleSort,
    insertionSort,
    mergeSortRecursive,
    quickSort
} from "js/workers/sorts";

export const SLOWDOWN_FACTOR_MS = 1;

export const state = {
    pause: false,
    abort: false,
    data: []
}

export const resetState = ()  => {
    state.pause = false;
    state.abort = false;
}

export const algorithmMap = {
    "QuickSort": quickSort,
    "BubbleSort": bubbleSort,
    "InsertionSort": insertionSort,
    "MergeSort": mergeSortRecursive
}

let previousTime = new Date().getTime();
let firstTime = true;

export const notify = (type, payload)  => {
    let currentTime = new Date().getTime();

    if (currentTime - previousTime > 16 || firstTime) {
        firstTime = false;
        postMessage({type: type, payload: payload});
        previousTime = currentTime;
    }
    while (new Date().getTime() - currentTime < SLOWDOWN_FACTOR_MS) {}
}

export const notifyDataShuffled = () => notify("shuffle", state.data);

export const notifyDataUpdate = () => notify("sort", state.data);

export const onSortMethodExit = ()  => postMessage({type: "sortFinished", payload: {"sorted" : !state.abort}});

export const getSortMethod = (sort_type) => algorithmMap[sort_type];

export const shuffle = async (size, maxValue) => {
    state.data = new Array(size);

    for (let i = 0; i < size; i++) {
        state.data[i] = getRandomInt(1, maxValue);
    }
}

export const PromiseTimeout = delay => {
    return new Promise((resolve, reject) => setTimeout(resolve, delay));
}

export const CheckPause = async () => {
    await PromiseTimeout(0);
    while (state.pause) {
        await PromiseTimeout(0);
    }
}

export const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;