/** Node: node for a singly linked list. */

class DoubleNode {
  constructor(val) {
    this.val = val;
    this.next = null;
    this.previous = null;
  }
}

/** LinkedList: chained together nodes. */

class DoublyLinkedList {
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

  reverse() {
    let currentNode = this.tail;
    while (currentNode) {
      const newPrevious = currentNode.next;
      currentNode.next = currentNode.previous;
      currentNode.previous = newPrevious;
      currentNode = currentNode.next;
    }
    const newHead = this.tail;
    this.tail = this.head;
    this.head = newHead;
  }
  search(idx) {
    const midPoint = this.length / 2;
    if (idx < midPoint) {
      return this.searchForward(idx);
    } else {
      return this.searchBackward(idx);
    }
  }
  searchForward(idx) {
    let currentNode = this.head;
    for (let i = 0; i < this.length; i++) {
      if (i === idx) {
        return currentNode
      }
      currentNode = currentNode.next;
    }
  }

  searchBackward(idx) {
    let currentNode = this.tail;
    for (let i = this.length - 1; i >= 0; i--) {
      if (i === idx) {
        return currentNode
      }
      currentNode = currentNode.previous;
    }
  }

  traverse() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.val)
      currentNode = currentNode.next;

    }
  }
  push(val) {
    // Append to end of list
    const newNode = new DoubleNode(val);
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      const currentTail = this.tail;
      currentTail.next = newNode;
      this.tail = newNode;
      this.tail.previous = currentTail;
    }
    this.length += 1;
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    if (!this.head) return this.push(val); // if we have an empty list just push
    const newNode = new DoubleNode(val);
    const currentHead = this.head;
    newNode.next = currentHead;
    currentHead.previous = newNode;
    this.head = newNode;

    this.length += 1;

  }

  /** pop(): return & remove last item. */

  pop() {
    this.isEmpty()
    const tail = this.tail;

    if (this.isSingleItem()) {
    } else {
      this.tail = this.tail.previous;
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
      newHead.previous = null;
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

    const foundNode = this.search(idx)
    return foundNode.val

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

    const foundNode = this.search(idx);
    foundNode.val = val;

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
    let newNode = new DoubleNode(val)
    const foundNode = this.search(idx);
    foundNode.previous.next = newNode;
    newNode.next = foundNode;
    this.length += 1;

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

    const foundNode = this.search(idx);

    foundNode.previous.next = foundNode.next;
    foundNode.next = null;
    this.length -= 1;
    return foundNode.val

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
}

const doubleTrains = new DoublyLinkedList(['Engine', 'Passenger Car 1', 'Passenger Car 2', 'Caboose'])
//module.exports = LinkedList;


const aList = new DoublyLinkedList([1, 3, 5, 7, 9, 11])
const bList = new DoublyLinkedList([2, 4, 6, 8, 10, 12])

function sorter(a, b) {
  const sortedList = new DoublyLinkedList();
  while (a.length > 0 || b.length > 0) {
    let valA = null;
    let valB = null;
    try {
      valA = a.shift();
    } catch {

    }

    try {
      valB = b.shift();
    } catch {
    }

    if (valA === null) {
      sortedList.push(valB)
    } else if (valB === null) {
      sortedList.push(valA)
    }

    if (valA > valB) {
      sortedList.push(valB);
      sortedList.push(valA);
    } else {
      sortedList.push(valA);
      sortedList.push(valB);
    }
  }

  sortedList.traverse();
}

// sorter(bList, aList)