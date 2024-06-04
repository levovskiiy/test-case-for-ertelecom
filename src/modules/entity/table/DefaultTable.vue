<script setup>
import { ErDataTable, ErDataTableColumn } from '@/common/components';

defineProps({
    dataSource: {
        type: Array,
        default: () => ([]),
    },
})
</script>

<template>
    <ErDataTable :data-source="dataSource" full-width>
        <ErDataTableColumn header="Наименование" field="name" />
        <ErDataTableColumn header="Полный адрес" field="full_address" />

        <template #footer>
            <tr>
                <td colspan="2">Найдено: {{ dataSource.length }}</td>
            </tr>
        </template>
    </ErDataTable>
</template>