fetch("./data.json")
    .then((response) => response.json())
    .then((data) => console.log(data));


fetch("./data.txt")
    .then((response) => response.text())
    .then((data) => console.log(data));

fetch("https://api.github.com/users/Michal-Koter")
    .then((response) => response.json())
    .then((data) => console.log(data));


function createPost({ title, body }) {
    fetch("https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST", body: JSON.stringify({
                title,
                body
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        .then(res => res.json())
        .then((data) => console.log(data));
}

createPost({ title: "Post One", body: "This is post" });