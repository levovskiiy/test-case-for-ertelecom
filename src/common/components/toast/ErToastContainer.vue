<script setup>
import ErToast from './ErToast.vue';

import { useToastStore } from '@/store/toast.store.js';

const toastStore = useToastStore();
</script>

<template>
    <div class="toast-container">
        <TransitionGroup tag="div" name="list" class="message">
            <ErToast
                v-for="(toast, index) in toastStore.toastStack" :key="toast.id + '_' + index"
                :message="toast.message"
                :life="toast.life"
                :type="toast.type"
                @end-life="toastStore.remove(toast)"
            />
        </TransitionGroup>
    </div>
</template>

<style scoped lang="scss">
.toast-container {
    position:   fixed;
    top:        20px;
    right:      20px;
    z-index:    1111;
    box-sizing: border-box;
}

.list-move,
.list-enter-active,
.list-leave-active {
    transition: all 0.2s ease;
}

.list-enter-from,
.list-leave-to {
    opacity:   0;
    transform: translateY(-90px);
}

.list-leave-active {
    position: absolute;
}

</style>