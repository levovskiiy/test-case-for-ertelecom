<script setup>
import ErDialog from '@/common/components/dialog/ErDialog.vue';
import { reactive, ref } from 'vue';
import ErInput from '@/common/components/input/ErInput.vue';
import ErButton from '@/common/components/button/ErButton.vue';

const modal = ref();

const userState = reactive({});
const email = ref('');
const password = ref('');
const confirmationPassword = ref('');

function open(userEmail) {
    if (!modal.value)
        return;

    email.value = userEmail;
    return modal.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Редактирование профиля" class="edit-profile" ref="modal">
        <div class="fields">
            <ErInput
                v-model="email"
                name="email"
                type="email"
                label="Электронная почта"
            />
            <ErInput
                v-model="password"
                name="password"
                type="password"
                label="Текущий пароль"
            />
            <ErInput
                v-model="confirmationPassword"
                name="confirmationPassword"
                type="password"
                label="Новый пароль"
            />
        </div>
        <template #footer="{ accept, close }">
            <ErButton @click="accept(userState)" size="large">Сохранить</ErButton>
            <ErButton @click="close" visual="text" size="large">Отмена</ErButton>
        </template>
    </ErDialog>
</template>

<style lang="scss" scoped>
.edit-profile {
    .fields {
        display:   flex;
        flex-flow: column nowrap;
        gap:       10px;
    }
}
</style>