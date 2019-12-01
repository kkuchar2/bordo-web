import config from 'config';

export const sortService = { shuffle, sort };

const resolves = {}
const rejects = {}
let globalMsgId = 0;


function sendMsg(payload, worker){
  const msgId = globalMsgId++
  const msg = {
    id: msgId,
    payload
  }
  return new Promise(function (resolve, reject) {
    // save callbacks for later
    resolves[msgId] = resolve
    rejects[msgId] = reject

    console.log("worker: " + worker);
    console.log("posting message");
    console.log(msg);

    worker.postMessage(msg)
  })
}

// Handle incoming calculation result
function handleMsg(msg) {
  const {id, err, payload} = msg.data
  if (payload) {
    const resolve = resolves[id]
    if (resolve) {
      resolve(payload)
    }
  } else {
    // error condition
    const reject = rejects[id]
    if (reject) {
        if (err) {
          reject(err)
        } else {
          reject('Got nothing')
        }
    }
  }

  // purge used callbacks
  delete resolves[id]
  delete rejects[id]
}

const worker = new Worker('./../workers/sort.worker', {type: 'module'});
worker.onmessage = handleMsg;

function shuffle() {
    console.log("[SortService] Shufling data");
    return sendMsg(["shuffle", 1000, 100], worker);
}

function sort() {
    console.log("Sort data");
    return 'sort_ret';
}
