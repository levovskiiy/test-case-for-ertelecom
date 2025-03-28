<script setup>
import ErInput from '@/common/components/input/ErInput.vue';
import ErLoader from '@/common/components/loader/ErLoader.vue';
import TransitionScale from '@/common/components/transition_scale/TransitionScale.vue';

import { computed, ref } from 'vue';
import { useClickOutside } from '@/common/composables/useClickOutside.js';

const props = defineProps({
    items: {
        type: Array,
        default: () => [],
    },
    toKey: {
        type: String,
        required: true,
    },
    toItem: {
        type: String,
        required: true,
    },
    doSearch: {
        type: Function,
    },
    label: {
        type: String,
    },
});

const selected = defineModel();

const opened = ref(false);

const nodes = ref([]);

const preparedItems = computed(() => {
    return nodes.value.map((node) => ({
        ...node,
        key: node[props.toKey],
        title: node[props.toItem],
    }));
});

const filteredNodes = computed(() => {
    return preparedItems.value.filter(node => {
        const value = node[props.toItem];
        return value.toLowerCase().includes(selected.value.toLowerCase());
    });
});

const isEmpty = computed(() => filteredNodes.value.length === 0);

const loading = ref(false);
const failure = ref(false);

async function searchItems() {
    loading.value = true;
    try {
        nodes.value = await props.doSearch(props.toKey);
    } catch (e) {
        failure.value = true;
    } finally {
        loading.value = false;
    }
}

async function open() {
    opened.value = true;

    if (props.doSearch) {
        await searchItems();
    } else {
        nodes.value = props.items;
    }

}

const container = ref();

useClickOutside(container, () => {
    opened.value = false;
});

function onClickItem(item) {
    selected.value = item.key;
    opened.value = false;
}
</script>

<template>
    <div ref="container" class="er-combobox">
        <div class="select" @click="open">
            <ErInput
                v-model="selected"
                name="search"
                class="search"
                type="text"
                ref="search"
                :label="label"
            />
        </div>

        <TransitionScale>
            <div v-show="opened" class="dropdown">
                <template v-if="loading">
                    <div class="loader-container">
                        <ErLoader to=".er-combobox .overlay .dropdown" disabled/>
                    </div>
                </template>

                <template v-if="!loading && isEmpty">
                    <div class="empty">Ничего не найдено</div>
                </template>
                <template v-if="failure">
                    <div class="error-message">Произошла ошибка при загрузке данных</div>
                </template>
                <template v-if="!isEmpty && !failure && !loading">
                    <div
                        v-for="it in filteredNodes" :key="it.key"
                        :class="{ selected: selected === it.key }"
                        class="item"
                        @click.stop="onClickItem(it)"
                    >
                        {{ it.title }}
                    </div>
                </template>
            </div>
        </TransitionScale>

    </div>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.er-combobox {
    position: relative;

    .select {
        height: 100%;
    }

    .dropdown {
        position:      absolute;
        top:           60px;
        left:          0;
        right:         0;
        z-index:       3333;

        background:    white;
        border:        1px solid getCssVarValue(gamma, light, 2);
        border-radius: 6px;
        box-shadow:    0 0 6px 1px rgba(0, 0, 0, 0.2);

        .loader-container {
            display: flex;
            align-items: center;
            height: 60px;
        }

        .item {
            padding: 20px;

            &:hover {
                background: getCssVarValue(primary, color, bg, hover);
            }

            &.selected {
                background: getCssVarValue(primary, color, bg);
            }
        }

        .empty {
            padding: 20px;
        }
    }
}
</style>