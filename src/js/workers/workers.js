export const workers = [];

const registerWorker = (worker, handler) => {
    worker.onmessage = handler;
    workers.push(worker);
    return worker;
};

export const unregisterWorker = (worker) => {
    const registeredWorker = workers.find(w => w === worker);
    if (registeredWorker !== undefined) {
        registeredWorker.terminate();
        const index = workers.indexOf(worker);
        if (index > -1) {
            workers.splice(index, 1);
        }
    }
};

export const sendMessage = (worker, messageType, payload = []) => {
    worker.postMessage({ type: messageType, payload: payload });
};

export const registerSortWorker = handler => registerWorker(new Worker(new URL('sort.worker.js', import.meta.url)), handler);
export const registerPathfindingWorker = handler => registerWorker(new Worker(new URL('pathfinding.worker.js', import.meta.url)), handler);
