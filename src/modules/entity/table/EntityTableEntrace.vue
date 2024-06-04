<script setup>
import DataTable from '@/common/components/data_table/ErDataTable.vue';
import DataTableColumn from '@/common/components/data_table/ErDataTableColumn.vue';
import ErButton from '@/common/components/button/ErButton.vue';
import { Icon } from '@iconify/vue';

defineProps({
    dataSource: {
        type: Array,
        default: () => [],
    },
})

defineEmits(['add-row']);
</script>

<template>
    <DataTable :data-source="dataSource" full-width class="entrance-table">
        <DataTableColumn header="Наименование услуги" field="name" />
        <DataTableColumn header="Город" field="cities"/>
        <DataTableColumn header="Полный адрес" field="full_address"/>

        <template #empty-rows>
            <ErButton class="action" visual="text" @click="$emit('add-row')">
                <Icon icon="tabler:plus" width="24" height="24" />
            </ErButton>
        </template>

        <template #footer>
            <tr>
                <td colspan="3">Найдено: {{ dataSource.length }}</td>
            </tr>
        </template>
    </DataTable>
</template>

<style lang="scss" scoped>
.entrance-table {
    position: relative;

    .action-row {
        background: transparent;
    }

    .action {
        width: 100%;
    }
}
</style>