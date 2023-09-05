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
    
        const mid = (start + end) / 2;
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
}

const treeOfLife = new Tree();
const a = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// orange.buildTree(a);
console.log(treeOfLife.buildTree(a));

function preOrder(node) {
    if (node === null) return;

    console.log(node.data);
    preOrder(node.left);
    preOrder(node.right);
}