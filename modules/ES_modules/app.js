import { capitalizeWords, makeMoney } from "./modules/utils.js";
import Person from "./modules/Person.js";

console.log(capitalizeWords("hello world"));
console.log(makeMoney(100));

const person = new Person("Adam", 29);
person.greet();