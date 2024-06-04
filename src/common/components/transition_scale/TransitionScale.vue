<template>
    <Transition name="scale">
        <slot></slot>
    </Transition>
</template>

<style scoped lang="scss">
.scale-enter-from,
.scale-leave-to {
    transform: scale(0);
}

.scale-enter-to,
.scale-leave-from {
    transform: scale(1);
}

.scale-enter-active,
.scale-leave-active {
    transition: all 0.125s;
}
</style>