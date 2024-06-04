<script setup>
import { reactive } from 'vue';

import ErInput from '@components/input/ErInput.vue';
import ErButton from '@components/button/ErButton.vue';
import { useRouter } from 'vue-router';
import { server } from '@/api/base.js';

const state = reactive({
    email: '',
    password: '',
});

const router = useRouter();

async function signUp() {
    await server.auth.signUp(state);
    await router.push('/login');
}
</script>

<template>
    <div class="register-page">
        <h1 class="title">Зарегистироваться в системе</h1>
        <form @submit.prevent="signUp" class="login-form">
            <ErInput
                v-model="state.email"
                type="email"
                name="email"
                label="Email"
            />
            <ErInput
                v-model="state.password"
                type="password"
                name="password"
                label="Password"
            />
            <ErButton
                type="submit"
                size="large"
            >
                Зарегистрироваться
            </ErButton>
        </form>

        <div class="to-login">
            <span>Уже есть аккаунт? <RouterLink to="/login">Войти</RouterLink> </span>
        </div>

    </div>
</template>

<style scoped lang="scss">
@use "@ds/utils/functions" as *;

.register-page {
    width: 380px;

    .login-form {
        width:     100%;
        display:   flex;
        flex-flow: column nowrap;
        gap:       10px;
    }

    .to-login {
        margin-top: 12px;
        font-size:  12px;
        color:      getCssVarValue(text, color, subtle);
    }
}
</style>
