// Linked list is a data structure that contains a head, tail and length property
// Linked list contains nodes, each node has a value and pointer to the next node (or null)
// 4 -> 6 -> 8 -> 2 -> null
//head           tail
// Linked list vs arrays
// Linked list
//      - Do not have indexes!
//      - Connected via nodes with a next pointer
//      - Random access is not possible
// Arrays
//      - Indexed in order
//      - Insertion and deletion can be expensive
//      - Can be quickly accessed at a specific index

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  // push to the end of the list
  push(val) {
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length++;
    return this;
  }

  // pop the last element of the list
  pop() {
    if (this.length === 0) {
      throw new Error("Empty list!");
    }
    if (this.length === 1) {
      this.head = null;
      this.tail = null;
    } else {
      // 1 2 null
      let current = this.head;
      let prev = null;
      while (current.next !== null) {
        prev = current;
        current = current.next;
      }
      this.tail = prev;
      this.tail.next = null;
      return current;
    }
    this.length--;
  }

  // remove a node from the beginning of the list
  shift() {
    if (this.length === 0) {
      throw new Error("Empty list");
    }
    if (this.length === 1) {
      this.tail = null;
    }
    const temp = this.head;
    this.head = temp.next;
    this.length--;
    return temp;
  }

  // add a new node to the beginning of the list
  unshift(val) {
    /* 0
    head/tail
    0 -> 1
    head  tail
    0 -> 1 -> 2
    head      tail
    */
    const newNode = new Node(val);
    if (this.length === 0) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    this.length++;
  }

  // Retrieve a node by its position
  get(pos) {
    if (pos >= this.length || pos < 0) {
      throw new Error("Out of bound position");
    }
    var current = this.head;
    for (let i = 0; i < pos; i++) {
      current = current.next;
    }
    return current;
  }

  // change the value of a node based on its position in the list
  set(pos, val) {
    const foundNode = this.get(pos);
    if (foundNode) {
      foundNode.val = val;
      return true;
    }
    return false;
  }

  // insert a node at a specific position
  insert(pos, val) {
    if (pos >= this.length || pos < 0) {
      throw new Error("index out of bound");
    }
    if (pos === this.length) {
      return !!this.push(val);
    } else if (pos === 0) {
      return !!this.unshift(val);
    } else {
      const newNode = new Node(val);
      const prevNode = this.get(pos - 1);
      newNode.next = prevNode.next;
      prevNode.next = newNode;
      this.length++;
      return true;
    }
  }

  // remove a node at a specific position
  remove(pos) {
    if (pos >= this.length || pos < 0) {
      throw new Error("index out of bound");
    }
    if (pos === 0) {
      return this.shift();
    } else if (pos === this.length - 1) {
      return this.pop();
    } else {
      const prevNode = this.get(pos - 1);
      const removedNode = prevNode.next;
      prevNode.next = removedNode.next;
      return removedNode;
    }
  }

  reverse() {
    /* 
    1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7 -> 8 -> null
    head                              tail
    null <- 1 <- 2 <- 3 <- 4 <- 5 <- 6 <- 7 <- 8
          tail                              head
    1 -> 2 -> 3 -> 4      
p   c    n
p <-c
    p    c -> n
    p <- c
         p <- c    n
              p    c    n
    */
    let prevNode = null;
    let currentNode = this.head;
    this.head = this.tail;
    let nextNode;
    this.tail = currentNode;
    while (currentNode) {
      nextNode = currentNode.next;
      currentNode.next = prevNode;
      prevNode = currentNode;
      currentNode = nextNode;
    }
    return this;
  }

  print() {
    if (this.length === 0) {
      console.log("Empty list");
    } else if (this.length === 1) {
      console.log(this.head.val);
    } else {
      let current = this.head;
      while (current) {
        process.stdout.write(current.val);
        process.stdout.write("->");
        current = current.next;
      }
      console.log();
    }
  }
}

const linkedList = new SinglyLinkedList();
linkedList.push("1");
linkedList.push("2");
linkedList.push("3");
linkedList.push("4");
linkedList.push("5");
linkedList.push("6");
linkedList.push("7");
linkedList.push("8");
linkedList.print();
linkedList.reverse();
linkedList.print();
console.log(linkedList.tail);
console.log(linkedList.head);
