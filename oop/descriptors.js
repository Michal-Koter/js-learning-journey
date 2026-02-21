const recObj = {
    name: "Rectangle",
    width: 10,
    height: 10
};
console.log(recObj);

Object.defineProperty(recObj, "name", {
    writable: false,
    configurable: false,
    enumerable: false,
});

let descriptor = Object.getOwnPropertyDescriptor(recObj, "name");
console.log(descriptor);

recObj.name = "New Name";
console.log(recObj);


const circleObj = {
    name: "Circle",
    radius: 10,
};

// Prevent to add or remove field value, allow to modify existing
Object.seal(circleObj);
console.log("circleObj is sealed? " + Object.isSealed(circleObj));
console.log("circleObj is frozen? " + Object.isFrozen(circleObj));

descriptor = Object.getOwnPropertyDescriptor(circleObj, "name");
console.log(descriptor);

circleObj.color = "red";
delete recObj.name;

circleObj.radius = 20;

console.log(circleObj);


let triangleObj = {
    name: "Triangle",
    base: 3,
    height: 4
}

// Prevent to add, remove and modify fields
Object.freeze(triangleObj);
console.log("triangleObj is sealed? " + Object.isSealed(triangleObj));
console.log("triangleObj is frozen? " + Object.isFrozen(triangleObj));

descriptor = Object.getOwnPropertyDescriptor(triangleObj, "name");
console.log(descriptor);

triangleObj.color = "green";
triangleObj.radius = 20;

console.log(triangleObj);