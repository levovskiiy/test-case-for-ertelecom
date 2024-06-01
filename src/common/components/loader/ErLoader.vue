<script setup>
import { useLoaderStore } from '@/store/loader.store.js';
const store = useLoaderStore();
</script>

<template>
    <Teleport to="body">
        <div v-if="store.canShow" class="overlay">
            <div class="loader">
                <div class="dot dot-1"></div>
                <div class="dot dot-2"></div>
                <div class="dot dot-3"></div>
            </div>
        </div>
    </Teleport>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.overlay {
    position:   absolute;
    inset:      0;
    display:    flex;
    background: rgba(87, 87, 87, 0.6);

    .loader {
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
}
</style>