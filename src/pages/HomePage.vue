<script setup>
import EntityTree from '@/modules/entity/tree/EntityTree.vue';
import { useEntityStore } from '@/modules/entity/model/entity.store.js';

const entityStore = useEntityStore();
</script>

<template>
    <div class="home-page">
        <div class="tree">
            <EntityTree />
        </div>
        <div class="table">
            <table class="result">
                <thead>
                <tr>
                    <th>{{ entityStore.selected }}</th>
                    <th>2</th>
                </tr>
                </thead>
            </table>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.home-page {
    display:     flex;
    flex-flow:   row wrap;
    align-items: center;
    height:      100%;

    .tree {
        width:  20%;
        height: 100%;
    }

    .table {
        margin-left: 15px;
        height:      100%;
        flex:        1;
        padding:     0 16px;
        border-left: 1px solid rgba(0, 0, 0, .1);

        .result {
            border-collapse: collapse;

            thead th {
                padding:        12px;
                height:         50px;
                text-align:     center;
                vertical-align: middle;
                background:     getCssVarValue(primary, color, bg);
            }
        }
    }
}
</style>
