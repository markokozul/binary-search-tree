const Tree = require("./Tree");
/*
const rndArray = () => {
  let arr = [];
  // random array length from 0-50
  let arrLength = Math.floor(Math.random() * 15);
  for (let i = 0; i < arrLength; i++) {
    // random number  from 0-100
    let rndNumber = Math.floor(Math.random() * 100);
    arr.push(rndNumber);
  }
  return arr;
};
*/
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};
const tree = Tree([1, 4, 3, 2, 5]);
prettyPrint(tree.root);

console.log(tree.isBalanced(tree.root));

console.log(tree.levelOrder(tree.root));
console.log("preorder", tree.preorder(tree.root));
console.log("inorder", tree.inorder(tree.root));
console.log("postorder", tree.postorder(tree.root));

tree.insert(tree.root, 8);
tree.insert(tree.root, 9);
tree.insert(tree.root, 10);
tree.insert(tree.root, 110);

console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());

prettyPrint(tree.root);
