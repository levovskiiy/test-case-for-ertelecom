<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    appendTo: {
        type: String,
        default: 'body',
    },
});

const visible = ref(false);
const eventTarget = ref(null);
const container = ref(null);

function toggle(e) {
    eventTarget.value = e.currentTarget;
    visible.value = !visible.value;
}

function calculatePosition() {
    const targetRect = eventTarget.value?.getBoundingClientRect();

    container.value?.style.setProperty('--bottom', (targetRect.height + 20) + 'px');
    container.value?.style.setProperty('--left', (targetRect.right) + 'px');
}

function onEnter() {
    calculatePosition();
}

function onClickOutside(e) {
    if (!container.value?.contains(e.target) && !eventTarget.value?.contains(e.target))
        visible.value = false;
}

onMounted(() => {
    document.addEventListener('click', onClickOutside, true);
})

onBeforeUnmount(() => {
    document.removeEventListener('click', onClickOutside, true);
})

defineExpose({
    toggle,
});
</script>

<template>
    <Teleport :to="appendTo">
        <Transition @enter="onEnter" name="overlay">
            <div v-if="visible" class="overlay-panel" ref="container" v-bind="$attrs">
                <slot></slot>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.overlay-panel {
    --bottom:      auto;
    --left:        auto;

    z-index:       1111;
    position:      absolute;
    left:          var(--left);
    bottom:        var(--bottom);

    padding:       6px;
    box-sizing:    border-box;
    background:    getCssVarValue(gamma, light, 8);
    border-radius: 8px;
    border:        1px solid getCssVarValue(gamma, light, 1);
    box-shadow:    0 4px 6px -1px rgba(0, 0, 0, 0.1),
                   0 2px 4px -2px rgba(0, 0, 0, 0.1);
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
    transition: all 0.2s ease;
}
</style>