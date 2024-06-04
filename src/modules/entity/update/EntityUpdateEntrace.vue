<script setup>
import { ref } from 'vue';
import ErDialog from '@/common/components/dialog/ErDialog.vue';
import ErInput from '@/common/components/input/ErInput.vue';
import ErButton from '@/common/components/button/ErButton.vue';

const dialog = ref();

const entranceName = ref();

function open(entrance) {
    entranceName.value = entrance;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Изменить номер подъезда" class="entity-update-entrance" ref="dialog">
        <ErInput
            v-model="entranceName"
            name="area"
            label="Номер подъезда"
            type="text"
        />

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(entranceName)"
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
