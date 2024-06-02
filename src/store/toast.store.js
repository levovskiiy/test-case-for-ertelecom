import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useToastStore = defineStore('store/toast', () => {
    const toastStack = ref([]);
    const incrementalId = ref(0);

    function add(toast, type = 'info') {
        toastStack.value.push({
            id: incrementalId.value++,
            message: toast.text,
            life: toast.life || 2000,
            type: type,
        });
    }

    function remove(item) {
        const index = toastStack.value.findIndex(toast => toast.id === item.id);

        if (index >= 0) {
            toastStack.value.splice(index, 1);
        }
    }

    return {
        toastStack,
        add,
        remove,
    }
})