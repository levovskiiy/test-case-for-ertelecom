import { server } from '@/api/base.js';

/**
 * Загрузить сущности с базы
 * @param {string} from - из какой таблицы грузить
 * @returns {Promise<GetResult<any, any, string & keyof any, R | unknown, "*">[]>}
 */
export async function loadEntities(from) {
    try {
        const { data } = await server.from(from).select('*');
        return data;
    } catch (e) {
        alert('Failed to load entities. Open console for more information ');
        console.error(e);
    }
}

/**
 * Загрузить сущность если ее родительский id совпадает
 * @param {string} from - из какой таблицы загрузить
 * @param {string | number} id - родительский ид для загрузки элементов соотв. ему
 * @returns {Promise<GetResult<any, any, string & keyof any, R | unknown, "*">[]>}
 */
export async function loadEntitiesWithParentId(from, id) {
    try {
        const { data } = await server
            .from(from)
            .select('*')
            .eq('parent_id', id);
        return data;
    } catch (e) {
        alert('Failed to load entities. Open console for more information ');
        console.error(e);
    }
}

/**
 * Обновить имя сущности (Город, дом и т.д.)
 * @param {string} from - в какой таблице обновлять
 * @param {string} value - новое имя сущности
 * @param {string | number} id - ид обновляемой сущности
 * @returns {Promise<GetResult<any, any, string & keyof any, R | unknown, "*">[]>}
 */
export async function updateEntityName(from, value, id) {
    try {
        const { data } = await server.from(from)
            .update({ name: value })
            .eq('id', id)
            .select();
        return data;
    } catch (e) {
        alert('Failed to update entity.');
        console.error(e);
    }
}

/**
 * Обновить поля у сущности
 * @param {string} from - в какой таблице обновлять
 * @param {string | number} id - ид обновляемой сущности
 * @param {Object} reqt - объект обновляемых строк
 * @returns {Promise<GetResult<any, any, string & keyof any, R | unknown, "*">[]>}
 */
export async function updateEntity(from, id, reqt) {
    try {
        const { data } = await server.from(from)
            .update(reqt)
            .eq('id', id)
            .select();
        return data;
    } catch (e) {
        alert('Failed to update entity.');
        console.error(e);
    }
}

/**
 * Добавить сущность в базу
 * @param {string} from - в какой таблице обновлять
 * @param {string} value - обновляемое имя
 * @param {string | null} volatileKey - родительский связанный с сущностью id
 * @returns {Promise<GetResult<any, any, string & keyof any, R | unknown, "*">[]>}
 */
export async function addEntity(from, value, volatileKey = null) {
    const reqt = { name: value };

    if (volatileKey) {
        reqt.parent_id = volatileKey;
    }

    try {
        const { data } = await server.from(from).insert(reqt).select();

        return data;
    } catch (e) {
        alert('Failed to add entity.');
        console.error(e);
    }
}

/**
 * Удалить сущность. Если удаляется какой нибудь из адресов, все связанные строки тоже удалятся
 * Например: Удаляя город с ним удалится связанный район и т.д. до подъезда
 * @param from из какой таблицы удалять
 * @param id ид сущности
 * @returns {Promise<GetResult<any, any, string & keyof any, R | unknown, "*">[]>}
 */
export async function removeEntity(from, id) {
    try {
        const { data } = await server
            .from(from)
            .delete()
            .eq('id', id)
            .select();

        return data;
    } catch (e) {
        alert('Failed to remove entity.');
        console.error(e);
    }
}
