// const app = {
//     nextIndex: 0,
//     colors: ["green", "blue", "yellow", "red", "purple"],
//     next() {
//         if (this.nextIndex >= this.colors.length) {
//             return { done: true };
//         }
//         return  { value: this.colors[this.nextIndex++], done: false };
//     }
// };
//
// console.log(app.next());
// console.log(app.next());
// console.log(app.next());
// console.log(app.next());
// console.log(app.next());
// console.log(app.next());

const app = {
    colors: ["green", "blue", "yellow", "red", "purple"],
    [Symbol.iterator]: function () {
        let nextIndex = 0;
        return {
            next: () => {
                return nextIndex < this.colors.length
                    ? { value: this.colors[nextIndex++], done: false }
                    : { done: true };
            }
        };
    }
};

const iterator = app[Symbol.iterator]();

for (const color of app) {
    console.log(color);
}