<script setup>
import ErToastContainer from '@components/toast/ErToastContainer.vue';
import ErLoader from '@components/loader/ErLoader.vue';

import { shallowRef, watch } from 'vue';
import { useRoute } from 'vue-router';


const layout = shallowRef();

const route = useRoute();
watch(
    () => route.meta,
    async (routeMeta) => {
        let component = await import('./layouts/Default.vue');

        if (route.meta && route.meta.layout) {
            const imported = await import(`./layouts/${routeMeta.layout}.vue`);

            if (imported) {
                component = imported;
            }
        }

        layout.value = component.default;
    },
);
</script>

<template>
    <ErLoader/>
    <ErToastContainer/>
    <component :is="layout">
        <RouterView />
    </component>
</template>
