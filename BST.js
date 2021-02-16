/*
Applications of trees:
    - DOM
    - Networking
    - Folders
    - AST
    - Artificial Intelligence
    - Computer file system
    - JSON

Why BST is used:
    - make it easy to look things up, insert things

BFS: visit each level before reaching the root
DFS: visit the root first, then come back (InOrder, PreOrder, PostOrder)

BFS vs DFS
- DFS uses less space when we have a wide tree
- 
*/

class Node {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    // this.iterativeInsert(value);
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.insertHelper(this.root, value);
    }
  }
  insertHelper(currentNode, value) {
    if (value > currentNode.value) {
      if (!currentNode.right) {
        currentNode.right = new Node(value);
      } else {
        this.insertHelper(currentNode.right, value);
      }
    } else if (value < currentNode.value) {
      if (!currentNode.left) {
        currentNode.left = new Node(value);
      } else {
        this.insertHelper(currentNode.left, value);
      }
    }
  }

  iterativeInsert(value) {
    const newNode = new Node(value);
    if (!this.root) {
      this.root = newNode;
    } else {
      let current = this.root;
      while (true) {
        if (value < current.value) {
          if (current.left) {
            current = current.left;
          } else {
            current.left = newNode;
            return;
          }
        } else if (value > current.value) {
          if (current.right) {
            current = current.right;
          } else {
            current.right = newNode;
            return;
          }
        }
      }
    }
  }

  print() {
    this.printHelper(this.root, 0);
  }

  printHelper(currentNode, indentation) {
    if (currentNode.left) {
      this.printHelper(currentNode.left, indentation + 1);
    }
    for (let i = 0; i < indentation; i++) {
      process.stdout.write("- ");
    }
    console.log(currentNode.value);
    if (currentNode.right) {
      this.printHelper(currentNode.right, indentation + 1);
    }
  }

  find(value) {
    if (!this.root) {
      return null;
    }
    return this.findHelper(this.root, value);
  }

  findHelper(currentNode, value) {
    if (currentNode.value === value) {
      return currentNode;
    } else if (value < currentNode.value && currentNode.left) {
      return this.findHelper(currentNode.left, value);
    } else if (value > currentNode.value && currentNode.right) {
      return this.findHelper(currentNode.right, value);
    } else {
      return null;
    }
  }

  iterativeFind(value) {
    if (!this.root) {
      return null;
    }
    if (this.root.value === value) {
      return this.root;
    }
    let current = this.root;
    while (current) {
      if (value < current.value) {
        current = current.left;
      } else if (value > current.value) {
        current = current.right;
      } else {
        return current;
      }
      return null;
    }
  }

  bfs() {
    const queue = [];
    const result = [];
    let node = this.root;
    queue.push(node);
    while (queue.length !== 0) {
      node = queue.shift();
      result.push(node.value);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
    return result;
  }

  inOrder() {
    const result = [];

    function inOrderHelper(currentNode) {
      if (currentNode.left) {
        inOrderHelper(currentNode.left);
      }
      result.push(currentNode.value);
      if (currentNode.right) {
        inOrderHelper(currentNode.right);
      }
    }

    inOrderHelper(this.root);
    return result;
  }

  preOrder() {
    const result = [];

    function preOrderHelper(currentNode) {
      result.push(currentNode.value);
      if (currentNode.left) {
        preOrderHelper(currentNode.left);
      }
      if (currentNode.right) {
        preOrderHelper(currentNode.right);
      }
    }
    preOrderHelper(this.root);
    return result;
  }

  postOrder() {
    const result = [];
    const stack = [];
    stack.unshift(this.root);
    while (stack.length !== 0) {
      const current = stack.shift();
      result.unshift(current.value);
      if (current.left) {
        stack.unshift(current.left);
      }
      if (current.right) {
        stack.unshift(current.right);
      }
    }
    return result;
  }

  postOrderRecursive() {
    const result = [];

    function postOrderHelper(currentNode) {
      if (currentNode.left) {
        postOrderHelper(currentNode.left);
      }
      if (currentNode.right) {
        postOrderHelper(currentNode.right);
      }
      result.push(currentNode.value);
    }
    postOrderHelper(this.root);
    return result;
  }
}

const bst = new BST();
bst.insert(5);
bst.insert(3);
bst.insert(1);
bst.insert(4);
bst.insert(7);
bst.insert(6);
bst.insert(8);
console.log(bst.find(4));
console.log(bst.iterativeFind(5));
bst.print();
console.log(bst.bfs());
console.log(bst.inOrder());
console.log(bst.preOrder());
console.log(bst.postOrder());
console.log(bst.postOrderRecursive());
