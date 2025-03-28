import { computed, ref, watch } from 'vue';

import { getAddressMap, computeAddressStringFromMap } from '../common/utils';
import { server } from '@/api/base.js';

export function useEntityTable(selectedNode) {
    const tableInfo = ref([]);
    const loading = ref(false);

    const addressMap = computed(() => {
        return getAddressMap(selectedNode.value);
    });

    const addressString = computed(() => {
        return computeAddressStringFromMap(addressMap.value);
    });

    const notFound = computed(() => {
        return !selectedNode.value || tableInfo.value.length === 0;
    });

    const selectedType = computed(() => {
        return selectedNode.value?.data?.type;
    });

    async function addService(name) {
        try {
            loading.value = true;

            const { data } = await server.from('services')
                .insert({
                    ...addressMap.value,
                    name,
                    full_address: addressString.value,
                }).select('*');

            tableInfo.value.push(data[0]);
        } catch (e) {
            alert(e);
        } finally {
            loading.value = false;
        }
    }

    async function loadServices(address = addressString) {
        try {
            loading.value = true;

            const { data } = await server
                .from('services')
                .select('*')
                .textSearch('full_address', address.value, {
                    type: 'websearch',
                });

            tableInfo.value = data;
        } catch (e) {
            alert(e);
        } finally {
            loading.value = false;
        }
    }

    watch(selectedNode, async (value) => {
        if (!value) {
            tableInfo.value = [];
            return;
        }

        await loadServices();
    }, {
        immediate: true,
    })

    return {
        tableInfo,
        loading,
        addressString,
        addressMap,
        notFound,
        selectedType,
        addService,
        loadServices,
    };

}