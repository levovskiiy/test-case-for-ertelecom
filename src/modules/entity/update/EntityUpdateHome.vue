<script setup>
import { ref } from 'vue';
import ErDialog from '@/common/components/dialog/ErDialog.vue';
import ErInput from '@/common/components/input/ErInput.vue';
import ErButton from '@/common/components/button/ErButton.vue';

const dialog = ref();

const homeName = ref();

function open(home) {
    homeName.value = home;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Изменить номер дома" class="entity-update-home" ref="dialog">
        <ErInput
            v-model="homeName"
            name="area"
            label="Наименование дома"
            type="text"
        />

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(homeName)"
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
