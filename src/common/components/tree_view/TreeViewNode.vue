<script setup>
import { computed, onMounted, ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
    node: {
        type: Object,
        required: true,
    },
    level: {
        type: Number,
        default: 1,
    },
    selected: {
        type: [ String, Number ],
        required: false,
    },
    lazy: {
        type: Boolean,
        default: false,
    },
    parentNode: {
        type: Object,
        default: () => ({}),
    },
});

const emit = defineEmits([ 'expand', 'node-click', 'node-toggle', 'contextmenu' ]);

const hasChildren = computed(() => props.node.children && props.node.children.length > 0);

const expanded = ref(false);

const childrenContainer = ref();

onMounted(() => {
    if (!childrenContainer.value)
        return;

    childrenContainer.value.style.setProperty('--leaf', props.level);
});


function onNodeClick(event) {
    emit('node-click', props.node, props.parentNode, event);
}

function onNodeToggle() {
    expanded.value = !expanded.value;
    emit('node-toggle', props.node, props.parentNode);
}

const isSelected = computed(() => props.selected === props.node.id);

const showArrowIcon = computed(() => {
    if (props.lazy) {
        if (props.node?.loaded) {
            return hasChildren.value;
        }

        return true;
    }

    return hasChildren.value;
});

function onNodeContextMenu(event) {
   emit('contextmenu', {
       event,
       node: props.node,
       parentNode: props.parentNode,
   });
}
</script>

<template>
    <div class="tree-view-node" data-type="selection">
        <div class="content" @click="onNodeClick" data-type="selection" :class="{ selected: isSelected }" @contextmenu="onNodeContextMenu">
            <Icon
                v-if="node.loading"
                icon="svg-spinners:180-ring"
            />
            <Icon
                v-if="showArrowIcon"
                :class="{ expanded }"
                class="arrow-icon"
                icon="iconamoon:arrow-up-2-light"
                @click="onNodeToggle"
            />
            <Icon
                v-if="props.node.icon"
                :icon="props.node.icon"
            />
            <div class="span">{{ node.title }}</div>
        </div>
        <div ref="childrenContainer" v-show="hasChildren && expanded" class="children">
            <TreeViewNode
                v-for="(node, idx) in props.node.children" :key="node.key || node.id || idx + '_' + level"
                :node="node"
                :parentNode="props.node"
                :selected="selected"
                :level="level + 1"
                :lazy="lazy"
                @node-click="$emit('node-click', $event)"
                @node-toggle="$emit('node-toggle', $event)"
                @contextmenu="$emit('contextmenu', $event)"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@ds/utils/functions' as *;

.tree-view-node {
    display:    flex;
    flex-flow:  column;
    gap:        4px;
    box-sizing: border-box;

    .content {
        transition:    all 0.2s ease;
        cursor:        pointer;
        padding:       14px;
        border-radius: 8px;
        display:       flex;
        align-items:   center;
        gap:           4px;


        &.selected {
            background: getCssVarValue(primary, color, active);
        }

        &:hover {
            background: getCssVarValue(primary, color, hover);
        }

        &.selected,
        &:hover {
            color: getCssVarValue(text, color, light);
        }

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