class Shape {
    constructor(name) {
        this._name = name;
    }

    logName() {
        console.log("Shape Name: " + this.name);
    }

    // Modern approach to create getters and setters
    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }
}

class Rectangle extends Shape {
    // Real private field, which is not accessible outside of class whithout getter/setter
    // ES2022
    #width
    #height

    constructor(name) {
        super(name);
    }

    area() {
        return this._width * this._height;
    }

    isSquare() {
        return this._width === this._width;
    }

    // Example of static method
    static getClass() {
        return "Rectangle";
    }


    get width() {
        return this.#width;
    }

    set width(value) {
        this.#width = value;
    }

    get height() {
        return this.#height;
    }

    set height(value) {
        this.#height = value;
    }
}

const square = new Rectangle("Square");
square.width = 20;
square.height = 20;


class App {
    constructor() {
        this.serverName = "localhost";

        // Example of use bind()
        document.querySelector("button")
            .addEventListener("click",  this.getServerName.bind(this));
    }

    getServerName() {
        console.log(this.serverName);
    }
}

const app = new App();

