<script setup>
import TreeView from '@/common/components/tree_view/TreeView.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { request, server } from '@/api/base.js';
import { useEntityStore } from '@/modules/entity/model/entity.store.js';
import ContextMenu from '@/common/components/context_menu/ContextMenu.vue';

import EntityCreateCity from '@/modules/entity/create/EntityCreateCity.vue';
import EntityCreateArea from '@/modules/entity/create/EntityCreateArea.vue';
import EntityCreateStreet from '@/modules/entity/create/EntityCreateStreet.vue';
import EntityCreateHome from '@/modules/entity/create/EntityCreateHome.vue';
import EntityCreateEntrace from '@/modules/entity/create/EntityCreateEntrace.vue';
import EntityUpdateCity from '@/modules/entity/update/EntityUpdateCity.vue';
import EntityUpdateArea from '@/modules/entity/update/EntityUpdateArea.vue';
import EntityUpdateStreet from '@/modules/entity/update/EntityUpdateStreet.vue';
import EntityUpdateHome from '@/modules/entity/update/EntityUpdateHome.vue';
import EntityUpdateEntrace from '@/modules/entity/update/EntityUpdateEntrace.vue';

const ICON_MAP = {
    city: 'mdi:city',
    streets: 'healthicons:city',
    homes: 'mdi:home',
    entraces: 'mdi:door',
};


const nodes = ref([]);
const createCity = ref();
const createArea = ref();
const createStreet = ref();
const createHome = ref();
const createEntrace = ref();


const updateCity = ref();
const updateArea = ref();
const updateStreet = ref();
const updateHome = ref();
const updateEntrace = ref();


function insertChildren(node, newNodes) {
    const copy = { ...node, children: newNodes };
    const shallowNodes = [ ...nodes.value ];
    shallowNodes[node.key] = copy;

    nodes.value = shallowNodes;
}

const CONTEXT_NODE_MAP = {
    city: [
        {
            title: 'Удалить',
            keyboardKey: 'D',
            handler: async ({ node, parentNode }) => {
                await request(async () => await server.from('cities').delete().eq('id', node.id));
                const result = await request(async () => await server.from('cities').select('*'));

                insertChildren(parentNode, prepareNodes(result.data, 'cities'));
            },
        },
        {
            title: 'Добавить',
            keyboardKey: 'A',
            handler: async ({ node }) => {
                const result = await createArea.value.open(node.title);
                if (!result)
                    return;

                const { data } = await server.from('areas').insert({
                    name: result,
                    parent_id: node.id,
                }).select();


                insertChildren(node, prepareNodes([...node.children, data[0]], 'areas'));
            },
        },
        {
            title: 'Изменить',
            keyboardKey: 'С',
            handler: async ({ node }) => {
                updateCity.value.open(node.title);
            }
        }
    ],
    areas: [
        {
            title: 'Удалить',
            keyboardKey: 'D',
            handler: async ({ node, parentNode }) => {
                await request(() => server.from('areas').delete().eq('id', node.id));
                const result = await request(() => server.from('areas').select('*'));

                insertChildren(parentNode, prepareNodes(result.data, 'areas'));
            },
        },
        {
            title: 'Добавить',
            keyboardKey: 'A',
            handler: ({ node, parentNode }) => {
                createStreet.value.open(parentNode.title, node.title);
            },
        },
        {
            title: 'Изменить',
            keyboardKey: 'С',
            handler: async ({ node }) => {
                updateArea.value.open(node.title);
            }
        }
    ],
    streets: [
        {
            title: 'Удалить',
            keyboardKey: 'D',
            handler: async ({ node, parentNode }) => {
                await request(() => server.from('areas').delete().eq('id', node.id));
                const result = await request(() => server.from('areas').select('*'));

                insertChildren(parentNode, prepareNodes(result.data, 'areas'));
            },
        },
        {
            title: 'Добавить',
            keyboardKey: 'A',
            handler: ({ node, parentNode }) => {
                createHome.value.open(parentNode.title, node.title);
            },
        },
        {
            title: 'Изменить',
            keyboardKey: 'С',
            handler: async ({ node }) => {
                updateStreet.value.open(node.title);
            }
        }
    ],
    homes: [
        {
            title: 'Удалить',
            keyboardKey: 'D',
            handler: async ({ node, parentNode }) => {
                await request(() => server.from('areas').delete().eq('id', node.id));
                const result = await request(() => server.from('areas').select('*'));

                insertChildren(parentNode, prepareNodes(result.data, 'areas'));
            },
        },
        {
            title: 'Добавить',
            keyboardKey: 'A',
            handler: ({ node, parentNode }) => {
                createEntrace.value.open(parentNode.title, node.title);
            },
        },
        {
            title: 'Изменить',
            keyboardKey: 'С',
            handler: async ({ node }) => {
                updateHome.value.open(node.title);
            }
        }
    ],
    entraces: [
        {
            title: 'Изменить',
            keyboardKey: 'С',
            handler: async ({ node }) => {
                updateEntrace.value.open(node.title);
            }
        }
    ]
};

