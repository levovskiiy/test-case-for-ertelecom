import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useEntityStore = defineStore('/store/entity', () => {
    const selected = ref();

    return {
        selected,
    }
})