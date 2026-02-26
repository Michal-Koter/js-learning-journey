function* createColorIterator(colors) {
    for (let i=0; i<colors.length; i++) {
        yield colors[i];
    }
}

const colors = ["green", "blue", "yellow", "red", "purple"];

const iterator = createColorIterator(colors);

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());


for (const color of createColorIterator(colors)) {
    console.log(color);
}

console.log(...createColorIterator(colors));

const [first, second, third] = createColorIterator(colors);
console.log(first, second, third);