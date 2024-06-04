<script setup>
import { Icon } from '@iconify/vue';

defineProps({
    title: {
        type: String,
        default: 'Ничего не найдено',
    },
});
</script>

<template>
    <div class="empty">
        <Icon icon="hugeicons:file-not-found" width="192" height="192" color="grey" />
        <span class="title">{{ title }}</span>
    </div>
</template>

<style scoped lang="scss">
.empty {
    display:     flex;
    flex-flow:   column nowrap;
    align-items: center;
    gap:         10px;
}
</style>