class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  insertFirst(item) {
    this.head = new _Node(item, null);
  }
  insertLast(item) {
    if (this.head === null) this.insertFirst(item);
    else {
      let tempNode = this.head;
      while (tempNode.next !== null) tempNode = tempNode.next;
      tempNode.next = new _Node(item, null);
    }
  }
  remove(item) {
    if (!this.head) return null;
    if (this.head.value.key === item) {
      this.head = this.head.next;
      return;
    }
    let currNode = this.head;
    let previousNode = this.head;
    while (currNode !== null && currNode.value.key !== item) {
      previousNode = currNode;
      currNode = currNode.next;
    }
    if (currNode === null) {
      console.log('Item not found');
      return;
    }
    previousNode.next = currNode.next;
  }
  find(item) {
    let currNode = this.head;
    if (!this.head) {
      return null;
    }
    while (currNode.value.key !== item) {
      if (currNode.next === null) {
        return null;
      } else {
        currNode = currNode.next;
      }
    }
    return currNode.value.value;
  }
}

class HashMapChain {
  constructor(initialCapacity = 8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    return this._hashTable[index].find(key);
  }

  set(key, value) {
    //Find the slot where this key should be in
    const index = this._findSlot(key);

    /*if(!this._hashTable[index]){
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    }; */

    if (!this._hashTable[index]) {
      this._hashTable[index] = new LinkedList();
    }

    if (this._hashTable[index].find(key)) {
      this._hashTable[index].remove(key);
    } else {
      this.length++;
    }

    this._hashTable[index].insertLast({ key, value });
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.remove(key);
    this.length--;
  }

  _findSlot(key) {
    const hash = HashMapChain._hashString(key);
    const index = hash % this._capacity;
    return index;
    /*for (let i = start; i < start + this._capacity; i++) {
        const index = i % this._capacity;
        const slot = this._hashTable[index];
        if (slot === undefined || (slot.key === key && !slot.DELETED)) {
          return index;
        }
      }*/
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //Bitwise left shift with 5 0s - this would be similar to
      //hash*31, 31 being the decent prime number
      //but bit shifting is a faster way to do this
      //tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //converting hash to a 32 bit integer
      hash = hash & hash;
    }
    //making sure has is unsigned - meaning non-negtive number.
    return hash >>> 0;
  }
}

module.exports = HashMapChain;
