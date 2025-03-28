<script setup>
import { ErDialog } from '@/common/components';
import { ref } from 'vue';

const dialog = ref();

const titleDialog = ref('');
const messageDialog = ref('');

function open(title, message) {
    titleDialog.value = title;
    messageDialog.value = message;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog :title="titleDialog" ref="dialog">
        {{ messageDialog }}
    </ErDialog>
</template>