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

    insertNode(data) {
        const node = new Node(data);
        if (this.rootNode === null) return this.rootNode = node;

        let currentNode = this.rootNode;
        function placeNode () {
            if (currentNode.data > data) {
                if (currentNode.left === null) return currentNode.left = node;
                currentNode = currentNode.left;
            } else {
                if (currentNode.right === null) return currentNode.right = node;  
                currentNode = currentNode.right;
            }

            placeNode();
        }

        placeNode();
    }

    attachNodes(node1, node2, branch) {
        if (node1 === null) {    // currentNode is root and has no parent
            return this.rootNode = node2;
        }

        branch === 'right'? 
        node1.right = node2:
        node1.left = node2;
    }

    detachNodes(node, branch) {
        branch === 'right'?
        node.right = null:
        node.left = null;
    }

    deleteNode(data) {
        if (this.rootNode === null) alert('binary tree is empty');
        let lastNode = null;
        let currentNode = this.rootNode;
        let parentBranch;

        //  search node
        while(currentNode.data !== data) {
            if (data < currentNode.data) {
                if (currentNode.left === null) return alert(`no node with data ${data} in the tree`);   
                lastNode = currentNode; 
                currentNode = currentNode.left;
                parentBranch = 'left';
            } else {
                if (currentNode.right === null) return alert(`no node with data ${data} in the tree`);  
                lastNode = currentNode; 
                currentNode = currentNode.right;
                parentBranch = 'right';
            }
        }

        
        if (currentNode.left === null && currentNode.right === null) { //  leaf node
            if (currentNode === this.rootNode) return this.rootNode = null;
            this.detachNodes(lastNode, parentBranch);

        } else if ((currentNode.left !== null && currentNode.right !== null)) { //  node with 2 children 

            let nextSmallest = currentNode.right;    // traverse to right subtree
            let parent = currentNode;    // parentNode of next smallest
            let directChild = true;   // if nextSmallest is directChild of the node to be deleted

            while(nextSmallest.left !== null) {
                parent = nextSmallest;
                nextSmallest = nextSmallest.left;
                directChild = false;
            }

            if (directChild) {
                nextSmallest.left = currentNode.left;
                this.attachNodes(lastNode, nextSmallest, parentBranch);
            } else {
                nextSmallest.right !== null? 
                parent.left = nextSmallest.right:
                parent.left = null;
                
                this.attachNodes(lastNode, nextSmallest, parentBranch);
                nextSmallest.left = currentNode.left;
                nextSmallest.right = currentNode.right;
            }
        } else {  //  node with 1 child
            function child() {
                return currentNode.left? currentNode.left: currentNode.right;
            }
            this.attachNodes(lastNode, child(), parentBranch);
        }   

        
        

        
        
    }
}

const treeOfLife = new Tree();
const a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 321];

treeOfLife.buildTree(a);
treeOfLife.logTree();
treeOfLife.deleteNode(9);
treeOfLife.logTree();

// console.log(treeOfLife.deleteNode(23));

function preOrder(node) {
    if (node === null) return;

    console.log(node.data);
    preOrder(node.left);
    preOrder(node.right);
}
