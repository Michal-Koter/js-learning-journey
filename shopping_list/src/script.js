let listItemsCount = Number(localStorage.getItem("itemCounter")) || 0; // Used to dynamic assign unique ids

const Icons = {
    TICK: "fa-solid fa-check",
    X: "fa-solid fa-x"
};

function createBtn(itemId, iconClass, clickHandler) {
    const icon = document.createElement("i");
    icon.setAttribute("class", iconClass);

    const button = document.createElement("button");
    button.setAttribute("id", itemId);
    button.classList.add("ml-auto", "p-2", "hover:bg-gray-200", "rounded-full", "transition-colors", "duration-200", "group-hover:text-gray-700");
    button.appendChild(icon);
    button.addEventListener("click", clickHandler);

    return button;
}

function createRedOnlyItem(item) {
    const deleteButton = createBtn(`deleteItem-${item.id}`, Icons.X, onRemoveItem);

    const newItemReadOnly = document.createElement("div");
    newItemReadOnly.innerText = item.text;
    newItemReadOnly.classList.add(
        "flex", "items-center", "w-full", "pl-6", "pr-3", "py-1", "border-y-2", "border-l-2", "border-transparent", "min-h-[48px]",
        "text-lg", "text-gray-700",
        "cursor-pointer", "hover:text-blue-600",
        "transition-colors");
    newItemReadOnly.appendChild(deleteButton);
    newItemReadOnly.addEventListener("click", goToEditMode);
    newItemReadOnly.setAttribute("id", `readOnly-${item.id}`);

    return newItemReadOnly;
}

function createEditableItem(item) {
    const saveButton = createBtn(`saveItem-${item.id}`, Icons.TICK, onSaveEditedItem);

    const itemTextInput = document.createElement("input");
    itemTextInput.type = "text";
    itemTextInput.value = item.text;
    itemTextInput.classList.add("flex-1", "text-lg", "-my-2", "px-3", "py-2", "min-h-[48px]",
        "border-2", "border-blue-400", "rounded",
        "focus:outline-none", "focus:border-blue-600");
    itemTextInput.setAttribute("id", `editTextInput-${item.id}`);

    const newItemEditable = document.createElement("div");
    newItemEditable.style.display = "none";
    newItemEditable.classList.add("flex", "items-center", "gap-2", "w-full", "px-3", "py-2", "min-h-[48px]");
    newItemEditable.setAttribute("id", `editable-${item.id}`);
    newItemEditable.appendChild(itemTextInput);
    newItemEditable.appendChild(saveButton);

    return newItemEditable;
}

function onAddItem(e) {
    e.preventDefault();

    const inputText = e.target.children[0].value;
    if (inputText === "") {
        return;
    }
    e.target.children[0].value = "";

    const item = {
        id: ++listItemsCount,
        text: inputText
    };

    addItemToList(item);
    addItemToStorage(item);
}

function addItemToList(item) {
    const newItemReadOnly = createRedOnlyItem(item);
    const newItemEditable = createEditableItem(item);

    const newItem = document.createElement("li");
    newItem.classList.add("bg-white", "p-4", "rounded-lg", "shadow-md",
        "hover:shadow-lg", "transition-shadow", "duration-200",
        "border", "border-gray-200", "group");
    newItem.appendChild(newItemReadOnly);
    newItem.appendChild(newItemEditable);

    const list = document.getElementsByTagName("ul")[0];
    list.appendChild(newItem);
}

function getItemsFromStorage() {
    let itemFromStorage;
    if (localStorage.getItem("items") === null) {
        itemFromStorage = [];
    } else {
        itemFromStorage = JSON.parse(localStorage.getItem("items"));
    }
    return itemFromStorage;
}

function addItemToStorage(item) {
    let itemFromStorage = getItemsFromStorage();

    itemFromStorage.push(item);
    localStorage.setItem("items", JSON.stringify(itemFromStorage));
    localStorage.setItem("itemCounter", listItemsCount);
}

function onRemoveItem(e) {
    e.stopPropagation();

    const htmlElement = e.currentTarget.parentElement.parentElement;
    const itemId = Number(htmlElement.firstChild.getAttribute("id").split("-")[1]);

    removeItemFromList(htmlElement);
    removeItemFromStorage(itemId);
}

function removeItemFromStorage(itemId) {
    let itemFromStorage = getItemsFromStorage();
    const filteredItems = itemFromStorage.filter(element => element.id !== itemId);
    localStorage.setItem("items", JSON.stringify(filteredItems));
}

function removeItemFromList(htmlElement) {
    const list = document.getElementsByTagName("ul")[0];
    list.removeChild(htmlElement);
}

function goToEditMode(e) {
    if (e.target.tagName === "BUTTON" || e.target.tagName === "I") {
        return;
    }

    const readOnly = e.currentTarget,
        editable = readOnly.nextElementSibling;

    readOnly.style.display = "none";
    editable.style.display = "flex";
}

function onSaveEditedItem(e) {
    const editableElement = e.currentTarget.parentElement,
        newValue = editableElement.children[0].value;
    if (newValue === "") {
        return;
    }

    saveEditedItemToList(editableElement, newValue);
    saveEditedItemToStorage(editableElement, newValue);
}

function saveEditedItemToList(editable, newValue) {
    const readOnly = editable.previousElementSibling,
        btn = readOnly.children[0];

    readOnly.textContent = newValue;
    readOnly.appendChild(btn);

    readOnly.style.display = "flex";
    editable.style.display = "none";
}

function saveEditedItemToStorage(editable, newValue) {
    let itemFromStorage = getItemsFromStorage();
    const itemId = Number(editable.getAttribute("id").split("-")[1]);
    for (let item of itemFromStorage) {
        if (item.id === itemId) {
            item.text = newValue;
        }
    }
    localStorage.setItem("items", JSON.stringify(itemFromStorage));
}

function filterListItems(e) {
    const list = document.getElementsByTagName("ul")[0].children,
        filterValue = e.target.value.toLowerCase();
    for (const listItem of list) {
        const text = listItem.firstChild.innerText.toLowerCase();
        listItem.style.display = text.includes(filterValue) ? "flex" : "none";
    }
}

function onRemoveAllItems() {
    const list = document.getElementsByTagName("ul")[0];
    list.innerHTML = "";

    localStorage.removeItem("items");
    localStorage.removeItem("itemCounter");
}

window.addEventListener("load", () => {
    getItemsFromStorage().forEach(item => addItemToList(item));

    const form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", onAddItem);

    const filterInput = document.getElementById("filter");
    let filterTimeout;
    filterInput.addEventListener("input", (e) => {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => filterListItems(e), 500);
    });

    const clearListBtn = document.getElementById("clear-button");
    clearListBtn.addEventListener("click", onRemoveAllItems);
});

