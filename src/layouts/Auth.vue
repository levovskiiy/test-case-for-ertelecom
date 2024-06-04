<template>
    <div class="auth-layout">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>

<style scoped lang="scss">
.auth-layout {
    height: 100vh;
    display: flex;

    .content {
        margin: auto;
    }
}
</style>
