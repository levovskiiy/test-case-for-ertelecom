<script setup>
import { getCurrentInstance, provide, ref } from 'vue';
import { TreeState } from '@/common/components/tree_view/TreeState.js';

import ErTreeViewNode from '@/common/components/tree_view/ErTreeViewNode.vue';

const props = defineProps({
    data: {
        type: Array,
        default: () => ([]),
    },
    lazy: {
        type: Boolean,
        default: false,
    },
    lazyFn: {
        type: Function,
        default: () => null,
    },
    nodeOptions: {
        type: Object,
        default: () => ({
            children: 'children',
            label: 'label',
            nodeId: 'id',
        }),
    }
});

const emit = defineEmits([ 'contextmenu', 'node-click', 'current-change', 'node-expand' ]);

const treeState = ref(new TreeState({
    lazy: props.lazy,
    dataLoader: props.lazyFn,
    data: props.data,
    nodeOptions: props.nodeOptions,
}));

treeState.value.init();

const root = ref(treeState.value.root);

function handleChangeCurrent(node, cb) {
    const prevCurrent = treeState.value.currentNode;
    cb();
    const newCurrent = treeState.value.currentNode;

    if (prevCurrent !== newCurrent) {
        emit('current-change', newCurrent);
    }
}

function setCurrentNode(node) {
    handleChangeCurrent(node, () => {
        treeState.value.setCurrent(node);
    })
}

provide('tree', {
    state: treeState,
    instance: getCurrentInstance(),
    rootEmit: emit,
    rootNode: root,
    methods: {
        setCurrentNode: setCurrentNode,
    },
});

defineExpose({
    root,
    treeState,
});
</script>

<template>
    <div class="tree-view">
        <ErTreeViewNode
            v-for="node in root.children" :key="node.data[nodeOptions.nodeId]"
            :node="node"
            :node-data="node.data"
        />
    </div>
</template>

<style lang="scss" scoped>
.tree-view {
    display:   flex;
    flex-flow: column nowrap;
    gap:       10px;
}
</style>