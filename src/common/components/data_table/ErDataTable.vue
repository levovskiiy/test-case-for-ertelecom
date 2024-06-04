<script setup>
import { getCurrentInstance, provide, ref } from 'vue';

defineProps({
    dataSource: {
        type: Array,
        default: () => ([]),
    },
    fullWidth: {
        type: Boolean,
        default: false,
    },
});

const emit = defineEmits([ 'body-contextmenu', 'row-contextmenu' ]);

const $columns = ref(new Set());

provide('$columns', $columns);

function getFieldData(field, row) {
    if (typeof field === 'string')
        return row[field];

    return field(row);
}

const instance = getCurrentInstance();

function handleBodyContextMenu(ev) {
    if (instance.vnode.props['onBodyContextmenu']) {
        ev.stopPropagation();
        ev.preventDefault();
        emit('body-contextmenu', ev);
    }
}

function handleRowContextMenu(data, ev) {
    if (instance.vnode.props['onRowContextmenu']) {
        ev.stopPropagation();
        ev.preventDefault();
        emit('row-contextmenu', ev, data);
    }
}

</script>

<template>
    <div class="data-table" :class="{ fullwidth: fullWidth }">
        <slot></slot>
        <table class="table-content">
            <thead class="header">
            <tr>
                <th v-for="(column, id) in $columns" :key="id">
                    <div class="content">{{ column.props.header }}</div>
                </th>
            </tr>
            </thead>
            <tbody class="body" @contextmenu="handleBodyContextMenu">
            <tr
                v-for="data in dataSource" :key="data.fieldId"
                @contextmenu="handleRowContextMenu(data, $event)"
            >
                <td v-for="(column, colId) in $columns" :key="data.fieldId + '_' + colId">
                    <div class="content">{{ getFieldData(column.props.field, data) }}</div>
                </td>
            </tr>
            <tr class="empty-rows">
                <td :colspan="$columns.size">
                    <slot name="empty-rows">
                    </slot>
                </td>
            </tr>
            </tbody>
            <tfoot class="footer">
            <slot name="footer"></slot>
            </tfoot>
        </table>
    </div>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.data-table {
    overflow-y: auto;
    position:   relative;

    &.fullwidth {
        width: 100%;
    }

    .table-content {
        width:           100%;
        height:          100%;
        border-collapse: collapse;
        border-spacing:  0;

        tr th,
        tr td {
            padding:        20px;
            vertical-align: top;
            text-align:     left;
        }

        .header {
            position: sticky;
            top:      0;

            tr {
                background: getCssVarValue(gamma, light, 3);

                th:first-child {
                    border-top-left-radius: 6px;
                }

                th:last-child {
                    border-top-right-radius: 6px;
                }
            }

            th {
                border-right: 1px solid getCssVarValue(gamma, light, 2);
            }
        }

        .body {
            height: calc(100% - 72px);

            tr {
                transition:    0.125s;
                border-bottom: 1px solid getCssVarValue(gamma, light, 2);

                &:not(.empty-rows):hover {
                    background: getCssVarValue(primary, light, 9);
                }
            }

            & > .empty-rows {
                height:  100%;

                td {
                    padding: 0;
                }
            }
        }

        :deep(.footer) {
            position: sticky;
            bottom:   0;

            tr {
                background: getCssVarValue(gamma, light, 3);

                td {
                    padding:                    20px;
                    border-bottom-left-radius:  12px;
                    border-bottom-right-radius: 12px;
                }
            }
        }

    }
}
</style>