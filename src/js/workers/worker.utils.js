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

export function resetState() {
    state.pause = false;
    state.abort = false;
}

export const algorithmMap = {
    "QuickSort": quickSort,
    "BubbleSort": bubbleSort,
    "InsertionSort": insertionSort,
    "MergeSort": mergeSortRecursive
}

export function notify(type, payload) {
    let currentTime = new Date().getTime();
    postMessage({type: type, payload: payload});
    while (new Date().getTime() - currentTime < SLOWDOWN_FACTOR_MS) {}
}

export function notifyDataShuffled() {
    notify("shuffle", state.data);
}

export function notifyDataUpdate() {
    notify("sort", state.data);
}

export function onSortMethodExit() {
    postMessage({type: "sortFinished", payload: {"sorted" : !state.abort}});
}

export function getSortMethod(sort_type) {
    return algorithmMap[sort_type];
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