class LinkedList {
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

  at(index, node = this.#list.head) {
    if (index > this.size() - 1 || index < 0) {
      return undefined;
    }

    if (index == 0) return node.data;
    return this.at(index - 1, node.next);
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

  list() {
    return this.#list;
  }
}

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

const list = new LinkedList();

list.append("Dog");
list.append("Ningen");
list.append("Nigga");
list.append("Asshole");

console.log(list.head());
console.log(list.tail());
console.log(list.at(0));
// console.log(list.pop());
console.log(list.at(0));
console.log(list.contains("Ningen"));
console.log(list.contains("Asshole"));
console.log(list.at(3));
