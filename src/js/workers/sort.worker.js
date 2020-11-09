import {
    state,
    shuffle,
    resetState,
    notifyDataShuffled,
    onSortMethodExit,
    getSortMethod,
} from "js/workers/worker.utils.js";

/* -------------- Main message handler ------------------ */

self.onmessage = handleMessage;

/* ------------------------------------------------------ */

function handleMessage(message) {
    requestMap[message.data.type](message.data.payload);
}

const requestMap = {
    "sort": e => onSortRequest(e),
    "shuffle": e => onShuffleRequest(e),
    "pause": e => onPauseRequest(e),
    "stop": e => onAbortRequest(e)
};

function onSortRequest(message_data) {
    resetState();
    getSortMethod(message_data.algorithm_type)().then(onSortMethodExit);
}

function onShuffleRequest(message_data) {
    resetState();
    shuffle(message_data.sampleCount, message_data.maxValue).then(notifyDataShuffled);
}

function onPauseRequest() {
    state.pause = !state.pause;
}

function onAbortRequest() {
    state.abort = true;
}