import {state, CheckPause, notifyDataUpdate} from "js/workers/worker.utils.js";

const partition = (left, right) => {
    const pivot = state.data[Math.floor((right + left) / 2)];
    let // Middle element
        i = left, // Left pointer/**/
        j = right; // Right pointer
    while (i <= j) {
        while (state.data[i] < pivot) {
            i++;
        }
        while (state.data[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(i, j); // Swap two elements
            i++;
            j--;
        }
        notifyDataUpdate();
    }
    return i;
}

const swap = (leftIndex, rightIndex) => {
    const temp = state.data[leftIndex];
    state.data[leftIndex] = state.data[rightIndex];
    state.data[rightIndex] = temp;
}

const quickSortImpl = async (left, right) => {
    await CheckPause();

    if (state.abort) {
        return;
    }

    let index;
    if (state.data.length > 1) {
        index = partition(left, right); // Index returned from partition

        if (left < index - 1) { // More elements on the left side of the pivot
            await quickSortImpl(left, index - 1);
        }
        if (index < right) { // More elements on the right side of the pivot
            await quickSortImpl(index, right);
        }
    }
}

export const quickSort = async () => quickSortImpl(0, state.data.length - 1);

