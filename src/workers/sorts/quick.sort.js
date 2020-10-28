import {state, CheckPause, notifySort} from "workers/worker.utils.js";

function partition(left, right) {
    const pivot = state.data[Math.floor((right + left) / 2)];
    let //middle element
        i = left, //left pointer/**/
        j = right; //right pointer
    while (i <= j) {
        while (state.data[i] < pivot) {
            i++;
        }
        while (state.data[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(i, j); //swap two elements
            i++;
            j--;
        }
        notifySort();
    }
    return i;
}

function swap(leftIndex, rightIndex) {
    const temp = state.data[leftIndex];
    state.data[leftIndex] = state.data[rightIndex];
    state.data[rightIndex] = temp;
}

async function quickSortImpl(left, right) {
    await CheckPause();

    if (state.abort) {
        return;
    }

    let index;
    if (state.data.length > 1) {
        index = partition(left, right); //index returned from partition

        if (left < index - 1) { //more elements on the left side of the pivot
            await quickSortImpl(left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            await quickSortImpl(index, right);
        }
    }
}

export async function quickSort() {
    return quickSortImpl(0, state.data.length - 1);
}

