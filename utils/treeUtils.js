function array2Tree(data) {
    let zNodes = data;
    let tmpMap = {};
    let tree = [];
    let key = 'id';
    let parentKey = 'pid';
    let childKey = 'children';

    zNodes.forEach((item) => {
        tmpMap[item[key]] = item;
    });

    zNodes.forEach((item) => {
        if (tmpMap[item[parentKey]] && item[key] !== item[parentKey]) {
            if (!tmpMap[item[parentKey]][childKey])
                tmpMap[item[parentKey]][childKey] = [];
            tmpMap[item[parentKey]][childKey].push(item);
        } else {
            tree.push(item);
        }
    })

    return tree;
}

module.exports = array2Tree;