function prepareNodes(list, group) {
    return list.map((it, idx) => ({
        ...it,
        title: it.name,
        key: idx,
        groupName: group,
        icon: ICON_MAP[group],
    }));
}

async function lazyLoad({ node }) {
    let result;
    let group = 'areas';

    switch (node.groupName) {
        case 'city':
            result = await server.from('areas').select('*').eq('parent_id', node.id);
            break;
        case 'areas':
            result = await server.from('streets').select('*').eq('parent_id', node.id);
            group = 'streets';
            break;
        case 'streets':
            result = await server.from('homes').select('*').eq('parent_id', node.id);
            group = 'homes';
            break;
        case 'homes':
            result = await server.from('entraces').select('*').eq('parent_id', node.id);
            group = 'entraces';
            break;
        default:
            return [];
    }

    console.log(result);

    return prepareNodes(result.data, group);
}

const selected = ref('');

async function loadCities() {
    const result = await server.from('cities')
        .select('*');

    nodes.value = prepareNodes(result.data, 'city');
}

onBeforeMount(() => {
    loadCities();
});

const entityStore = useEntityStore();
watch(selected, (value) => {
    entityStore.selected = value;
});

const contextMenu = ref();
const contextMenuActions = ref([]);

async function onTreeNodeContextMenu({ event, node, parentNode }) {
    event.preventDefault();

    contextMenuActions.value = CONTEXT_NODE_MAP[node.groupName];

    contextMenu.value?.open(event, {
        node,
        parentNode,
    });
}

function onTreeRootContextMenu(event) {
    event.preventDefault();

    contextMenuActions.value = [
        {
            title: 'Добавить',
            handler: async () => {
                const result = await createCity.value.open();
                if (!result)
                    return;

                await request(() => server.from('cities').upsert({
                    name: result,
                }));

                await loadCities();
            },
        },
    ];

    contextMenu.value?.open(event, null);
}
</script>

<template>
    <div class="entity-tree" @contextmenu.self="onTreeRootContextMenu">
        <TreeView
            v-model:selected="selected"
            :nodes="nodes"
            :lazy-fn="lazyLoad"
            lazy
            @contextmenu="onTreeNodeContextMenu"
        />
    </div>
    <ContextMenu ref="contextMenu" :actions="contextMenuActions" />
    <EntityCreateCity
        ref="createCity"
    />
    <EntityCreateArea
        ref="createArea"
    />
    <EntityCreateStreet
        ref="createStreet"
    />
    <EntityCreateHome
        ref="createHome"
    />
    <EntityCreateEntrace
        ref="createEntrace"
    />

    <EntityUpdateCity
        ref="updateCity"
    />
    <EntityUpdateArea
        ref="updateArea"
    />
    <EntityUpdateStreet
        ref="updateStreet"
    />
    <EntityUpdateHome
        ref="updateHome"
    />
    <EntityUpdateEntrace
        ref="updateEntrace"
    />
</template>

<style lang="scss" scoped>
.entity-tree {
    height: 100%;
}
</style>