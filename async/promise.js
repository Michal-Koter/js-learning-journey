const posts = [
    { title: "Post Two", body: "This is post two" },
    { title: "Post Three", body: "This is post three" }
];

function createPost(post) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let error = false;

            if (!error) {
                posts.push(post);
                resolve();
            } else {
                reject("Something went wrong");
            }
        }, 2000);
    });
}

function getPosts() {
    setTimeout(() => {
        posts.forEach(post => {
            console.log(post);
        });
    });
}

function showError(err) {
    console.log(err);
}

createPost({ title: "Post One", body: "This is post" })
    .then(getPosts)
    .catch(showError);