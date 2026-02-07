let listItemsCount = 0; // Used to dynamic assign unique ids

//TODO: add local storage to save the list items

const Icons = {
    TICK: "fa-solid fa-check",
    X: "fa-solid fa-x"
};

function createBtn(itemId, iconClass, clickHandler) {
    const icon = document.createElement("i");
    icon.setAttribute("class", iconClass);

    const button = document.createElement("button");
    button.setAttribute("id", itemId);
    button.appendChild(icon);
    button.addEventListener("click", clickHandler);

    return button;
}

function createRedOnlyItem(text, itemId) {
    const deleteButton = createBtn(`deleteItem-${itemId}`, Icons.X, removeItemFromList);

    const newItemReadOnly = document.createElement("div");
    newItemReadOnly.innerText = text;
    newItemReadOnly.appendChild(deleteButton);
    newItemReadOnly.addEventListener("click", goToEditMode);
    newItemReadOnly.setAttribute("id", `readOnly-${itemId}`);

    return newItemReadOnly;
}

function creteEditableItem(text, itemId) {
    const saveButton = createBtn(`saveItem-${itemId}`, Icons.TICK, saveEditedItem);

    const itemTextInput = document.createElement("input");
    itemTextInput.type = "text";
    itemTextInput.value = text;
    itemTextInput.setAttribute("id", `editTextInput-${itemId}`);

    const newItemEditable = document.createElement("div");
    newItemEditable.style.display = "none";
    newItemEditable.setAttribute("id", `editable-${itemId}`);
    newItemEditable.appendChild(itemTextInput);
    newItemEditable.appendChild(saveButton);

    return newItemEditable;
}

function createListItem(text, itemId) {
    const newItemReadOnly = createRedOnlyItem(text, itemId);
    const newItemEditable = creteEditableItem(text, itemId);

    const newItem = document.createElement("li");
    newItem.appendChild(newItemReadOnly);
    newItem.appendChild(newItemEditable);

    return newItem;
}

function addItemToList(e) {
    e.preventDefault();

    const inputText = e.target.children[0].value;
    if (inputText === "") {
        return;
    }
    e.target.children[0].value = "";

    const newItem = createListItem(inputText, listItemsCount);

    const list = document.getElementsByTagName("ul")[0];
    list.appendChild(newItem);

    listItemsCount++;
}

function removeItemFromList(e) {
    const list = document.getElementsByTagName("ul")[0];
    list.removeChild(e.currentTarget.parentElement.parentElement);
}

function goToEditMode(e) {
    const readOnly = e.currentTarget,
        editable = readOnly.nextElementSibling;

    readOnly.style.display = "none";
    editable.style.display = "flex";
}

function saveEditedItem(e) {
    const editable = e.currentTarget.parentElement,
        readOnly = editable.previousElementSibling;

    const newValue = editable.children[0].value;
    if (newValue === "") {
        return;
    }

    readOnly.insertAdjacentText("afterbegin", newValue);

    readOnly.style.display = "flex";
    editable.style.display = "none";
}

function filterListItems(e) {
    const list = document.getElementsByTagName("ul")[0].children,
        filterValue = e.target.value.toLowerCase();
    for (const listItem of list) {
        const text = listItem.firstChild.innerText.toLowerCase();
        listItem.style.display = text.includes(filterValue) ? "flex" : "none";
    }
}

function removeAllItems() {
    const list = document.getElementsByTagName("ul")[0];
    list.innerHTML = "";
}

window.addEventListener("load", () => {
    const form = document.getElementsByTagName("form")[0];
    form.addEventListener("submit", addItemToList);

    const filterInput = document.getElementById("filter");
    let filterTimeout;
    filterInput.addEventListener("input", (e) => {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => filterListItems(e), 500);
    });

    const clearListBtn = document.getElementById("clear-button");
    clearListBtn.addEventListener("click", removeAllItems);
});

