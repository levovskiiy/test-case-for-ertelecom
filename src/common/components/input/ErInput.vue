<script setup>
import { ref } from 'vue';

defineOptions({
    inheritAttrs: true,
});

defineProps({
    name: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
    },
    disabled: {
        type: Boolean,
        default: false,
    },
});

const model = defineModel();
const inputRef = ref();
</script>

<template>
    <div class="er-input">
        <label v-if="label" :for="name" class="label">
            {{ label }}
        </label>
        <input
            ref="inputRef"
            v-bind="$attrs"
            v-model="model"
            :disabled="disabled"
            :name="name"
            class="field"
        />
    </div>
</template>

<style scoped lang="scss">
@use '@ds/utils/functions' as *;

.er-input {
    display: flex;
    flex-flow: column nowrap;
    position: relative;

    & > .label {
        position: absolute;
        top: 8px;
        left: 12px;
        font-size: 10px;
        transition: all 0.1s ease;
        z-index: 0;
        color: getCssVarValue(text, color, subtle);
    }

    & > .field {
        box-sizing: border-box;
        outline: none;
        border: 1px solid getCssVarValue(gamma, light, 3);
        border-radius: 4px;
        padding: 25px 12px 8px;
        line-height: 1;
        color: getCssVarValue(text, color, base);
        transition: all 0.1s ease;
        font-size: 14px;

        &:not(.disabled):not(:disabled) {
            &:hover {
                border-color: getCssVarValue(gamma, light, 5);
            }

            &:focus {
                border-color: getCssVarValue(gamma, light, 6);
                box-shadow: 0 0 2px 2px getCssVarValue(gamma, light, 2);
            }
        }

        &:disabled,
        &.disabled {
            background: getCssVarValue(gamma, light, 1);
            color: getCssVarValue(text, color, subtle);
        }
    }
}
</style>