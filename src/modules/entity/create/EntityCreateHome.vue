<script setup>
import { ref } from 'vue';
import { ErButton, ErDialog, ErInput } from '@/common/components';

const dialog = ref();

const areaName = ref();
const streetName = ref();
const homeName = ref();

function open(area, street) {
    homeName.value = '';
    areaName.value = area;
    streetName.value = street;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Добавить дом" class="entity-create-home" ref="dialog">
        <div class="fields">
            <ErInput
                :model-value="areaName"
                name="area"
                label="Район"
                type="text"
                disabled
            />
            <ErInput
                v-model="streetName"
                name="area"
                label="Наименование улицы"
                type="text"
                disabled
            />
            <ErInput
                v-model="homeName"
                name="area"
                label="Наименование дома"
                type="text"
            />
        </div>

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(homeName)"
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
.entity-create-home {
    .fields {
        display:   flex;
        flex-flow: column nowrap;
        gap:       10px;
    }
}
</style>
