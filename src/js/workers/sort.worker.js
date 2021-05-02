import {
    getSortMethod,
    notifySortDataShuffled,
    onSortMethodExit,
    resetState, setSlowdownFactor,
    shuffle,
    sortState,
} from "workers/worker.utils.js";

/* -------------- Main message handler ------------------ */

self.onmessage = message => requestMap[message.data.type](message.data.payload);

/* ------------------------------------------------------ */

const requestMap = {
    "sort": e => onSortRequest(e),
    "shuffle": e => onShuffleRequest(e),
    "pause": e => onPauseRequest(e),
    "stop": e => onAbortRequest(e),
    "setSlowdownFactor" : e => setSlowdownFactor(e)
};

const onSortRequest = message_data => {
    resetState();
    getSortMethod(message_data.algorithm)().then(onSortMethodExit);
};

const onShuffleRequest = message_data => {
    resetState();
    shuffle(message_data.sampleCount, message_data.maxValue).then(notifySortDataShuffled);
};

const onPauseRequest = () => sortState.pause = !sortState.pause;
const onAbortRequest = () => sortState.abort = true;