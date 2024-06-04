<script setup>
import { ref } from 'vue';
import { ErButton, ErDialog, ErInput } from '@/common/components';

const dialog = ref();

const cityName = ref();

function open() {
    cityName.value = '';
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Добавить город" class="entity-create-city" ref="dialog">
        <div class="fields">
            <ErInput
                v-model="cityName"
                name="area"
                label="Наименование города"
                type="text"
            />
        </div>

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(cityName)"
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
.entity-create-city {
    .fields {
        display:   flex;
        flex-flow: column nowrap;
        gap:       10px;
    }
}
</style>
