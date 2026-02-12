const apiURL = "https://jsonplaceholder.typicode.com/todos";

function addTodoToDOM(todo) {
    const div = document.createElement("div");
    div.classList.add("todo");
    div.appendChild(document.createTextNode(todo.title));
    div.setAttribute("data-id", todo.id);
    if (todo.completed) div.classList.add("done");
    document.getElementById("todo-list").appendChild(div);
}

function getTodos() {
    fetch(`${apiURL}?_limit=5`)
        .then(res => res.json())
        .then(data => {
            data.forEach((todo) => addTodoToDOM(todo));
        });
}

function createTodo(e) {
    e.preventDefault();
    const input = e.target.firstElementChild,
        value = input.value.trim();
    input.value = "";

    if (value === "") return;

    const newTodo = {
        title: value,
        completed: false
    };

    fetch(apiURL, {
        method: "POST",
        body: JSON.stringify(newTodo),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(res => res.json())
        .then(data => addTodoToDOM(data));
}

function toggleCompleted(e) {
    if (!e.target.classList.contains("todo")) return;
    e.target.classList.toggle("done");

    updateTodo(e.target.dataset.id, e.target.classList.contains("done"));
}

function updateTodo(id, completed) {
    fetch(`${apiURL}/${id}`, {
        method: "PUT",
        body: JSON.stringify({ completed }),
        headers: {
            "Content-Type": "application/json"
        }
    });
}

function deleteTodo(e) {
    if (!e.target.classList.contains("todo")) return;

    const id = e.target.dataset.id;
    fetch(`${apiURL}/${id}`, {
        method: "DELETE"
    })
        .then(res => res.json())
        .then(() => e.target.remove());
}

function init() {
    document.addEventListener("DOMContentLoaded", getTodos);
    document.querySelector("#todo-form").addEventListener("submit", createTodo);
    document.querySelector("#todo-list").addEventListener("click", toggleCompleted);
    document.querySelector("#todo-list").addEventListener("dblclick", deleteTodo);

}

init();