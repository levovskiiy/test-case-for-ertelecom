<script setup>
import ErButton from '@components/button/ErButton.vue';
import { Icon } from '@iconify/vue';
import { server } from '@/api/base.js';
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';


const router = useRouter();

async function logout() {
    try {
        await server.auth.signOut();
    } finally {
        await router.push('/login');
    }
}

const userEmail = ref();

onMounted(async () => {
    const { data } = await server.auth.getUser();
    userEmail.value = data.user.email;
});
</script>

<template>
    <div class="default-layout">
        <div class="app-header">
            <div class="user">
                <span>{{ userEmail }}</span>
                <ErButton visual="text" size="small" only-icon @click="logout">
                    <Icon icon="material-symbols:logout" width="24" height="24" />
                </ErButton>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.default-layout {
    height: calc(100vh - 85px);

    .app-header {
        box-sizing:    border-box;
        display:       flex;
        align-items:   center;
        border-bottom: 1px solid getCssVarValue(gamma, light, 1);
        height:        85px;
        padding:       0 24px;
    }

    .user {
        margin-left: auto;
        display:     flex;
        align-items: center;
        gap:         8px;
    }

    .content {
        box-sizing: border-box;
        height:     100%;
        padding:    20px;
    }
}
</style>
