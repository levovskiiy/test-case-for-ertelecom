<script setup>
import { ref } from 'vue';
import { ErButton, ErDialog, ErInput } from '@/common/components';

const dialog = ref();

const streetName = ref();
const homeName = ref();
const entraceName = ref();

function open(street, home) {
    entraceName.value = '';
    streetName.value = street;
    homeName.value = home;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Добавить подъезд" class="entity-create-entrance" ref="dialog">
        <div class="fields">
            <ErInput
                :model-value="streetName"
                name="street"
                label="Улица"
                type="text"
                disabled
            />
            <ErInput
                :model-value="homeName"
                name="area"
                label="Дом"
                type="text"
                disabled
            />
            <ErInput
                v-model="entraceName"
                name="area"
                label="Номер подъезда"
                type="text"
            />
        </div>

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(entraceName)"
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
.entity-create-entrance {
    .fields {
        display:   flex;
        flex-flow: column nowrap;
        gap:       10px;
    }
}
</style>
