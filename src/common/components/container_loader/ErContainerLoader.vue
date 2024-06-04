<script setup>
import ErLoader from '../loader/ErLoader.vue';

defineProps({
    loading: {
        type: Boolean,
        default: false,
    },
});
</script>

<template>
    <div class="container-loader">
        <slot />

        <div v-show="loading" class="loader-container">
            <ErLoader />
        </div>
    </div>
</template>

<style scoped lang="scss">
.container-loader {
    position: relative;
    height:   100%;

    .loader-container {
        position:        absolute;
        inset:           0;
        display:         flex;
        align-items:     center;
        justify-content: center;
        backdrop-filter: blur(10px);
    }
}
</style>