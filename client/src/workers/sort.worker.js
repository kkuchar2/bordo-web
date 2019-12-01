const SLOWDOWN_FACTOR_MS = 1;

let oldTime = 0;

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    let value = Math.floor(Math.random() * (max - min + 1)) + min;
    return value;
}


function shuffle(size, maxValue) {
    let values = new Array(size);

    for (let i = 0; i < size; i++) {
        values[i] = getRandomInt(1, maxValue);
        notify("shuffle", values, i + 1);
    }
}

function notify(type, data, pos=1) {
    let currentTime = new Date().getTime();
    let diff = currentTime - oldTime;

    // notify no faster than 60fps
    self.postMessage([type, data, pos]);
    oldTime = currentTime;

    // sleep 1ms
    while(new Date().getTime() - currentTime < SLOWDOWN_FACTOR_MS) {}
}

async function bubbleSort(arr) {
    let len = arr.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                notify("sort", arr, j + 1);
            }
        }
    }

    return ["sort", arr, -1];
}

function partition(arr, left, right) {
    const pivot = arr[Math.floor((right + left) / 2)];
    let //middle element
        i = left, //left pointer
        j = right; //right pointer
    while (i <= j) {
        while (arr[i] < pivot) {
            i++;
        }
        while (arr[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(arr, i, j); //swap two elements
            i++;
            j--;
        }
        notify("sort", arr, i);
    }
    return i;
}

function swap(arr, leftIndex, rightIndex){
    const temp = arr[leftIndex];
    arr[leftIndex] = arr[rightIndex];
    arr[rightIndex] = temp;
}

async function quickSortImpl(arr, left, right) {
    let index;
    if (arr.length > 1) {
        index = partition(arr, left, right); //index returned from partition

        if (left < index - 1) { //more elements on the left side of the pivot
            await quickSortImpl(arr, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            await quickSortImpl(arr, index, right);
        }
    }

    return ["sort", arr, 0];
}

async function quickSort(arr) {
    return quickSortImpl(arr, 0, arr.length - 1);
}

async function insertionSort(arr) {
    let length = arr.length;
    for (let i = 1; i < length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            notify("sort", arr, j)
        }
        arr[j + 1] = key;
    }

    return ["sort", arr, -1];
}


const algorithmMap = {
    0: arr => quickSort(arr),
    1: arr => bubbleSort(arr),
    2: arr => insertionSort(arr),
};

self.onmessage = (e) => {
    let payload = e.data;
    let operationType = payload[0];

    if (operationType === "sort") {
        let sortType = e.data[1];
        let dataToSort = e.data[2];
        oldTime = new Date().getTime();
        algorithmMap[sortType](dataToSort).then(self.postMessage);
    }
    else if (operationType === "shuffle") {
        let shuffleSize = e.data[1];
        let shuffleMaxValue = e.data[2];
        shuffle(shuffleSize, shuffleMaxValue);
    }
};
