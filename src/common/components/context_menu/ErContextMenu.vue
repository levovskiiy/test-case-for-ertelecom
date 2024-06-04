<script setup>
import { nextTick, reactive, ref } from 'vue';
import ErButton from '@/common/components/button/ErButton.vue';
import { useClickOutside } from '@/common/composables/useClickOutside.js';
import TransitionScale from '@/common/components/transition_scale/TransitionScale.vue';

const props = defineProps({
    actions: {
        type: Array,
        required: true,
    },
});


const show = ref(false);
const event = ref(null);
const position = reactive({
    x: 0,
    y: 0,
});

const contextData = ref(null);

function open(e, data) {
    event.value = e;
    contextData.value = data;
    position.x = e.clientX;
    position.y = e.clientY;
    show.value = true;

    nextTick(() => {
        contextContainer.value.style.setProperty('--top', (position.y) + 'px');
        contextContainer.value.style.setProperty('--left', (position.x) + 'px');

        contextContainer.value.focus();
    });

}

function close() {
    position.x = 0;
    position.y = 0;
    show.value = false;
    contextData.value = null;
}

const contextContainer = ref();

defineExpose({
    open,
});


useClickOutside(contextContainer, close);

function onClickItem(item) {
    item.handler(contextData.value);
    close();
}

function onKeydownItem(ev) {
    for (const item of props.actions) {
        const keyboardKey = item.keyboardKey.toLowerCase();

        if (keyboardKey === ev.key) {
            return onClickItem(item);
        }
    }
}
</script>

<template>
    <TransitionScale>
        <div
            v-show="show"
            class="context-menu"
            tabindex="-1"
            ref="contextContainer"
            @contextmenu.capture.prevent
            @keydown="onKeydownItem"
        >
            <ErButton
                v-for="(item, id) in actions" :key="id"
                :size="item.options?.size || 'small'"
                :visual="item.options?.visual || 'text'"
                :mode="item.options?.mode || 'primary'"
                class="button"
                @click="onClickItem(item)"
            >
                <span class="title">{{ item.title }}</span>
                <span v-if="item.keyboardKey">({{ item.keyboardKey }})</span>
            </ErButton>
        </div>
    </TransitionScale>

</template>

<style scoped lang="scss">
@use '@ds/utils/functions' as *;

.context-menu {
    position:      absolute;
    top:           var(--top);
    left:          var(--left);
    background:    getCssVarValue(primary, light, 2);
    box-sizing:    border-box;
    padding:       6px;
    border-radius: 4px;
    display:       flex;
    flex-flow:     column nowrap;
    gap:           4px;
    border:        none;

    &:focus {
        outline: none;
    }

    .button {
        justify-content: space-between;
        color:           getCssVarValue(text, color, light);
    }
}
</style>