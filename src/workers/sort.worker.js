import {
    state,
    notify,
    shuffle,
    resetState,
    algorithmMap,
} from "workers/worker.utils.js";


const requestMap = {
    "sort": e => onSortRequest(e),
    "shuffle": e => onShuffleRequest(e),
    "pause": e => onPauseRequest(e),
    "stop": e => onAbortRequest(e)
};

function onSortRequest(e) {
    resetState();
    algorithmMap[e.data[1]]().then(() => {
        notify("sort");
        self.postMessage([state.abort ? "not_sorted" : "sorted", -1, -1])
    });
}

function onShuffleRequest(e) {
    resetState();
    let shuffleSize = e.data[1];
    let shuffleMaxValue = e.data[2];
    shuffle(shuffleSize, shuffleMaxValue).then(() => {
        notify("shuffle", state.data);
    });
}

function onPauseRequest() {
    state.pause = !state.pause;
}

function onAbortRequest() {
    state.abort = true;
}

function handleMessage(e) {
    requestMap[e.data[0]](e);
}

/* -------------- Main message handler ------------------ */
self.onmessage = handleMessage;
/* ------------------------------------------------------ */
