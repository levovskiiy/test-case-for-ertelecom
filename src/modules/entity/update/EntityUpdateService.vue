<script setup>
import ErDialog from '@/common/components/dialog/ErDialog.vue';
import { ref } from 'vue';
import ErInput from '@/common/components/input/ErInput.vue';
import ErButton from '@/common/components/button/ErButton.vue';
import ErSearchableSelect from '@/common/components/searchable_select/ErSearchableSelect.vue';
import { loadEntities } from '@/api/entity.js';

const dialog = ref();

const addressMap = ref({
    cities: '',
    districts: '',
    streets: '',
    houses: '',
    entrances: '',
});

const serviceName = ref('');

function reset() {
    addressMap.value = {
        cities: '',
        districts: '',
        streets: '',
        houses: '',
        entrances: '',
    };

    serviceName.value = '';
}


async function open(service, address) {
    reset();

    serviceName.value = service;
    addressMap.value = {... address };
    return dialog.value.open();
}

function accept() {
    return dialog.value.accept({
        name: serviceName.value,
        address: addressMap.value,
    });
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Изменить услугу" class="entity-update-service" ref="dialog">

        <div class="address">
            <ErSearchableSelect
                v-model="addressMap.cities"
                :do-search="() => loadEntities('cities')"
                label="Город"
                to-item="name"
                to-key="name"
            />
            <ErSearchableSelect
                v-model="addressMap.districts"
                :do-search="() => loadEntities('districts')"
                label="Район"
                to-item="name"
                to-key="name"
            />
            <ErSearchableSelect
                v-model="addressMap.streets"
                :do-search="() => loadEntities('streets')"
                label="Улица"
                to-item="name"
                to-key="name"
            />
            <ErSearchableSelect
                v-model="addressMap.houses"
                :do-search="() => loadEntities('houses')"
                label="Дом"
                to-item="name"
                to-key="name"
            />
            <ErSearchableSelect
                v-model="addressMap.entrances"
                :do-search="() => loadEntities('entrances')"
                label="Подъезд"
                to-item="name"
                to-key="name"
            />

        </div>

        <ErInput
            v-model="serviceName"
            name="city"
            type="text"
            label="Город"
            class="service-name"
        />

        <template #footer="{ close }">
            <ErButton
                type="button"
                size="large"
                @click="accept"
            >
                Изменить
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
.entity-update-service {
    width: 840px;
}
</style>

<style lang="scss" scoped>
.entity-update-service {
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