import { server } from '@/api/base.js';

/**
 * Получить текущего пользователя
 * @returns {Promise<User>}
 */
export async function getMe() {
    const result = await server.auth.getUser();
    return result.data.user;
}