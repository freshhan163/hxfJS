function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var isValidBST = function(root) {
    if (!root) {
        return true;
    }
    let pre = Number.MIN_SAFE_INTEGER;
    const traverseTree = (node) => {
        console.log('node =', node, 'pre = ', pre);
        if (!node) {
            return true;
        }
        if (!traverseTree(node.left)) {
            return false;
        }
        if (node.val <= pre) {
            console.log('返回false');
            return false;
        }
        pre = node.val;
        console.log('11111');
        return traverseTree(node.right);
    };
    const val = traverseTree(root);
    console.log('val = ', val);
    return val;
};

const leftNode = new TreeNode(2);
const rightNode = new TreeNode(2);
const newNode = new TreeNode(2, leftNode, rightNode);
// console.log('newNode = ', newNode);

isValidBST(newNode);