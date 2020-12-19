export const workers = [];

const register = (worker, handler) => {
    worker.onmessage = handler;
    workers.push(worker);
    return worker;
}

export const unregister = (worker) => {
    const registeredWorker = workers.find(w => w === worker);
    if (registeredWorker !== undefined) {
        registeredWorker.terminate();
        const index = workers.indexOf(worker);
        if (index > -1) {
            workers.splice(index, 1);
        }
    }
}

export const registerSortWorker = handler => register(new Worker(new URL('sort.worker.js', import.meta.url)), handler);

