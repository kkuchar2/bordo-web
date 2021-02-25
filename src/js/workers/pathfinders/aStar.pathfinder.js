import {CheckPathfindingPause, notifyPathFindUpdate, pathFindingState} from "workers/worker.utils.js";

const removeFromArray = (arr, v) => {
    for (let i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === v) {
            arr.splice(i, 1);
            return;
        }
    }
};

const dist = (x1, y1, x2, y2) => Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));

const euclideanHeuristics = (start, end) => dist(start.x, start.y, end.x, end.y);

const manhattanHeuristics = (start, end) => Math.abs(start.x - end.x) + Math.abs(start.y - end.y);

const h = (start, end) => manhattanHeuristics(start, end);

const reconstruct_path = (cameFrom, current) => {
    let total_path = [current];

    while (true) {
        const previous_node = cameFrom[current];
        if (previous_node === undefined) {
            break;
        }

        current = previous_node;
        total_path.unshift(current);
    }
    return total_path;
};

let previousTime = new Date().getTime();
let firstTime = true;

export const AStarPathfinder = async () => {

    let data = pathFindingState.data;
    let size = data.length;

    let start = data[pathFindingState.startIdx];
    let goal = data[pathFindingState.endIdx];

    pathFindingState.path = [];
    pathFindingState.all_visited = [];
    pathFindingState.to_visit = [start.id];

    let cameFrom = {};

    let gScore = {};
    for (let i = 0; i < size; i++) {
        gScore[data[i].id] = Infinity;
    }
    gScore[start.id] = 0;

    let fScore = {};
    for (let i = 0; i < size; i++) {
        fScore[data[i].id] = Infinity;
    }
    fScore[start.id] = h(start, goal);

    let path = null;

    let cnt = 0;

    while (pathFindingState.to_visit.length > 0) {

        await CheckPathfindingPause();

        while (new Date().getTime() - previousTime < 16) {}

        previousTime = new Date().getTime();

        cnt++;
        let winnerIndex = 0;

        for (let i = 0; i < pathFindingState.to_visit.length; i++) {
            const element = fScore[pathFindingState.to_visit[i]];
            if (element === undefined) {
                continue;
            }
            if (element < fScore[pathFindingState.to_visit[winnerIndex]]) {
                winnerIndex = i;
            }
        }
        let currentId = pathFindingState.to_visit[winnerIndex];
        let current = null;

        for (let i = 0; i < size; i++) {
            if (data[i].id === currentId) {
                current = data[i];
                break;
            }
        }

        if (current === goal) {
            path = reconstruct_path(cameFrom, current.id);
            break;
        }

        removeFromArray(pathFindingState.to_visit, current.id);

        pathFindingState.new_visited = current.id;
        notifyPathFindUpdate();

        pathFindingState.all_visited.push(current.id);

        const neighbors = current.neighbors;
        const neighborsSize = neighbors.length;

        for (let i = 0; i < neighborsSize; i++) {
            const neighbor = data[neighbors[i]];

            if (pathFindingState.all_visited.includes(neighbor.id)) {
                continue;
            }

            const tentative_gScore = gScore[current.id] + 1;
            let gScoreIsBest = false;

            if (!pathFindingState.to_visit.includes(neighbor.id) && !pathFindingState.obstacles.includes(neighbor.id)) {
                gScoreIsBest = true;
                fScore[neighbor.id] = h(neighbor, goal);
                pathFindingState.to_visit.push(neighbor.id);
            }
            else if (tentative_gScore < gScore[neighbor.id]) {
                gScoreIsBest = true;
            }

            if (gScoreIsBest) {
                cameFrom[neighbor.id] = current.id;
                gScore[neighbor.id] = tentative_gScore;
                fScore[neighbor.id] = gScore[neighbor.id] + h(neighbor, goal);
            }
        }
    }

    if (path !== null) {
        for (let i = 0; i < size; i++) {
                if (path.includes(data[i].id)) {
                pathFindingState.path.push(i);
            }
        }
        notifyPathFindUpdate();
    }
    console.log("Finished AStarPathfinder");
};