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
    <ErDialog title="Изменить наименование улицы" class="entity-create-area" ref="dialog">
        <div class="fields">
            <ErInput
                v-model="streetName"
                name="area"
                label="Наименование улицы"
                type="text"
            />
        </div>

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

<style lang="scss" scoped>
.entity-create-area {
    .fields {
        display:   flex;
        flex-flow: column nowrap;
        gap:       10px;
    }
}
</style>
