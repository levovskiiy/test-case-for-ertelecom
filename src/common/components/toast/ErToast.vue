<script setup>
import { computed, onBeforeMount, onMounted, ref } from 'vue';

const props = defineProps({
    message: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        default: 'info',
    },
    title: {
        type: String,
        default: 'info',
    },
    life: {
        type: Number,
        default: 5000,
    },
});

const emit = defineEmits([ 'close', 'end-life' ]);

const TITLE_MAP = {
    info: 'Сообщение',
    error: 'Ошибка',
};

const titleType = computed(() => TITLE_MAP[props.type]);

const timeoutId = ref();

onMounted(() => {
    timeoutId.value = setTimeout(() => {
        emit('end-life');
    }, props.life);
});

onBeforeMount(() => {
    clearTimeout(timeoutId.value);
});

function handleMouseEnter() {
    clearTimeout(timeoutId.value);
}

function handleMouseLeave() {
    timeoutId.value = setTimeout(() => {
        emit('end-life');
    }, props.life);
}
</script>

<template>
    <div class="toast" :class="type" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
        <div class="header">
            <div class="icon"></div>
            <div class="title">{{ titleType }}</div>
        </div>
        <div class="message">
            {{ message }}
        </div>
    </div>
</template>

<style scoped lang="scss">
@use '@ds/utils/functions' as *;

.toast {
    padding:       10px;
    background:    #fff;
    border-radius: 8px;
    transition:    all 0.2s ease;
    margin-bottom: 20px;

    &:hover {
        transform: scale(1.2);
    }

    &.error {
        background: getCssVarValue(error, color, bg);
        color:      getCssVarValue(error, color, text);
        box-shadow:    0 1px 2px 0 getCssVarValue(error, color, bg);
    }

    .header {
        padding: 10px 0;
    }

    .message {
        font-size: 12px;
    }
}
</style>