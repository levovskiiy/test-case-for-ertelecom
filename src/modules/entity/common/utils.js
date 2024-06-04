export function getAddressMap(node) {
    const address = {};

    let currNode = node;
    while (currNode.level > 0) {
        address[currNode.data.type] = currNode.data.name;
        currNode = currNode.parent;
    }

    return address;
}

export function computeAddressStringFromMap(map) {
    return [
        map.cities,
        map.districts,
        map.streets,
        map.houses,
        map.entrances,
    ].join(', ');
}