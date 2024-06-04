<script setup>
import { ref } from 'vue';
import { ErDialog, ErInput, ErButton } from '@/common/components';

const dialog = ref();

const cityName = ref();
const areaName = ref();

function open(city) {
    areaName.value = '';
    cityName.value = city;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Добавить район" class="entity-create-area" ref="dialog">
        <div class="fields">
            <ErInput
                :model-value="cityName"
                name="city"
                label="Город"
                type="text"
                disabled
            />
            <ErInput
                v-model="areaName"
                name="area"
                label="Наименование района"
                type="text"
            />
        </div>

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(areaName)"
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