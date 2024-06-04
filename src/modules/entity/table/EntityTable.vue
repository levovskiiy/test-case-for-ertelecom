<script setup>
import { ref, toRef } from 'vue';

import EntityTableEntrace from '@/modules/entity/table/EntityTableEntrace.vue';
import DefaultTable from '@/modules/entity/table/DefaultTable.vue';

import { ErButton, ErContainerLoader, ErEmpty, ErContextMenu } from '@/common/components';
import { useEntityTable } from '@/modules/entity/model/useEntityTable.js';
import { computeAddressStringFromMap } from '@/modules/entity/common/utils.js';

import { EntityCreateService } from '@/modules/entity/create';
import { EntityUpdateService } from '@/modules/entity/update';
import { removeEntity, updateEntity } from '@/api/entity.js';
import ErConfirmDialog from '@/common/components/confirm_dialog/ErConfirmDialog.vue';

const props = defineProps({
    selectedNode: {
        type: Object,
        required: true,
    },
});

const {
    tableInfo,
    loading,
    addressMap,
    loadServices,
    addService,
    selectedType,
    notFound,
} = useEntityTable(toRef(() => props.selectedNode));


const createService = ref();
const updateService = ref();


async function openUpdateServiceDialog(data) {
    const result = await updateService.value.open(data.name, addressMap.value);

    if (!result)
        return;

    await updateEntity('services', data.id, {
        ...result.address,
        name: result.name,
        full_address: computeAddressStringFromMap(result.address),
    });

    await loadServices();
}

async function openCreateServiceDialog() {
    const result = await createService.value.open(addressMap.value);
    if (!result)
        return;


    await addService(result);
}


const contextActions = ref([]);
const contextMenu = ref();

function handleContextMenu(event) {
    contextActions.value = [
        {
            title: 'Добавить строку',
            keyboardKey: 'A',
            handler: async () => {
                await openCreateServiceDialog();
            },
        },
    ];

    contextMenu.value.open(event, null);
}

const removeConfirm = ref();

function handleRowContextMenu(ev, data) {
    contextActions.value = [
        {
            title: 'Удалить строку',
            keyboardKey: 'A',
            handler: async (data) => {
                const accept = await removeConfirm.value.open(
                    'Вы уверены что хотите удалить услугу?',
                    'Это необратимое действие',
                );

                if (!accept)
                    return;

                await removeEntity('services', data.id);
                await loadServices();
            },
        },
        {
            title: 'Изменить строку',
            keyboardKey: 'C',
            handler: async (data) => {
                await openUpdateServiceDialog(data);
            },
        },
    ];

    contextMenu.value.open(ev, data);
}
</script>

<template>
    <ErContainerLoader class="entity-table" :class="{ 'not-found': notFound }" :loading="loading">
        <ErEmpty
            v-if="!selectedNode"
            title="Для начала работы выберите элемент в дереве"
        />
        <div v-else-if="tableInfo.length === 0" class="not-added-services">
            <ErEmpty
                title="По данному адресу/адресам не добавлены услуги"
            />
            <ErButton
                v-if="selectedType === 'entrances'"
                size="large"
                @click="openCreateServiceDialog"
            >
                Добавить
            </ErButton>
        </div>

        <template v-if="!notFound">
            <EntityTableEntrace
                v-if="selectedType === 'entrances'"
                :data-source="tableInfo"
                @row-contextmenu="handleRowContextMenu"
                @body-contextmenu="handleContextMenu"
                @add-row="openCreateServiceDialog"
                class="table"
            />
            <DefaultTable
                v-else
                :data-source="tableInfo"
                class="table"
            />
        </template>
    </ErContainerLoader>

    <ErContextMenu ref="contextMenu" :actions="contextActions" />
    <EntityCreateService ref="createService" />
    <EntityUpdateService ref="updateService" />
    <ErConfirmDialog ref="removeConfirm" />
</template>

<style scoped lang="scss">
.entity-table {
    flex:        auto;
    display:     flex;
    flex-flow:   column nowrap;
    align-items: center;
    height:      100%;
    padding:     0 16px;
    border-left: 1px solid rgba(0, 0, 0, .1);

    &.not-found {
        justify-content: center;
    }

    .not-added-services {
        display:   flex;
        flex-flow: column nowrap;
        gap:       12px;
    }

    .table {
        height: 100%;
    }
}
</style>