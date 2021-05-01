import {bubbleSort, insertionSort, mergeSortRecursive, quickSort} from "workers/sorts";
import {AStarPathfinder} from "workers/pathfinders";

export const SLOWDOWN_FACTOR_MS = 1;

export const sortState = {
    pause: false,
    abort: false,
    data: []
};

export const pathFindingState = {
    pause: false,
    abort: false,
    data: [],
    obstacles: [],
    new_visited: null,
    all_visited: [],
    path: [],
    to_visit: [],
    found_path: false
};

export const resetState = () => {
    sortState.pause = false;
    sortState.abort = false;
};

export const sortAlgorithmMap = {
    "QuickSort": quickSort,
    "BubbleSort": bubbleSort,
    "InsertionSort": insertionSort,
    "MergeSort": mergeSortRecursive
};

export const pathfindingAlgorithmMap = {
    "aStar": AStarPathfinder
};

let previousTime = new Date().getTime();
let firstTime = true;

export const notify = (type, payload, skipMessagesByTime = false, skipTimeInMs = 16) => {
    let currentTime = new Date().getTime();

    if (skipMessagesByTime) {
        if (currentTime - previousTime > skipTimeInMs || firstTime) {
            firstTime = false;
            postMessage({type: type, payload: payload});
            previousTime = currentTime;
        }
    }
    else {
        postMessage({type: type, payload: payload});
    }

    while (new Date().getTime() - currentTime < SLOWDOWN_FACTOR_MS) {}
};

export const notifySortDataShuffled = () => notify("shuffle", sortState.data);

export const notifySortUpdate = () => notify("sort", sortState.data, true, 16);

export const notifyPathFindUpdate = () => {
    notify("onPathFindUpdate", {
        "visited": pathFindingState.new_visited
    }, false, 1);
};

export const notifyObstacles = (data = pathFindingState.obstacles) => {
    notify("onObstacleDataReceived", { "obstacles": data }, false, 1);
};

export const onSortMethodExit = () => postMessage({type: "sortFinished", payload: {"sorted": !sortState.abort}});

export const onPathfindingFinished = () => {
    postMessage({
        type: "pathfindingFinished",
        payload: {
            "foundPath": pathFindingState.found_path && !pathFindingState.abort,
            "data": pathFindingState.data,
            "visited": pathFindingState.new_visited,
            "path": pathFindingState.path
        }
    });
};

export const getSortMethod = (algorithm) => sortAlgorithmMap[algorithm];

export const getPathfindingMethod = (algorithm) => pathfindingAlgorithmMap[algorithm];

export const shuffle = async (size, maxValue) => {
    sortState.data = new Array(size);

    for (let i = 0; i < size; i++) {
        sortState.data[i] = getRandomInt(1, maxValue);
    }
};

export const PromiseTimeout = delay => {
    return new Promise((resolve, reject) => setTimeout(resolve, delay));
};

export const CheckSortPause = async (delay = 0) => {
    await PromiseTimeout(delay);
    while (sortState.pause) {
        await PromiseTimeout(delay);
    }
};

export const CheckPathfindingPause = async (delay = 0) => {
    await PromiseTimeout(delay);
    while (pathFindingState.pause) {
        await PromiseTimeout(delay);
    }
};

export const getRandomInt = (min, max) => Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min) + 1)) + min;