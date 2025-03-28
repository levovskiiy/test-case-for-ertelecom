<script setup>
import { ref } from 'vue';
import ErDialog from '@/common/components/dialog/ErDialog.vue';
import ErInput from '@/common/components/input/ErInput.vue';
import ErButton from '@/common/components/button/ErButton.vue';

const dialog = ref();

const cityName = ref();


function open(city) {
    cityName.value = city;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Изменть наименование города" class="entity-update-city" ref="dialog">
        <ErInput
            v-model="cityName"
            name="area"
            label="Наименование города"
            type="text"
        />

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(cityName)"
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