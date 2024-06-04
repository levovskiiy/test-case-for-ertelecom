<script setup>
import EntityTree from '@/modules/entity/tree/EntityTree.vue';
import EntityTable from '@/modules/entity/table/EntityTable.vue';
import { ref } from 'vue';

const selected = ref(null);
</script>

<template>
    <div class="home-page">
        <EntityTree
            v-model="selected"
            class="tree"
        />
        <EntityTable
            :selected-node="selected"
        />
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
        width:         20%;
        height:        100%;
        padding-right: 20px;
    }
}
</style>
