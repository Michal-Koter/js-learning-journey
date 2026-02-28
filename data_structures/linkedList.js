class LinkedList {

    constructor() {
        this._head = null;
        this._length = 0;
    }

    insertFirst(value) {
        const node = new Node(value);
        node.next = this._head;
        this._head = node;
        this._length++;
    }

    insertLast(value) {
        let current = this._head;
        while (current.next) {
            current = current.next;
        }

        current.next = new Node(value);
        this._length++;
    }

    insertAt(value, index) {
        if (index > this._length || index < 0) {
            throw new RangeError();
        }

        if (index === 0) {
            this.insertFirst(value);
            return;
        } else if (index === this._length) {
            this.insertLast(value);
            return;
        }

        let current = this._head,
            previous = null;
        for (let i = 0; i < index; i++) {
            previous = current;
            current = current.next;
        }

        const newNode = new Node(value);
        previous.next = newNode;
        newNode.next = current;
        this._length++;
    }

    getAt(index) {
        if (index >= this._length || index < 0) {
            throw new RangeError();
        }

        let current = this._head;

        for (let i = 0; i < index; i++) {
            current = current.next;
        }

        return current;
    }

    removeAt(index) {
        if (index >= this._length || index < 0) {
            throw new RangeError();
        }

        let current = this._head,
            previous = null;

        for (let i = 0; i < index; i++) {
            previous = current;
            current = current.next;
        }

        previous.next = current.next;
        this._length--;
    }

    printListDate() {
        let current = this._head,
            list = '';

        while (current) {
            list += current.value + " ";
            current = current.next;
        }

        console.log(list);
    }

    clearList() {
        this._head = null;
        this._length = 0;
    }
}

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

const linkedList = new LinkedList();

linkedList.insertFirst("Item_1");
linkedList.insertFirst("Item_2");

linkedList.insertLast("Item_3");
linkedList.insertLast("Item_4");

linkedList.insertAt("Item_5", 3);

linkedList.printListDate()

console.log(linkedList.getAt(2));

linkedList.removeAt(2);
linkedList.printListDate()