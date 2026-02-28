class Queue {
    constructor() {
        this._items = [];
        this._count = 0;
        this._front = 0;
    }

    enqueue(item){
        this._items[this._count++] = item;
    }

    dequeue() {
        if (this.isEmpty()) {
            return "Underflow"
        }

        const item = this._items[this._front];
        this._count--;

        for (let i = this._front; i < this._count; i++) {
            this._items[i] = this._items[i + 1];
        }

        this._items.length = this._count;
        return item;
    }

    peek() {
        if (this.isEmpty()) {
            return "No item in queue";
        }

        return this._items[this._front];
    }

    isEmpty() {
        return this._count === 0;
    }

    length() {
        return this._count;
    }

    clear() {
        this._items = [];
        this._count = 0;
    }
}

const queue = new Queue();

queue.enqueue("Item 1");
queue.enqueue("Item 2");
queue.enqueue("Item 3");
queue.enqueue("Item 4");

console.log(queue);

queue.dequeue()

console.log(queue);