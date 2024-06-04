<template>
    <div class="er-loader">
        <div class="dot dot-1"></div>
        <div class="dot dot-2"></div>
        <div class="dot dot-3"></div>
    </div>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.er-loader {
    display: flex;
    gap:     4px;
    margin:  auto;

    .dot {
        width:         16px;
        height:        16px;
        background:    getCssVarValue(primary, color);
        border-radius: 50%;

        &-1 {
            animation: 0.5s ease 0.5s infinite scale;
        }

        &-2 {
            animation: 0.5s ease 0.2s infinite scale;
        }

        &-3 {
            animation: 0.5s ease 0.1s infinite scale;
        }
    }

    @keyframes scale {
        from {
            transform: scale(0.5);
            opacity:   0.5;
        }
        to {
            transform: scale(1);
            opacity:   1;
        }
    }
}
</style>