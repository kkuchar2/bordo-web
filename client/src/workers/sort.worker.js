const SLOWDOWN_FACTOR_MS = 16;

let oldTime = 0;

function notify_with_sleep(data, pos=1) {
    let currentTime = new Date().getTime();
    let diff = currentTime - oldTime;

    // notify no faster than 60fps
    if (diff > 0) {
        self.postMessage([data, pos]);
        oldTime = currentTime;
    }

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
                notify_with_sleep(arr, j + 1);
            }
        }
    }

    return [arr, -1];
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
        notify_with_sleep(arr, i);
    }
    return i;
}

function swap(arr, leftIndex, rightIndex){
    const temp = arr[leftIndex];
    arr[leftIndex] = arr[rightIndex];
    arr[rightIndex] = temp;
}

async function quickSort(arr, left, right) {
    let index;
    if (arr.length > 1) {
        index = partition(arr, left, right); //index returned from partition

        if (left < index - 1) { //more elements on the left side of the pivot
            await quickSort(arr, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            await quickSort(arr, index, right);
        }
    }

    return [arr, -1];
}

async function insertionSort(arr) {
    let length = arr.length;
    for (let i = 1; i < length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            notify_with_sleep(arr, j)
        }
        arr[j + 1] = key;
    }

    return [arr, -1];
}

self.onmessage = (e) => {
    let arr = e.data[0];
    oldTime = new Date().getTime();
    bubbleSort(arr).then(self.postMessage);
    //insertionSort(arr).then(self.postMessage);
    //quickSort(arr, 0, arr.length - 1).then(self.postMessage);
};

