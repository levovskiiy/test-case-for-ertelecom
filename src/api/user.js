import { request, server } from '@/api/base.js';

export async function getMe() {
    const result = await request(() => server.auth.getUser());
    return result.data.user;
}