import { addEntity, removeEntity, updateEntityName } from '@/api/entity.js';

const cityContextActions = [
    {
        title: 'Добавить район',
        keyboardKey: 'A',
        handler: async ({ node, createDistrict }) => {
            const result = await createDistrict.open(node.data.name);
            if (!result)
                return;

            const data = await addEntity('districts', result, node.data.id);

            node.insertChild({ data: data[0] });
        },
    },
    {
        title: 'Изменить',
        keyboardKey: 'C',
        handler: async ({ node, updateCity }) => {
            const newName = await updateCity.open(node.data.name);
            if (!newName)
                return;

            const data = await updateEntityName('cities', newName, node.data.id);

            node.data = data[0];
        },
    },
    {
        title: 'Удалить',
        keyboardKey: 'D',
        options: {
            mode: 'error',
        },
        handler: async ({ node }) => {
            await removeEntity('cities', node.data.id);
            node.parent.removeChild(node);
        },
    },
];

const areaContextActions = [

    {
        title: 'Добавить улицу',
        keyboardKey: 'A',
        handler: async ({ node, createStreet }) => {
            const streetName = await createStreet.open(node.parent.data.name, node.data.name);
            if (!streetName)
                return;

            const data = await addEntity('streets', streetName, node.data.id);

            node.insertChild({ data: data[0] });
        },
    },
    {
        title: 'Изменить',
        keyboardKey: 'C',
        handler: async ({ node, updateDistrict }) => {
            const result = await updateDistrict.open(node.data.name);
            if (!result)
                return;

            await updateEntityName('districts', result, node.data.id);

            node.data.name = result;
        },
    },
    {
        title: 'Удалить',
        keyboardKey: 'D',
        handler: async ({ node }) => {
            await removeEntity('districts', node.data.id);
            node.parent.removeChild(node);
        },
    },
];

const streetContextActions = [
    {
        title: 'Добавить дома',
        keyboardKey: 'A',
        handler: async ({ node, createHome }) => {
            const result = await createHome.open(node.parent.data.name, node.data.name);
            if (!result)
                return;

            const data = await addEntity('houses', result, node.data.id);

            node.insertChild({ data: data[0] });
        },
    },
    {
        title: 'Изменить',
        keyboardKey: 'C',
        handler: async ({ node, updateStreet }) => {
            const result = await updateStreet.open(node.data.name);
            if (!result)
                return;

            await updateEntityName('streets', result, node.data.id);

            node.data.name = result;
        },
    },
    {
        title: 'Удалить',
        keyboardKey: 'D',
        handler: async ({ node }) => {
            await removeEntity('streets', node.data.id);
            node.parent.removeChild(node);
        },
    },
];

const homeContextActions = [
    {
        title: 'Добавить подъезд',
        keyboardKey: 'A',
        handler: async ({ node, createEntrance }) => {
            const entranceName = await createEntrance.open(node.parent.data.name, node.data.name);

            if (!entranceName)
                return;

            const data = await addEntity('entrances', entranceName, node.data.id);

            node.insertChild({ data: data[0] });
        },
    },
    {
        title: 'Изменить',
        keyboardKey: 'C',
        handler: async ({ node, updateHome }) => {
            const result = await updateHome.open(node.data.name);

            if (!result)
                return;

            await updateEntityName('houses', result, node.data.id);
            node.data.name = result;
        },
    },
    {
        title: 'Удалить',
        keyboardKey: 'D',
        handler: async ({ node }) => {
            await removeEntity('houses', node.data.id);
            node.parent.removeChild(node);
        },
    },
];

const entranceContextActions = [
    {
        title: 'Изменить',
        keyboardKey: 'C',
        handler: async ({ node, updateEntrance }) => {
            const result = await updateEntrance.open(node.data.name);

            if (!result)
                return;

            await updateEntityName('entrances', result, node.data.id);

            node.data.name = result;
        },
    },
];

export const CONTEXT_NODE_MAP = {
    cities: cityContextActions,
    districts: areaContextActions,
    streets: streetContextActions,
    houses: homeContextActions,
    entrances: entranceContextActions,
};
