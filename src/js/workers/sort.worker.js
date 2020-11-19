import {
    state,
    shuffle,
    resetState,
    notifyDataShuffled,
    onSortMethodExit,
    getSortMethod,
} from "js/workers/worker.utils.js";

/* -------------- Main message handler ------------------ */

self.onmessage = message => requestMap[message.data.type](message.data.payload);

/* ------------------------------------------------------ */

const requestMap = {
    "sort": e => onSortRequest(e),
    "shuffle": e => onShuffleRequest(e),
    "pause": e => onPauseRequest(e),
    "stop": e => onAbortRequest(e)
};

const onSortRequest = message_data => {
    resetState();
    getSortMethod(message_data.algorithm_type)().then(onSortMethodExit);
}

const onShuffleRequest = message_data => {
    resetState();
    shuffle(message_data.sampleCount, message_data.maxValue).then(notifyDataShuffled);
}

const onPauseRequest = () => state.pause = !state.pause;
const onAbortRequest = () => state.abort = true;