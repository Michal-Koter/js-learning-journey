let listItemsCount = 0; // Used to dynamic assign unique ids

//TODO: add local storage to save the list items

function addItemToList(e) {
    e.preventDefault();

    const inputText = e.target.children[0].value;
    if (inputText === '') {
        return;
    }
    e.target.children[0].value = '';

    const xIcon = document.createElement('i');
    xIcon.setAttribute('class', 'fa-solid fa-x');

    const deleteButton = document.createElement('button');
    deleteButton.setAttribute("id", `deleteItem-${listItemsCount}`);
    deleteButton.appendChild(xIcon);
    deleteButton.addEventListener('click', removeItemFromList);

    const newItemReadOnly = document.createElement('div');
    newItemReadOnly.innerText = inputText;
    newItemReadOnly.appendChild(deleteButton);
    newItemReadOnly.addEventListener('click', goToEditMode);
    newItemReadOnly.setAttribute('id', `readOnly-${listItemsCount}`);

    const tickIcon = document.createElement('i');
    tickIcon.setAttribute('class', 'fa-solid fa-check');

    const saveButton = document.createElement('button');
    const newItemEditable = document.createElement('div');
    const itemTextInput = document.createElement('input');

    saveButton.setAttribute("id", `saveItem-${listItemsCount}`);
    saveButton.appendChild(tickIcon);
    saveButton.addEventListener('click', saveEditedItem);

    itemTextInput.type = 'text';
    itemTextInput.value = inputText;
    itemTextInput.setAttribute('id', `editTextInput-${listItemsCount}`);

    newItemEditable.style.display = 'none';
    newItemEditable.setAttribute('id', `editable-${listItemsCount}`);
    newItemEditable.appendChild(itemTextInput);
    newItemEditable.appendChild(saveButton);

    const newItem = document.createElement('li');
    newItem.appendChild(newItemReadOnly);
    newItem.appendChild(newItemEditable);


    const list = document.getElementsByTagName('ul')[0];
    list.appendChild(newItem);

    listItemsCount++;
}

function removeItemFromList(e) {
    const list = document.getElementsByTagName('ul')[0];
    list.removeChild(e.currentTarget.parentElement.parentElement);
}

function goToEditMode(e) {
    const readOnly = e.currentTarget,
        editable = readOnly.nextElementSibling,
        listItem = readOnly.parentElement;

    readOnly.style.display = 'none';
    editable.style.display = 'flex';
}

function saveEditedItem(e) {
    const editable = e.currentTarget.parentElement,
        readOnly = editable.previousElementSibling,
        parentItem = editable.parentElement,
        parentElementStringify = JSON.stringify(parentItem);


    const newValue = editable.children[0].value;
    if (newValue === '') {
        return;
    }

    readOnly.insertAdjacentText("afterbegin", newValue);

    readOnly.style.display = 'flex';
    editable.style.display = 'none';
}

function filterListItems(e) {
    const list = document.getElementsByTagName('ul')[0].children,
        filterValue = e.target.value.toLowerCase();
    console.log(list)
    for (const listItem of list ) {
        const text = listItem.firstChild.innerText.toLowerCase();
        listItem.style.display = text.includes(filterValue) ? "flex" : "none";
    }
}

function removeAllItems() {
    const list = document.getElementsByTagName("ul")[0];
    list.innerHTML = "";
}

window.addEventListener('load', () => {
    const form = document.getElementsByTagName('form')[0];
    form.addEventListener('submit', addItemToList);

    const filterInput = document.getElementById("filter");
    let filterTimeout;
    filterInput.addEventListener("input", (e) => {
        clearTimeout(filterTimeout);
        filterTimeout = setTimeout(() => filterListItems(e), 500);
    });

    const clearListBtn = document.getElementById("clear-button");
    clearListBtn.addEventListener("click", removeAllItems);
});

