import { reactive } from 'vue';
import { getPromiseProxy } from '@/common/utils/async.js';

/**
 * Класс представляет собой узел дерева. Содержит в себе вспомогтаельные методы
 * для работы с деревом в компоненте и за его пределами.
 */
export class Node {
    parent = null;
    children = [];
    level = 0;
    data = null;
    treeState = null;
    loading = false;
    loaded = false;
    expanded = false;
    isCurrent = false;

    constructor(opts) {
        for (const key of Object.keys(opts)) {
            this[key] = opts[key];
        }
    }

    get label() {
        return this.data[this.treeState.nodeOptions.label];
    }

    get childrenKey() {
        return this.data[this.treeState.nodeOptions.children];
    }

    /**
     * Проверить, необходимо ли нам делать подгрузку данных
     * @returns {*|boolean}
     */
    get shouldLoad() {
        if (this.loaded)
            return false;

        return this.treeState.lazy && this.treeState.dataLoader;
    }

    init() {
        this.treeState.register(this, this.data.id);
    }


    /**
     * Добавить дочерный элемент к текущему узлу.
     * @param {{ data: Object }} child - добавляемый узел
     * @param {number|null} index - позиция дочернего элемента в текущем дереве
     */
    insertChild(child, index = null) {
        if (!child)
            throw new Error('child is not null');

        Object.assign(child, {
            parent: this,
            treeState: this.treeState,
        });

        child = reactive(new Node(child));
        child.level = this.level + 1;

        if (!index || index < 0) {
            this.children.push(child);
        } else {
            this.children.splice(index, 1, child);
        }
    }

    createChildren(data) {
        data.forEach((item) => {
            this.insertChild({ data: item });
        });
    }

    removeChild(child) {
        const children = this.children;

        const index = children.indexOf(child);

        if (index > -1) {
            this.treeState.removeItem(child, child.data.id);
            child.parent = null;
            children.splice(index, 1);
        }
    }


    /**
     * Произвести удаленную загрузку данных. Производится в случае если дерево настроенно
     * на частичную подгрузку узлов.
     * @param callback
     */
    loadData(callback) {
        const isLazy = this.treeState.lazy && this.treeState.dataLoader;
        const notLoaded = !this.loaded && !this.loading;

        if (isLazy && notLoaded) {
            this.loading = true;

            const { resolve, reject, promise } = getPromiseProxy();

            promise.then((data) => {
                this.children = [];
                this.createChildren(data);

                if (callback) {
                    callback.call(this);
                }
            })
                .catch(() => {
                    this.loading = false;
                })
                .finally(() => {
                    this.loaded = true;
                    this.loading = false;
                });

            this.treeState.dataLoader(this, resolve, reject);
        } else {
            if (callback) callback.call(this);
        }
    }

    expand() {
        const done = () => {
            this.expanded = true;
        };

        if (this.shouldLoad) {
            this.loadData(() => {
                done();
            });
        } else {
            done();
        }
    }

    collapse() {
        this.expanded = false;
    }
}