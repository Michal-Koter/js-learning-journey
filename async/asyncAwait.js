const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve({ name: "John", age: 20 });
    }, 1000);
});

async function getPromise() {
    const response = await promise;
    console.log(response);
}


async function getUser() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data = await res.json();
    console.log(data);
}

const getPosts = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await res.json();
    console.log(data);
}

// Fetch multiple resources
async function getAllData1() {
    const [usersRes, postsRes, commentsRes] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users"),
        fetch("https://jsonplaceholder.typicode.com/posts"),
        fetch("https://jsonplaceholder.typicode.com/comments")
    ]);

    const users = await usersRes.json();
    const posts = await postsRes.json();
    const comments = await commentsRes.json();

    console.log(users, posts, comments);
}

async function getAllData2() {
    const [users, posts, comments] = await Promise.all([
        fetch("https://jsonplaceholder.typicode.com/users").then(res => res.json()),
        fetch("https://jsonplaceholder.typicode.com/posts").then(res => res.json()),
        fetch("https://jsonplaceholder.typicode.com/comments").then(res => res.json())
    ]);

    console.log(users, posts, comments);
}