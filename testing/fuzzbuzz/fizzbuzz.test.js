const fizzBuzz = require("./fizzbuzz");

describe("Testing FizzBuzz Test", () => {
    it("Should be a function", () => {
        expect(typeof fizzBuzz).toEqual("function");
    });

    it("Should return the number if not divisible by 3 or 5", () => {
        expect(fizzBuzz(2)).toEqual("2");
        expect(fizzBuzz(7)).toEqual("7");
        expect(fizzBuzz(11)).toEqual("11");
    });

    it("Should return Fizz if divisible by 3 and not by 5", () => {
        expect(fizzBuzz(3)).toEqual("Fizz");
        expect(fizzBuzz(9)).toEqual("Fizz");
    });

    it("Should return Buzz if divisible by 5 and not by 3", () => {
        expect(fizzBuzz(5)).toEqual("Buzz");
        expect(fizzBuzz(25)).toEqual("Buzz");
    });

    it("Should return FizzBuzz if divisible by 3 and 5", () => {
        expect(fizzBuzz(15)).toEqual("FizzBuzz");
        expect(fizzBuzz(30)).toEqual("FizzBuzz");
    });

})