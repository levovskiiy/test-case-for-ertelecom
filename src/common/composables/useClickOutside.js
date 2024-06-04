import { onMounted, onUnmounted } from 'vue';

export function useClickOutside(target, handler) {

    const listener = (event) => {
        if (event.target === target.value || event.composedPath().includes(target.value)) {
            return;
        }

        handler(event);
    };

    onMounted(() => {
        window.addEventListener('click', listener, { passive: true });
    });

    onUnmounted(() => {
        window.removeEventListener('click', listener, { capture: true });
    });
}