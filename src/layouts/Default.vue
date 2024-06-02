<script setup>
import ErButton from '@components/button/ErButton.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';
import EditProfile from '@/modules/profile/EditProfile.vue';
import MenuProfile from '@/modules/profile/MenuProfile.vue';
import { server } from '@/api/base.js';
import { useRouter } from 'vue-router';
import { useLoaderStore } from '@/store/loader.store.js';

const editProfile = ref();
const menu = ref();

async function openProfile() {
    if (!editProfile.value)
        return;

    const { data } = await server.auth.getUser();
    const accepted = await editProfile.value.open(data.user.email);

    if (!accepted)
        return;
}

const router = useRouter();
const loader = useLoaderStore();

async function logout() {
    try {
        loader.waitRequest();
        await server.auth.signOut();
    } finally {
        loader.doneRequest();
        await router.push('/login');
    }
}

function toggleVisibleMenu(event) {
    if (!menu.value)
        return;

    menu.value.onToggle(event);
}
</script>

<template>
    <div class="default-layout">
        <div class="app-sidebar">
            <div class="menu-group">
                <ErButton visual="text" size="small" only-icon @click="toggleVisibleMenu">
                    <Icon icon="iconoir:profile-circle" width="32" height="32" />
                </ErButton>
            </div>
        </div>
        <div class="content">
            <slot></slot>
        </div>

        <EditProfile ref="editProfile" />
        <MenuProfile
            @open-profile="openProfile"
            @logout="logout"
            ref="menu"
        />
    </div>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.default-layout {
    --sidebar-width: 64px;

    position:        relative;
    height:          100vh;

    .app-sidebar {
        box-sizing:   border-box;
        position:     fixed;
        display:      flex;
        flex-flow:    column nowrap;
        top:          0;
        bottom:       0;
        border-right: 1px solid getCssVarValue(gamma, light, 1);
        width:        var(--sidebar-width);
        color:        getCssVarValue(text, color, light);

        .menu-group {
            padding:    20px 4px;
            margin-top: auto;
            display:    flex;
            flex-flow:  column nowrap;
        }
    }

    .content {
        box-sizing:  border-box;
        height:      100%;
        margin-left: var(--sidebar-width);
        padding:     20px;
    }


}
</style>
