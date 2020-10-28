import {
    bubbleSort,
    insertionSort,
    mergeSortRecursive,
    quickSort
} from "workers/sorts";


export const SLOWDOWN_FACTOR_MS = 1;

export const state = {
    pause: false,
    abort: false,
    data: []
}

export const algorithmMap = {
    "QuickSort": quickSort,
    "BubbleSort": bubbleSort,
    "InsertionSort": insertionSort,
    "MergeSort": mergeSortRecursive
};

export function resetState() {
    state.pause = false;
    state.abort = false;
}

export function notify(type) {
    let currentTime = new Date().getTime();
    self.postMessage([type, state.data]);
    while (new Date().getTime() - currentTime < SLOWDOWN_FACTOR_MS) {
    }
}

export function notifySort() {
    notify("sort", state.data);
}

export async function shuffle(size, maxValue) {
    state.data = new Array(size);

    for (let i = 0; i < size; i++) {
        state.data[i] = getRandomInt(1, maxValue);
    }
}

export function PromiseTimeout(delay) {
    return new Promise(function (resolve, reject) {
        setTimeout(resolve, delay);
    });
}

export async function CheckPause() {
    await PromiseTimeout(0);
    while (state.pause) {
        await PromiseTimeout(0);
    }
}

export function getRandomInt(min, max) {
    return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;
}
