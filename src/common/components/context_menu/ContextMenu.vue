<script setup>
import { nextTick, reactive, ref, watch } from 'vue';
import ErButton from '@/common/components/button/ErButton.vue';
import { useClickOutside } from '@/composables/useClickOutside.js';

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

    nextTick(() => {
        contextContainer.value.style.setProperty('--top', (position.y) + 'px');
        contextContainer.value.style.setProperty('--left', (position.x) + 'px');
    });

    show.value = true;
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
</script>

<template>
    <Transition name="overlay">
        <div
            v-show="show"
            class="context-menu"
            ref="contextContainer"
            @contextmenu.capture.prevent
        >
            <ErButton v-for="(item, id) in actions" :key="id" @click="onClickItem(item)" size="small" visual="text"
                      class="button">
                {{ item.title }} <span v-if="item.keyboardKey">({{ item.keyboardKey }})</span>
            </ErButton>
        </div>
    </Transition>

</template>

<style scoped lang="scss">
@use '@ds/utils/functions' as *;

.context-menu {
    position:      absolute;
    top:           var(--top);
    left:          var(--left);
    background:    getCssVarValue(gamma, light, 1);
    box-sizing:    border-box;
    padding:       6px;
    border-radius: 8px;
    display:       flex;
    flex-flow:     column nowrap;
    gap:           4px;
    border:        none;

    &:focus {
        outline: none;
    }

}

.overlay-enter-from,
.overlay-leave-to {
    opacity:   0;
    transform: scale(0);
}

.overlay-enter-to,
.overlay-leave-from {
    opacity:   1;
    transform: scale(1);
}

.overlay-enter-active,
.overlay-leave-active {
    transition: all 0.125s ease;
}

</style>