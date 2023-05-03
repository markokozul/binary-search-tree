const Node = require("./Node");

const Tree = (arr) => {
  let root = treeBuilder(arr);

  function treeBuilder(arr) {
    let sorted = [...new Set(arr)].sort((a, b) => a - b);
    if (sorted.length === 0) return null;
    const mid = parseInt(sorted.length / 2);
    const node = Node(
      sorted[mid],
      treeBuilder(sorted.slice(0, mid)),
      treeBuilder(sorted.slice(mid + 1))
    );

    return node;
  }
  const insert = (root, value) => {
    if (root === null) {
      root = Node(value);
    }
    if (value < root.data) {
      root.left = insert(root.left, value);
    } else if (value > root.data) {
      root.right = insert(root.right, value);
    }
    return root;
  };

  const remove = (root, value) => {
    if (root === null) {
      return root;
    }
    if (value < root.data) {
      root.left = remove(root.left, value);
    } else if (value > root.data) {
      root.right = remove(root.right, value);
    } else {
      if (root.left === null) {
        return root.right;
      }
      if (root.right === null) {
        return root.left;
      }
      // node with 2 children
      root.data = minValue(root.right);
      root.right = remove(root.right, root.data);
    }
    return root;
  };

  function minValue(root) {
    let minval = root.data;
    while (root.left != null) {
      minval = root.left.data;
      root = root.left;
    }
    return minval;
  }
  const find = (root, value) => {
    const node = root;
    if (node === null) return null;
    if (value < node.data) {
      return find(root.left, value);
    }
    if (value > node.data) {
      return find(root.right, value);
    }
    return node;
  };
  const levelOrder = (root) => {
    if (root === null) return;
    const queue = [root];

    const result = [];

    while (queue.length) {
      let level = [];
      let size = queue.length;
      for (let i = 0; i < size; i++) {
        const node = queue.shift();
        level.push(node.data);
        if (node.left) queue.push(node.left);
        if (node.right) queue.push(node.right);
      }
      result.push(level);
    }
    return result;
  };

  const preorder = (root, result = []) => {
    if (root === null) return;
    result.push(root.data);
    preorder(root.left, result);
    preorder(root.right, result);
    return result;
  };
  const inorder = (root, result = []) => {
    if (root === null) return;
    inorder(root.left, result);
    result.push(root.data);
    inorder(root.right, result);
    return result;
  };
  const postorder = (root, result = []) => {
    if (root === null) return;
    postorder(root.left, result);
    postorder(root.right, result);
    result.push(root.data);

    return result;
  };

  const height = (node) => {
    if (node === null) return -1;
    return Math.max(height(node.left), height(node.right)) + 1;
  };
  const depth = (root, node, lvl = 0) => {
    if (!node) return null;
    if (root === null) return 0;
    console.log("rghtgtd");
    if (root.data === node.data) return lvl;
    if (node.data < root.data) {
      return depth(root.left, node, lvl + 1);
    } else {
      return depth(root.right, node, lvl + 1);
    }
  };
  const isBalanced = () => {
    return Math.abs(height(root.left) - height(root.right)) < 2
      ? "true"
      : "false";
  };
  const rebalance = () => {
    if (root === null) return;
    const sorted = [...new Set(inorder(root).sort((a, b) => a - b))];
    root = treeBuilder(sorted);
  };

  return {
    treeBuilder,
    root,
    insert,
    remove,
    find,
    levelOrder,
    preorder,
    inorder,
    postorder,
    height,
    depth,
    isBalanced,
    rebalance,
  };
};

module.exports = Tree;
