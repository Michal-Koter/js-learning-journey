// Construction method
function Rectangle(name, width, height) {
    this.name = name;
    this.width = width;
    this.height = height;
}

// Add method to prototype
Rectangle.prototype.area = function() {
    return this.width * this.height;
};

const rect = new Rectangle("rect", 10, 10);

console.log(rect);
console.log(rect.area());


// Alternative way to define prototype
const rectanglePrototype = {
    area: function() {
        return this.height * this.width;
    },
    perimeter: function() {
        return 2 * (this.height + this.width);
    },
    isSquare: function() {
        return this.height === this.width;
    }
};

function createRectangle(height, width) {
    return Object.create(rectanglePrototype, {
        height: {
            value: height
        },
        width: {
            value: width
        }
    })
}

const rect2 = createRectangle(10, 10);
console.log(rect2.area())


// Prototype Inheritance
function Shape(name) {
    this.name = name;
}

Shape.prototype.logName = function() {
    console.log(this.name);
}

function Circle(name, radius) {
    Shape.call(this, name);

    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype)

// Override prototype method
Circle.prototype.logName = function() {
    console.log(`Circle name: ${this.name}`);
}

const circle = new Circle("circle", 5);
circle.logName();