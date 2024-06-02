<script setup>
import { reactive } from 'vue';

import ErInput from '@components/input/ErInput.vue';
import ErButton from '@components/button/ErButton.vue';
import { server } from '@/api/base.js';
import { useRouter } from 'vue-router';
import { useToastStore } from '@/store/toast.store.js';
import { useLoaderStore } from '@/store/loader.store.js';
import { useForm } from '@/composables/useForm.js';

const { formState, submit } = useForm({
    email: 'levovskiiy1@yandex.ru',
    password: '1234567',
})

const toaster = useToastStore();
const loader = useLoaderStore();
const router = useRouter();

async function signIn() {
    await submit(server.auth.signInWithPassword, {
        onBefore: () => {
            loader.waitRequest();
        },
        onFinish: () => {
            loader.doneRequest();
        },
        onSuccess: async () => {
            toaster.add({ text: 'Вы успешно авторизованы!' })
            await router.push('/login');
        },
        onError: (errors) => {
            toaster.add({ text: errors?.message }, 'error');
        }
    });
}
</script>

<template>
    <div class="login-page">
        <h1 class="title">Войти в систему</h1>
        <form @submit.prevent="signIn" class="login-form">
            <ErInput
                v-model="formState.fields.email"
                type="email"
                name="email"
                label="Email"
            />
            <ErInput
                v-model="formState.fields.password"
                type="password"
                name="password"
                label="Password"
            />
            <ErButton
                type="submit"
                size="large"
                :disabled="formState.processing || formState.hasErrors"
            >
                Войти
            </ErButton>
        </form>

        <div class="to-register">
            <span>Еще нет аккаунта? <RouterLink to="/register">Зарегистрироваться</RouterLink> </span>
        </div>
    </div>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.login-page {
    width: 380px;

    .login-form {
        width:     100%;
        display:   flex;
        flex-flow: column nowrap;
        gap:       10px;
    }

    .to-register {
        margin-top: 12px;
        font-size:  12px;
        color:      getCssVarValue(text, color, subtle);
    }
}
</style>
