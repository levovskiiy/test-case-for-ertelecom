import { createClient } from '@supabase/supabase-js';
import { API_CONFIG } from '@/config/api.js';
import { useLoaderStore } from '@/store/loader.store.js';
import { useToastStore } from '@/store/toast.store.js';

export const server = createClient(API_CONFIG.url, API_CONFIG.key);

export async function request(callback, hooks) {
    const loader = useLoaderStore();
    const toaster = useToastStore();

    loader.waitRequest();
    await hooks?.onBefore();

    try {
        const result = await callback();

        await hooks?.onSuccess(result);

        return result;
    } catch (e) {
        toaster.add({ text: e.message, life: 2500 }, 'error');
        await hooks?.onError(e);
    } finally {
        loader.doneRequest();
        await hooks?.onFinish();
    }
}
