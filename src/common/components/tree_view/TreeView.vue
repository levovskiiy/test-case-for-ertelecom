<script setup>
import TreeViewNode from '@/common/components/tree_view/TreeViewNode.vue';

const props = defineProps({
    nodes: {
        type: Array,
        required: true,
    },
    lazy: {
        type: Boolean,
        default: false,
    },
    lazyFn: {
        type: Function,
        default: () => null,
    },
});

const emit = defineEmits([ 'expand', 'contextmenu' ]);

const selected = defineModel('selected');

async function onLazyLoad(node) {
    if (node.loaded)
        return;

    node.loading = true;
    try {
        node.children = await props.lazyFn({
            node,
        });
    } catch (e) {
        console.error(e);
        node.children = [];
    } finally {
        node.loading = false;
        node.loaded = true;
    }
}

function onNodeClick(node) {
    selected.value = node.id;

}

function onToggleNode(node) {
    emit('expand', node);

    if (props.lazy) {
        onLazyLoad(node);
    }
}
</script>

<template>
    <div class="tree-view">
        <TreeViewNode
            v-for="node in nodes" :key="node.key"
            v-model:selected="selected"
            :node="node"
            :selected="selected"
            :level="1"
            :lazy="lazy"
            @node-click="onNodeClick"
            @node-toggle="onToggleNode"
            @contextmenu="$emit('contextmenu', $event)"
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