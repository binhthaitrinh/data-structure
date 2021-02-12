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

  inOrder() {
    this.inOrderHelper(this.root, 0);
  }

  inOrderHelper(currentNode, indentation) {
    if (currentNode.left) {
      this.inOrderHelper(currentNode.left, indentation + 1);
    }
    for (let i = 0; i < indentation; i++) {
      process.stdout.write("- ");
    }
    console.log(currentNode.value);
    if (currentNode.right) {
      this.inOrderHelper(currentNode.right, indentation + 1);
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
bst.inOrder();
