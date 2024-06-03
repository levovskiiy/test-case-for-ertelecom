<script setup>
import { ref } from 'vue';
import ErDialog from '@/common/components/dialog/ErDialog.vue';
import ErInput from '@/common/components/input/ErInput.vue';
import ErButton from '@/common/components/button/ErButton.vue';

const dialog = ref();

const entraceName = ref();

function open(entrace) {
    entraceName.value = entrace;
    return dialog.value.open();
}

defineExpose({
    open,
});
</script>

<template>
    <ErDialog title="Изменить номер подъезда" class="entity-create-area" ref="dialog">
        <div class="fields">
            <ErInput
                v-model="entraceName"
                name="area"
                label="Номер подъезда"
                type="text"
            />
        </div>

        <template #footer="{ accept, close }">
            <ErButton
                size="large"
                @click="accept(entraceName)"
            >
                Добавить
            </ErButton>
            <ErButton
                size="large"
                visual="text"
                @click="close"
            >
                Отмена
            </ErButton>
        </template>
    </ErDialog>
</template>

<style lang="scss" scoped>
.entity-create-area {
    .fields {
        display:   flex;
        flex-flow: column nowrap;
        gap:       10px;
    }
}
</style>
