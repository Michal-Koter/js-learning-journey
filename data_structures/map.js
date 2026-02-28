const myMap = new Map();

myMap.set("name", "Adam");
myMap.set(1, "blue");
myMap.set(2, "red");

console.log(myMap.get("name"));
console.log(myMap.get(1));
console.log(myMap.get(2));

console.log(myMap.size);

console.log(myMap.has(1));
console.log(myMap.has(3));

myMap.delete(2);
console.log(myMap);

const peopleMap = new Map();
peopleMap.set("brad", {phone: "123456789", email: "brad@example.com"})
peopleMap.set("jack", {phone: "123456789", email: "jack@example.com"})
peopleMap.set("ada", {phone: "123456789", email: "ada@example.com"})

peopleMap.forEach((person) => console.log(person.email))

console.log(peopleMap.keys());
console.log(peopleMap.values());
console.log(peopleMap.entries());

const iterator = peopleMap.values();

console.log(iterator.next());

const arr = Array.from(peopleMap);