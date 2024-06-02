<script setup>
import ErOverlayPanel from '@/common/components/overlay_panel/ErOverlayPanel.vue';
import ErButton from '@/common/components/button/ErButton.vue';
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const emit = defineEmits([ 'open-profile', 'logout' ]);

const panel = ref();

function onToggle(event) {
    if (!panel.value)
        return;

    panel.value.toggle(event);
}

function openProfile(event) {
    onToggle(event);
    emit('open-profile');
}

function logout(event) {
    onToggle(event);
    emit('logout');
}

defineExpose({
    onToggle,
})
</script>

<template>
    <ErOverlayPanel ref="panel" class="menu-profile">
        <div class="panel-content">
            <ErButton visual="text" iconed @click="openProfile">
                <Icon icon="iconamoon:profile" />
                Профиль
            </ErButton>
            <ErButton visual="text" mode="error" iconed @click="logout">
                <Icon icon="material-symbols:logout" />
                Выйти
            </ErButton>
        </div>
    </ErOverlayPanel>
</template>

<style scoped lang="scss">
.menu-profile {
    .panel-content {
        display:   flex;
        flex-flow: column nowrap;
        gap:       4px;

        .line {
            display:     flex;
            align-items: center;
        }

        .er-button {
            justify-content: flex-start;
        }
    }
}
</style>