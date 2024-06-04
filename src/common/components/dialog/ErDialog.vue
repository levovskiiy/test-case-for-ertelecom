<script setup>
import ErButton from '@/common/components/button/ErButton.vue';

import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import { getPromiseProxy } from '@/common/utils/async.js';
import TransitionScale from '@/common/components/transition_scale/TransitionScale.vue';

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
    title: {
        type: String,
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
        <Transition name="overlay">
            <div
                v-show="canShow"
                class="overlay"
                @click.self="clickOutside"
            >
                <TransitionScale>
                    <div
                        v-show="canShow"
                        v-bind="$attrs"
                        class="er-dialog"
                    >
                        <div class="header">
                            <slot name="header" :close="close">
                                <div class="title">
                                    {{ title }}
                                </div>
                                <div class="close">
                                    <ErButton only-icon visual="text" @click="close">
                                        <Icon icon="mdi:close" width="24" height="24" />
                                    </ErButton>
                                </div>
                            </slot>
                        </div>
                        <div class="body">
                            <slot>Content</slot>
                        </div>
                        <div class="footer">
                            <slot name="footer" :accept="accept" :close="close">
                                <ErButton
                                    type="button"
                                    size="large"
                                    @click="accept"
                                >
                                    Подтверить
                                </ErButton>
                                <ErButton
                                    type="button"
                                    visual="text"
                                    size="large"
                                    @click="close"
                                >
                                    Отменить
                                </ErButton>
                            </slot>
                        </div>
                    </div>
                </TransitionScale>
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

        .footer {
            display:     flex;
            align-items: center;
            gap:         4px;
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
    transition: all 0.125s;
}
</style>