// const config = require("../jest.config")
const getElementByTag = require("./getelementbytag");

describe("Get elements by tag", () => {
    it("should be a function", () => {
        expect(typeof getElementByTag).toBe("function");
    });

    it("should return an array", () => {
        expect(Array.isArray(getElementByTag())).toEqual(true);
    });

    it("should return an empty array if not root is passed in", () => {
        expect(getElementByTag()).toEqual([]);
    });

    it("should return only the root element if no tag is passed in", () => {
        const root = document.createElement("div");
        expect(getElementByTag(root)).toEqual([root]);
    })

    it("should return the correct elements", () => {
        const root = document.createElement("div");

        const p1 = document.createElement("p");
        const p2 = document.createElement("p");
        const span = document.createElement("span");

        root.appendChild(p1);
        root.appendChild(span);
        span.appendChild(p2);

        expect(getElementByTag(root, "p")).toEqual([p1, p2]);
    })
})