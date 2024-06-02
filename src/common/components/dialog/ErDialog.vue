<script setup>
import ErButton from '@/common/components/button/ErButton.vue';

import { ref } from 'vue';
import { getPromiseProxy } from '@/utils/async.js';
import { Icon } from '@iconify/vue';

defineOptions({
    inheritAttrs: false,
});

const props = defineProps({
    closeByClick: {
        type: Boolean,
        default: true,
    },
    closeByOutside: {
        type: Boolean,
        default: false,
    },
    width: {
        type: String,
        default: '400px',
    },
});

const canShow = ref(false);
let promise = getPromiseProxy();

function open() {
    canShow.value = true;
    promise = getPromiseProxy();
    return promise.promise;
}

function accept(accepted = true) {
    canShow.value = false;
    return promise.resolve(accepted);
}

function close() {
    canShow.value = false;
    return promise.resolve(false);
}

defineExpose({
    open,
    accept,
    close,
});

function clickOutside() {
    if (props.closeByOutside)
        return;

    close();
}
</script>

<template>
    <Teleport to="body">
        <Transition name="overlay" class="er-dialog">
            <div ref="overlay" v-if="canShow" class="overlay" @click.self="clickOutside">
                <Transition name="dialog" class="er-dialog-container">
                    <div v-bind="$attrs" v-if="canShow" class="er-dialog"  :style="{ width }">
                        <div class="header">
                            <div class="title">
                                <slot name="title"></slot>
                            </div>
                            <div class="close">
                                <ErButton only-icon visual="text" @click="close">
                                    <Icon icon="mdi:close" width="24" height="24" />
                                </ErButton>
                            </div>
                        </div>
                        <div class="body">
                            <slot>Content</slot>
                        </div>
                        <div class="footer">
                            <slot name="footer" :accept="accept" :close="close"></slot>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped lang="scss">
.overlay {
    position:   absolute;
    inset:      0;
    background: rgba(0, 0, 0, .5);
    display:    flex;
    z-index:    2222;

    .er-dialog {
        margin:        auto;
        display:       flex;
        flex-flow:     column nowrap;
        gap:           12px;
        background:    white;
        padding:       20px;
        box-sizing:    border-box;
        border-radius: 8px;

        .header {
            display:         flex;
            justify-content: space-between;
            align-items:     center;

            .title {
                font-size:   24px;
                font-weight: 700;
            }
        }
    }
}


.overlay-enter-from,
.overlay-leave-to {
    opacity: 0;
}

.overlay-enter-to,
.overlay-leave-from {
    opacity: 1;
}

.overlay-enter-active,
.overlay-leave-active {
    transition: all 0.3s;
}

.dialog-enter-from,
.dialog-leave-to {
    transform: scale(0);
}

.dialog-enter-to,
.dialog-leave-from {
    transform: scale(1);
}

.dialog-enter-active,
.dialog-leave-active {
    transition: all 0.1s ease;
}

</style>