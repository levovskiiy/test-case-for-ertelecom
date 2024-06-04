<script setup>
import { ref } from 'vue';
import ErDialog from '@/common/components/dialog/ErDialog.vue';
import ErInput from '@/common/components/input/ErInput.vue';
import ErButton from '@/common/components/button/ErButton.vue';

const dialog = ref();

const areaName = ref();

function open(area) {
    areaName.value = area;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Изменить наименование района" class="entity-update-area" ref="dialog">
        <ErInput
            v-model="areaName"
            name="area"
            label="Наименование района"
            type="text"
        />

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(areaName)"
            >
                Изменить
            </ErButton>
            <ErButton
                size="large"
                visual="text"
                @click="close"
            >
                Отмена
            </ErButton>
        </template>
    </ErDialog>
</template>