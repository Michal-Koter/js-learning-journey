function getElementByTag(root, tag) {
    if (!root) return [];
    if (!tag) return [root];

    let result = [];

    if (root.tagName.toLowerCase() === tag.toLowerCase()) {
        result.push(root);
    }
    if (root.hasChildNodes()) {
        for (let child of root.children) {
            result = result.concat(getElementByTag(child, tag));
        }
    }

    return result;
}

module.exports = getElementByTag;