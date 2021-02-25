import {
    getPathfindingMethod, notifyObstacles, notifyDataInitForPath,
    onPathfindingFinished,
    pathFindingState,
} from "workers/worker.utils.js";

/* -------------- Main message handler ------------------ */

self.onmessage = message => {
    requestMap[message.data.type](message.data.payload);
};

/* ------------------------------------------------------ */

const requestMap = {
    "initData": e => initDataRequest(e),
    "clearBoard": e => clearBoardRequest(e),
    "findPath": e => onFindPathRequest(e),
    "selectCells": e => onCellsSelected(e),
    "setStart": e => setStart(e),
    "setEnd": e => setEnd(e)
};

const onCellsSelected = (m) => {
    pathFindingState.obstacles = [...pathFindingState.obstacles, ...m.indices];
    notifyObstacles(m.indices);
};

const setStart = (m) => pathFindingState.startIdx = m.id;

const setEnd = (m) => pathFindingState.endIdx = m.id;

const initDataRequest = m => {
    const cols = m.cols;
    const rows = m.rows;

    function Node(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.neighbors = [];
    }

    let grid = [];
    const size = cols * rows;

    for (let i = 0; i < size; i++) {

        const x = Math.round(i % cols);
        const y = Math.round(Math.floor(i / cols));

        let spot = new Node(i, x, y);

        if (x < cols - 1) {
            spot.neighbors.push(x + 1 + cols * y);
        }

        if (x > 0) {
            spot.neighbors.push(x - 1 + cols * y);
        }

        if (y < rows - 1) {
            spot.neighbors.push(x + cols * (y + 1));
        }

        if (y > 0) {
            spot.neighbors.push(x + cols * (y - 1));
        }

        grid[i] = spot;
    }

    pathFindingState.startIdx = m.startIndex;
    pathFindingState.endIdx = m.endIndex;
    pathFindingState.data = grid;

    console.log(pathFindingState);

    notifyDataInitForPath();
};

const clearBoardRequest = m => {
    pathFindingState.obstacles = [];
    notifyObstacles();
};

const onFindPathRequest = message_data => getPathfindingMethod(message_data.algorithm)().then(onPathfindingFinished);

const onPauseRequest = () => pathFindingState.pause = !pathFindingState.pause;
const onAbortRequest = () => pathFindingState.abort = true;