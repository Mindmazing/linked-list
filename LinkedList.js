export class LinkedList {
  #list = { head: undefined };
  #size = 0;

  append(data, node = this.#list.head) {
    if (!node) {
      this.#size++;
      this.#list.head = new Node(data);
      return;
    }

    if (!node.next) {
      this.#size++;
      node.next = new Node(data);
      return;
    }

    this.append(data, node.next);
  }

  // prepend on linked list -> O(1) constant time
  prepend(data) {
    const newNode = new Node(data);
    newNode.next = this.#list.head;
    this.#list.head = newNode;
    this.#size++;
  }

  size() {
    return this.#size;
  }

  head() {
    if (!this.#list.head) return undefined;
    return this.#list.head.data;
  }

  tail(node = this.#list.head) {
    if (!node) return undefined;
    if (!node.next) {
      return node.data;
    }
    return this.tail(node.next);
  }

  at(index, node = this.#list.head, returnNode = false) {
    if (index > this.size() - 1 || index < 0) {
      return undefined;
    }

    if (index == 0) {
      if (returnNode) return node;
      return node.data;
    }

    return this.at(index - 1, node.next, returnNode);
  }

  pop() {
    if (this.#list.head) {
      let firstNode = this.#list.head;
      this.#list.head = firstNode.next;
      this.#size--;
      return firstNode.data;
    }
    return undefined;
  }

  contains(value) {
    let currentNode = this.#list.head;
    if (!currentNode) return false;

    for (let i = 0; i < this.size(); i++) {
      if (currentNode.data === value) {
        return true;
      }
      currentNode = currentNode.next;
    }

    return false;
  }

  findIndex(value) {
    if (!this.contains(value)) {
      return -1;
    }
    let currentNode = this.#list.head;
    for (let i = 0; i < this.size(); i++) {
      if (currentNode.data === value) {
        return i;
      }
      currentNode = currentNode.next;
    }
  }

  toString() {
    let listString = "";
    let currentNode = this.#list.head;
    for (let i = 0; i < this.size(); i++) {
      listString += `( ${currentNode.data} ) -> `;
      currentNode = currentNode.next;
    }
    listString += "null";
    return listString;
  }

  insertAt(index, ...values) {
    // check if index is valid
    if (index > this.size() || index < 0) {
      throw new RangeError("Index out of range");
    }

    // if parent node is head, change parent node to first value
    let originalNode, parentNode;
    if (!index) {
      originalNode = this.#list.head;
      parentNode = new Node(values[0]);
      this.#list.head = parentNode;
      this.#size++;
    } else {
      // get parent node a
      parentNode = this.at(index - 1, this.#list.head, true);
      originalNode = parentNode.next;
    }

    // insert new nodes -> O(n)
    for (let i = index === 0 ? 1 : 0; i < values.length; i++) {
      parentNode.next = new Node(values[i]);
      parentNode = parentNode.next;
      this.#size++;
    }
    parentNode.next = originalNode;
  }

  removeAt(index) {
    // validate index
    if (index >= this.size() || index < 0) {
      throw new RangeError("Index out of range");
    }

    // special case for head node
    let nextNode;
    if (!index) {
      nextNode = this.#list.head.next;
      this.#list.head = nextNode;
    }
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}
