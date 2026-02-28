const set = new Set([1, 2, 3, 4]);

set.add(5);


console.log(set.has(3));
console.log(set.has(7));

set.delete(1);

console.log(set);

const arr = Array.from(set);
console.log(arr);

for (let item of set) {
    console.log(item);
}

const iterator = set.values();
console.log(iterator.next());

set.clear()
console.log(set);