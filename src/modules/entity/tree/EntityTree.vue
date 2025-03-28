<script setup>
import { computed, ref } from 'vue';

import { ErButton, ErTreeView, ErContextMenu } from '@/common/components';
import { CONTEXT_NODE_MAP } from '@/modules/entity/common/entity.context.js';
import { addEntity, loadEntities, loadEntitiesWithParentId } from '@/api/entity.js';
import {
    EntityCreateArea,
    EntityCreateCity,
    EntityCreateEntrace,
    EntityCreateHome,
    EntityCreateStreet,
} from '@/modules/entity/create/index.js';
import {
    EntityUpdateArea,
    EntityUpdateEntrace,
    EntityUpdateHome,
    EntityUpdateStreet,
    EntityUpdateCity,
} from '@/modules/entity/update/index.js';

const createCity = ref();
const createDistrict = ref();
const createStreet = ref();
const createHome = ref();
const createEntrance = ref();

const updateCity = ref();
const updateDistrict = ref();
const updateStreet = ref();
const updateHome = ref();
const updateEntrance = ref();

const reqtMap = {
    cities: 'districts',
    districts: 'streets',
    streets: 'houses',
    houses: 'entrances',
};

async function lazyLoad(node, resolve) {
    if (node.level === 0) {
        const result = await loadEntities('cities');

        resolve(result);
        return;
    }

    const { data } = node;
    const reqt = reqtMap[data.type];

    if (!reqt) {
        resolve([]);
        return;
    }

    const result = await loadEntitiesWithParentId(reqt, data.id);

    resolve(result);
}

const contextMenu = ref();
const contextMenuActions = ref([]);

function onTreeNodeContextMenu({ event, node }) {
    contextMenuActions.value = CONTEXT_NODE_MAP[node.data.type];

    contextMenu.value?.open(event, {
        node,
        createCity,
        createStreet,
        createEntrance,
        createDistrict,
        createHome,
        updateEntrance,
        updateStreet,
        updateDistrict,
        updateHome,
        updateCity,
    });
}

const treeRef = ref();

async function addCity() {
    const result = await createCity.value.open();
    if (!result)
        return;

    const data = await addEntity('cities', result);

    const item = data[0];
    treeRef.value.root.insertChild({ data: item });
}

function onTreeRootContextMenu(event) {
    contextMenuActions.value = [
        {
            title: 'Добавить',
            handler: addCity,
        },
    ];

    contextMenu.value?.open(event, null);
}

const nodeOptions = {
    children: 'children',
    label: 'name',
    nodeId: 'id',
};

const selected = defineModel({});

function onNodeClick({ node }) {
    selected.value = node;
}

const isEmpty = computed(() => treeRef.value?.root?.children.length === 0);
</script>

<template>
    <div class="entity-tree" @contextmenu.prevent.self="onTreeRootContextMenu">
        <ErButton v-if="isEmpty" @click="addCity">Добавить город</ErButton>
        <ErTreeView
            ref="treeRef"
            lazy
            :node-options="nodeOptions"
            :lazy-fn="lazyLoad"
            @contextmenu="onTreeNodeContextMenu"
            @node-click="onNodeClick"
        />

        <ErContextMenu ref="contextMenu" :actions="contextMenuActions" />
        <EntityCreateCity
            ref="createCity"
        />
        <EntityCreateArea
            ref="createDistrict"
        />
        <EntityCreateStreet
            ref="createStreet"
        />
        <EntityCreateHome
            ref="createHome"
        />
        <EntityCreateEntrace
            ref="createEntrance"
        />

        <EntityUpdateCity
            ref="updateCity"
        />
        <EntityUpdateArea
            ref="updateDistrict"
        />
        <EntityUpdateStreet
            ref="updateStreet"
        />
        <EntityUpdateHome
            ref="updateHome"
        />
        <EntityUpdateEntrace
            ref="updateEntrance"
        />
    </div>
</template>

<style lang="scss" scoped>
.entity-tree {
    height: 100%;
}
</style>