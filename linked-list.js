/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.visited = false;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** push(val): add new value to end of list. */

  isEmpty(){
    if (this.head === null) throw 'The list is empty!';

  }

  isSingleItem() {
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
      return true;
  }
    return false;
  }

  invalidIndex(idx) {
    if (idx < 0 || idx > this.length -1) throw 'Invalid Index';
  }
  push(val) {
    const newNode = new Node(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    if (!this.head) return this.push(val); // if we have an empty list just push
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
    this.length += 1;

  }

  /** pop(): return & remove last item. */

  pop() {
    this.isEmpty()
    const tail = this.tail;

    if (this.isSingleItem()) {
    } else {
      let currentNode = this.head;
      while (currentNode.next.next) {
        currentNode = currentNode.next;
      }
      this.tail = currentNode;
      this.tail.next = null;
    }

    this.length -= 1

    return tail.val;

  }

  /** shift(): return & remove first item. */

  shift() {
    // The list is empty
    this.isEmpty()
    const oldHead = this.head;
    if (this.isSingleItem()) {
      // The list has only one item in it
      // We don't need to do anything the previous function does it all for us
    } else {
      // Replace the head
      const newHead = this.head.next;
      this.head.next = null;
      this.head = newHead;
    }
    this.length -= 1;
    return oldHead.val

  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    this.invalidIndex(idx)
    // The list is empty
    this.isEmpty()

    // We are getting the last item in the list
    if (idx === this.length - 1) {
      return this.tail.val
    }

    let currentNode = this.head;
    for (let i = 0; i < this.length; i++) {
      if (i === idx) return currentNode.val;
      currentNode = currentNode.next;
    }

  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    this.invalidIndex(idx)
    // The list is empty
    this.isEmpty()

    // We are setting the last item in the list
    if (idx === this.length - 1) {
      this.tail.val = val;
      return
    }

    let currentNode = this.head;
    for (let i = 0; i < this.length; i++) {
      if (i === idx) {
        currentNode.val = val;
        return
      }
      currentNode = currentNode.next;
    }
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    // We are adding at the start of the list
    if (idx === 0 || this.head === null) {
      this.unshift(val)
      return
    }

    this.invalidIndex(idx)

    // We are adding at the end of the list
    if (idx === this.length - 1) {
      this.push(val)
      return
    }
    let newNode = new Node(val)
    let currentNode = this.head;
    let previousNode = null;
    for (let i = 0; i < this.length; i++) {
      if (i === idx) {
        previousNode.next = newNode;
        newNode.next = currentNode
        this.length += 1;
        return
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {

    this.invalidIndex(idx)
    // The list is empty
    this.isEmpty()

    // We are removing from the start of the list
    if (idx === 0) {
      this.shift()
      return
    }

    // We are adding at the end of the list
    if (idx === this.length - 1) {
      this.pop()
      return
    }

    let currentNode = this.head;
    let previousNode = null;
    for (let i = 0; i < this.length; i++) {
      if (i === idx) {
        previousNode.next = currentNode.next;
        currentNode.next = null;
        this.length -= 1;
        return currentNode.val
      }
      previousNode = currentNode;
      currentNode = currentNode.next;
    }

  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.head === null) return 0;

    let total = 0;
    let currentNode = this.head;
    for (let i = 0; i < this.length; i++) {
      total += currentNode.val;
      currentNode = currentNode.next;
    }

    return total / this.length
  }

  traverse() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.val)
      currentNode = currentNode.next;

    }
  }

  asList() {
    const classicList = [];
    let currentNode = this.head;
    console.log('Head is', this.head)
    while (currentNode) {
      classicList.push([currentNode.val, currentNode.next]);
      currentNode = currentNode.next;

    }
    return classicList;

  }
  pivot(val) {
    let currentNode = this.head;
    let lastUnmoved = null;
    while (!currentNode.visited) {
      const nextNode = currentNode.next; // we backup the next node

      if (currentNode.val >= val) {
        // Move the node to the end
        this.tail.next = currentNode;
        this.tail = currentNode;
        this.tail.next = null;
        this.tail.visited = true;
        if (lastUnmoved === null) {
          // We never set a new head
          this.head = nextNode; // the next node becomes the head
          } else {
          // We have an unmoved head
          lastUnmoved.next = nextNode;
        }
      } else {
        // We are keeping the node where it is record it as un moved
        lastUnmoved = currentNode;
      }

      currentNode.visited = true;
      if (nextNode != null) {
        currentNode = nextNode

      }
    }

  }

}

const trains = new LinkedList(['Engine', 'Passenger Car 1', 'Passenger Car 2', 'Caboose'])

let ll = new LinkedList([7, 6, 2, 5, 3, 5, 9, 1, 1])
ll.pivot(5)
ll.traverse()


