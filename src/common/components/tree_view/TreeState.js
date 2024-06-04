import { Node } from '@/common/components/tree_view/Node.js';
import { reactive } from 'vue';

export class TreeState {
    currentNode;
    root;
    data;
    lazy = false;
    dataLoader;

    constructor(options) {
        this.currentNode = null;

        for (const opt of Object.keys(options)) {
            this[opt] = options[opt];
        }
    }

    init() {
        this.root = reactive(new Node({
            treeState: this,
        }));

        if (this.lazy && this.dataLoader) {
            this.dataLoader(this.root, (data) => {
                this.root.createChildren(data);
            });
        }
    }

    setCurrent(node) {
        const lastCurrent = this.currentNode;

        if (lastCurrent) {
            lastCurrent.isCurrent = false;
        }

        this.currentNode = node;
        this.currentNode.isCurrent = true;
    }
}