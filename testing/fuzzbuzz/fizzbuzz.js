function fizzBuzz(num) {
    let response = "";
    if (num % 3 === 0) response += "Fizz";
    if (num % 5 === 0) response += "Buzz";
    if (response === "") response += num;
    return response;
}

module.exports = fizzBuzz;