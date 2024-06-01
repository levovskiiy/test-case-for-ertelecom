import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useToastStore = defineStore('store/toast', () => {
    const toastStack = ref([]);
    const incrementalId = ref(0);

    function add(toast) {
        console.log(incrementalId.value);
        toastStack.value.push({
            id: incrementalId.value++,
            message: toast.message.text,
            life: toast.message.life || 2000,
            type: toast.type,
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