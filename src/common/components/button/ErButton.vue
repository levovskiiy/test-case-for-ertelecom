<script setup>
import { computed } from 'vue';

const props = defineProps({
    mode: {
        type: String,
        default: 'primary',
        validator: (value) => ['primary', 'success', 'warning', 'error'].includes(value),
    },
    visual: {
        type: String,
        default: 'filled',
        validator: (value) => ['filled', 'outlined'].includes(value),
    },
    size: {
        type: String,
        default: 'small',
        validator: (value) => ['small', 'medium', 'large'].includes(value),
    },
    disabled: {
        type: Boolean,
        default: false,
    },
    onlyIcon: {
        type: Boolean,
        default: false,
    },
    tag: {
        type: String,
        default: 'button',
    },
});

const classes = computed(() => [
    'er-button',
    props.mode,
    props.size,
    {
        disabled: props.disabled,
        'only-icon': props.onlyIcon,
    },
]);
</script>

<template>
    <component :is="tag" :disabled="disabled" :class="classes">
        <slot></slot>
    </component>
</template>

<style lang="scss" scoped>
@use 'sass:map';
@use '@ds/colors/base' as *;
@use '@ds/utils/functions' as *;
@use '@ds/utils/mixins' as *;

$sizes: (
    small: (
        font-size: 12px,
        padding: 6px 12px,
        height: 24px,
    ),
    medium: (
        font-size: 14px,
        padding: 8px 15px,
        height: 32px,
    ),
    large: (
        font-size: 16px,
        padding: 12px 20px,
        height: 48px,
    ),
);

.er-button {
    @each $type in $types {
        &.#{$type} {
            @include set-css-vars-from-map(
                button,
                (
                    'bg-color': getCssVarValue($type, color),
                    'bg-active': getCssVarValue($type, color, active),
                    'bg-hover': getCssVarValue($type, color, hover),
                    'border-color': getCssVarValue($type, color, border),
                    'shadow-color': getCssVarValue($type, color, border),
                )
            );
        }
    }

    @each $size-name, $size in $sizes {
        &.#{$size-name} {
            @include set-css-vars-from-map(
                button,
                (
                    'text-size': map.get($size, font-size),
                    'padding': map.get($size, padding),
                    'height': map.get($size, height),
                )
            );
        }
    }
}

.er-button {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all getCssVarValue(duration, regular);
    background-color: getCssVarValue(button, bg, color);
    padding: getCssVarValue(button, padding);
    font-size: getCssVarValue(button, text-size);
    color: var(getCssVarName(button, text-color), getCssVarValue(text-color, light));
    cursor: pointer;
    outline: none;
    border: none;
    border-radius: 4px;
    height: getCssVarValue(button, height);

    &.only-icon {
        height: 100% !important;
        width: 100% !important;
    }

    &:not(.disabled):not(:disabled) {
        background: getCssVarValue(button, bg, color);
        border-color: getCssVarValue(button, bg, color);

        &:hover {
            background: getCssVarValue(button, bg, hover);
        }

        &:active {
            background-color: var(getCssVarName(button, bg, active));
            box-shadow:
                0 0 0 1px var(getCssVarName(button, shadow, color)),
                0 0 0 2px var(getCssVarName(button, shadow, color));
        }
    }

    &:disabled,
    &.disabled {
        cursor: not-allowed;
        opacity: 0.7;
    }
}
</style>
