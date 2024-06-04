<script setup>
import { getCurrentInstance, inject, onMounted, onUnmounted } from 'vue';

defineOptions({
    render: () => null,
});

defineProps({
    field: {
        type: [ String, Function ],
        default: () => null,
    },
    header: {
        type: String,
        required: false,
    },
});

const $columns = inject('$columns');
const instance = getCurrentInstance();

onMounted(() => {
    $columns.value.add(instance);
});

onUnmounted(() => {
    $columns.value.delete(instance);
});
</script>