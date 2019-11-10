const SLOWDOWN_FACTOR_MS = 0;

function sleep() {
    let time1 = new Date().getTime();

    while(new Date().getTime() - time1 < 1) {

    }
}

async function bubbleSort(emitter, arr) {
    let len = arr.length;

    for (let i = 0; i < len; i++) {
        for (let j = 0; j < len; j++) {
            if (arr[j] > arr[j + 1]) {
                let tmp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
                notify(self, arr);

                await sleep();
            }
        }
    }
}

function partition(emitter, items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(emitter, items, i, j); //swap two elements
            i++;
            j--;
        }
        sleep();
        notify(emitter, items);
    }
    return i;
}

function swap(emitter, items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}

async function quickSort(emitter, items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(emitter, items, left, right); //index returned from partition

        if (left < index - 1) { //more elements on the left side of the pivot
            await quickSort(emitter, items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            await quickSort(emitter, items, index, right);
        }
    }
    return items;
}

async function insertionSort(emitter, arr) {
    let length = arr.length;
    for (let i = 1; i < length; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            notify(self, arr);
            //await sleep();

            let time1 = new Date().getTime();

            while(new Date().getTime() - time1 < 1) {

            }

        }
        arr[j + 1] = key;
        notify(self, arr);
    }
}

function notify(emitter, message) {
    emitter.postMessage(message);
}

self.onmessage = (e) => {
    let arr = e.data[0];
    //bubbleSort(self, arr);
    //insertionSort(self, arr);
    quickSort(self, arr, 0, arr.length - 1);
};

