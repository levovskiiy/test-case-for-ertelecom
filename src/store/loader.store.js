import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useLoaderStore = defineStore('store/loader', () => {
    const canShow = ref(false);
    const requestId = ref(0);

    function waitRequest() {
        if (requestId.value === 0)
            canShow.value = true;

        requestId.value++;
    }

    function doneRequest() {
        if (requestId.value > 1) {
            requestId.value--;
        } else {
            canShow.value = false;
        }
    }

    return {
        canShow,
        waitRequest,
        doneRequest,
    }
})