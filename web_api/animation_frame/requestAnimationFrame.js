let start;
let done = false;
const image = document.querySelector("img");

function step(timestamp) {
    if (start === undefined) start = timestamp;

    const elapse = timestamp - start;

    if (elapse > 2000) done = true;
    if (done) return;

    image.style.transform = `translateX(${elapse / 10}px) rotate(${elapse / 10}deg)`;

    requestAnimationFrame(step);
}

requestAnimationFrame(step);