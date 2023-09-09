class Node {
    constructor(d) {
        this.data = d;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor() {
        this.array = [];
        this.rootNode = null;
    }

    merge(A, B) {
        const sortedArray = [];
        let iA = 0;
        let iB = 0;

        while (iA < A.length && iB < B.length) {
            if (A[iA] === B[iB]) {     //remove duplicates
                sortedArray.push(A[iA++]);
                iB++;
            } else if (A[iA] < B[iB]) {
                sortedArray.push(A[iA++]);
            } else {
                sortedArray.push(B[iB++]);
            }     
        }

        while (iA < A.length) {
            sortedArray.push(A[iA++]);
        }

        while (iB < B.length) {
            sortedArray.push(B[iB++]);
        }

        return sortedArray;
    }

    mergeSort(array) {
        if (array.length < 2) return array;

        const mid = Math.floor(array.length / 2);
        const firstHalf = array.slice(0, mid);
        const secondHalf = array.slice(mid);

        return this.merge(
            this.mergeSort(firstHalf),
            this.mergeSort(secondHalf)
        );
    }

    createBstRecursive(arr, start, end) {
        if (start > end) return null;
    
        const mid = Math.floor((start + end) / 2);
        const root = new Node(arr[mid]);
        if (this.rootNode === null) this.rootNode = root;

        root.left = this.createBstRecursive(arr, start, mid - 1);
        root.right = this.createBstRecursive(arr, mid + 1, end);
        
        return root;
    }

    //  balanced binary search tree
    buildTree(arr) {
        this.rootNode = null;
        const sortedArray = this.mergeSort(arr);
        this.createBstRecursive(sortedArray, 0, sortedArray.length-1);

        return this.rootNode;
    }

    logTree() {
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

        return(prettyPrint(this.rootNode));
    }

    insert(val) {
        this.rootNode = this.insertNode(this.rootNode, val);
    }

    insertNode(root, val) {
        if (root === null) {
            root = new Node(val);
            return root;
        }

        if (val < root.data) {
            root.left = this.insertNode(root.left, val);
        } else if (val > root.data) {
            root.right = this.insertNode(root.right, val);
        }

        return root;
    }

    delete(val) {
        this.rootNode = this.deleteNode(this.rootNode, val);
    }

    deleteNode(root, val) {
        if (root === null) return root;
        if (val < root.data) {
            root.left = this.deleteNode(root.left, val);
        } else if (val > root.data) {
            root.right = this.deleteNode(root.right, val);
        } else {
            // leaf node
            if (root.left === null && root.right === null) return null;

            // node with one child
            if (root.left === null) {
                return root.right;
            } else if (root.right === null) {
                return root.left;  
            }

            // node with 2 children
            root.data = this.min(root.right);
            root.right = this.deleteNode(root.right, root.data);
        }
        return root;
    }

    min(node) {
        let succ = node;   // successor
        while (succ.left !== null) {
            succ = succ.left;
        }
        return succ.data;
    }

    find(val) {
        function findRecursive(root, data) {
            if (root === null) return null;
            if (data < root.data) {
                return findRecursive(root.left, data);
            } else if (data > root.data) {
                return findRecursive(root.right, data);
            }
            return root;
        }
        return findRecursive(this.rootNode, val);
    }

    treeHeight(root) {
        if (root === null) return 0;

        const lHeight = this.treeHeight(root.left);
        const rHeight = this.treeHeight(root.right);

        return Math.max(lHeight, rHeight) + 1;
    }
}

const treeOfLife = new Tree();
const a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 321];

treeOfLife.buildTree(a);
treeOfLife.logTree();
console.log(treeOfLife.treeHeight(treeOfLife.rootNode));
// treeOfLife.logTree();


function preOrder(node) {
    if (node === null) return;

    console.log(node.data);
    preOrder(node.left);
    preOrder(node.right);
}

function logInorder(node) {
    if (node === null) return;
    this.logInorder(node.left);
    console.log(node.data);
    this.logInorder(node.right);
}
