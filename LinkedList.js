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
