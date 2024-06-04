<script setup>
import { computed, inject } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
    node: {
        type: Object,
        required: true,
    },
    nodeData: {
        type: Object,
        required: true,
    },
});

const $tree = inject('tree');

const label = computed(() => props.node.label);
const hasChildren = computed(() => props.node.childrenIsEmpty);
const nodeId = computed(() => $tree.state.value.nodeOptions.nodeId);
const contentIndent = computed(() => (props.node.level - 1) * 20);

function handleClick(ev) {
    $tree.methods.setCurrentNode(props.node);
    $tree.rootEmit('node-click', {
        node: props.node,
        nodeData: props.nodeData,
        event: ev,
    });
}

function handleContextMenuClick(ev) {
    if ($tree.instance.vnode.props['onContextmenu']) {
        ev.stopPropagation();
        ev.preventDefault();

        $tree.rootEmit('contextmenu', {
            node: props.node,
            nodeData: props.nodeData,
            event: ev,
        });
    }
}

function handleClickExpandIcon() {
    if (props.node.expanded) {
        props.node.collapse();
    } else {
        props.node.expand();
    }
}

function handleChildNodeExpand(ev) {
    $tree.rootEmit('node-expand', ev);
}
</script>

<template>
    <div class="tree-view-node"
         :class="{ selected: node.isCurrent }"
         @click.stop="handleClick"
         @contextmenu.prevent.stop="handleContextMenuClick"
    >
        <div
            class="content"
            :style="{ paddingLeft: contentIndent + 'px' }"
        >
            <Icon
                class="arrow-icon"
                icon="iconamoon:arrow-up-2-light"
                :class="{ expanded: node.expanded }"
                @click.stop="handleClickExpandIcon"
            />
            <Icon
                v-if="node.loading"
                icon="svg-spinners:180-ring"
            />
            <div class="label">{{ label }}</div>
        </div>
        <div v-if="hasChildren || props.node.expanded" class="children">
            <ErTreeViewNode
                v-for="item in node.children" :key="item.data[nodeId]"
                :node="item"
                :node-data="item.data"
                @node-expand="handleChildNodeExpand"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.tree-view-node {
    display:    flex;
    flex-flow:  column;
    gap:        4px;
    box-sizing: border-box;

    &.selected {
        > .content {
            background: getCssVarValue(primary, color, active);
            color:      getCssVarValue(text, color, light);
        }
    }


    .content {
        transition:    all 0.2s ease;
        cursor:        pointer;
        padding:       14px 0;
        border-radius: 8px;
        display:       flex;
        align-items:   center;
        gap:           4px;


        .arrow-icon {
            transform: rotate(90deg);

            &.expanded {
                transform: rotate(180deg);
            }
        }
    }

    .children {
        padding-left: calc(var(--leaf) * 10px);
        display:      flex;
        flex-flow:    column nowrap;
        gap:          10px;
    }
}
</style>