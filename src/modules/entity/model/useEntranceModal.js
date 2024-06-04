import { server } from '@/api/base.js';
import { computeAddressStringFromMap } from '@/modules/entity/common/utils.js';

export function useEntranceModal(createRef, updateRef) {
    async function openUpdateServiceDialog(data, address) {
        const result = await updateRef.value.open(data.name, address);

        if (!result)
            return;

        await server.from('services')
            .update({
                ...result.address,
                name: result.name,
                full_address: computeAddressStringFromMap(result.address),
            })
            .eq('id', data.id);

        return result;
    }

    async function openCreateServiceDialog(addressMap) {
        const result = await createRef.value.open(addressMap);
        if (!result)
            return;

        return result;
    }


    return {
        openUpdateServiceDialog,
        openCreateServiceDialog,
    };
}