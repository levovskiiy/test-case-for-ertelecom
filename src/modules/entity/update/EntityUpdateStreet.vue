<script setup>
import { ref } from 'vue';
import ErDialog from '@/common/components/dialog/ErDialog.vue';
import ErInput from '@/common/components/input/ErInput.vue';
import ErButton from '@/common/components/button/ErButton.vue';

const dialog = ref();

const streetName = ref();

function open(street) {
    streetName.value = street;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Изменить наименование улицы" class="entity-update-street" ref="dialog">
        <ErInput
            v-model="streetName"
            name="area"
            label="Наименование улицы"
            type="text"
        />

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(streetName)"
            >
                Добавить
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