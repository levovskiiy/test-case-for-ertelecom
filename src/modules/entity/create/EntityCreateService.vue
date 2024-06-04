<script setup>
import { ref } from 'vue';
import { ErButton, ErDialog, ErInput } from '@/common/components';

const address = ref({});
const dialog = ref();

const serviceName = ref();

function reset() {
    address.value = {};
    serviceName.value = '';
}

function open(value) {
    reset();

    console.log(value);
    address.value = value;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Добавить услугу" class="entity-create-service" ref="dialog">
        <div class="address">
            <ErInput
                :value="address.cities"
                disabled
                name="city"
                type="text"
                label="Город"
            />
            <ErInput
                :value="address.districts"
                disabled
                name="district"
                type="text"
                label="Район"
            />
            <ErInput
                :value="address.streets"
                disabled
                name="street"
                type="text"
                label="Улица"
            />
            <ErInput
                :value="address.houses"
                disabled
                name="house"
                type="text"
                label="Дом"
            />

            <ErInput
                :value="address.entrances"
                disabled
                name="entrances"
                type="text"
                label="Подъезд"
            />
        </div>

        <ErInput
            v-model="serviceName"
            name="service"
            type="text"
            label="Наименование услуги"
            class="service-name"
        />

        <template #footer="{ close, accept }">
            <ErButton
                type="button"
                size="large"
                @click="accept(serviceName)"
            >
                Создать
            </ErButton>
            <ErButton
                type="button"
                size="large"
                visual="text"
                @click="close()"
            >
                Закрыть
            </ErButton>
        </template>
    </ErDialog>
</template>

<style lang="scss">
.entity-create-service {
    width: 840px;
}
</style>

<style scoped lang="scss">
.entity-create-service {
    .address {
        display:               grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows:    repeat(2, 1fr);
        gap:                   12px;
        justify-content:       center;
    }

    .service-name {
        margin: 40px 0;
    }
}
</style>