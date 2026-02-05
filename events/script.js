/**
 * Learn how to handle event in JavaScript
 * use only examples DOM elements to demonstrate event type and event handling
 */


// Don't add event listeners directly in HTML files.
// Instead, use the JS files to add event listeners to the DOM elements.

function onClick() {
    alert('Button clicked!');
}

const clearBtn = document.querySelector('#clear-btn');
clearBtn.addEventListener('click', () => onClick);

// When use addEventListener multiple times on the same element and event type,
// all the event listeners will be executed in the order they were added.
// When use direct assigning to the event property (e.g., element.onclick = ...),
// it will overwrite any previously assigned event handlers for that event type.
clearBtn.addEventListener('click', () => console.log('Clear button clicked!'));


// To remove an event listener, use the removeEventListener method.
// setTimeout(() => clearBtn.removeEventListener('click', onClick), 5000);

// Fire the click event programmatically after 5 seconds
setTimeout(() => clearBtn.click(), 5000);


// Mouse events
const item = document.querySelector('.item');

item.addEventListener('click', () => onClick());
item.addEventListener('dblclick', () => alert('Item double clicked!'));
item.addEventListener('contextmenu', (e) => {}); // Right click
item.addEventListener('mousedown', () => console.log('Mouse down on item'));
item.addEventListener('mouseup', () => console.log('Mouse up on item'));
item.addEventListener('wheel', () => console.log('Mouse wheel on item')); // Scroll
item.addEventListener('mouseover', () => console.log('Mouse over item')); // Hover
item.addEventListener('mouseout', () => console.log('Mouse out of item')); // Unhover
item.addEventListener('dragstart', () => console.log('Drag start on item')); // Drag and drop
item.addEventListener('drag', () => console.log('Dragging item')); // Drag and drop
item.addEventListener('dragend', () => console.log('Drag end on item')); // Drag and drop

// Event Object
item.addEventListener('click', (event) => console.log(event));

// target = the element that triggered the event
// currentTarget = the element that the event listener is attached to
// type = the type of event
// timestamp = the time the event was created


// Keyboard events
const input = document.querySelector('#input-field');

input.addEventListener('keypress', (e) => {
    console.log('keypress:', e.key);
});
input.addEventListener('keydown', (e) => {
    console.log('keydown:', e.key);
});
input.addEventListener('keyup', (e) => {
    console.log('keyup:', e.key);
});

// const onInput = (e) => {
//   console.log('Key: ', e.key);
//   console.log('Code: ', e.code);
//   console.log('Key Code: ', e.keyCode);
//   if (e.repeat) console.log('Repeat: ', e.repeat);
// };


// Input events
const itemInput = document.querySelector('#item-input'),
    priorityInput = document.querySelector('#priority-input'),
    checkboxInput = document.querySelector('#checkbox-input'),
    heading = document.querySelector('#heading');

function onInput(e) {
    console.log(e.target.value);
}

function onCheck(e) {
    console.log(e.target.checked);
}

itemInput.addEventListener('input', onInput); // Fires every time the value changes
priorityInput.addEventListener('change', onInput); // Fires when the input loses focus and its value has changed
checkboxInput.addEventListener('input', onCheck);
itemInput.addEventListener('focus', () => console.log('Input focused'));
itemInput.addEventListener('blur', () => console.log('Input blurred'));


// Form events
const form = document.querySelector('#item-form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const item = document.getElementById('item-input').value;
    const priority = document.getElementById('priority-input').value;

    if (item === '' || priority === '0') {
        alert('Input item is required!');
        return;
    }

    console.log(item, priority);
});

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form),
        item = formData.get('item'),
        priority = formData.get('priority'),
        entries = formData.entries();

    console.log('Form get: ', item, priority);

    console.log('Entries: ');
    for (const entry of entries) {
        console.log(entry[1]);
    }
});

// Event propagation (bubbling)
// When an event is triggered on an element, it first runs the handlers on it,
// then on its parent, then all the way up on other ancestors. This is called bubbling.

// Event delegation

// Event listener approach
const listItem = document.querySelectorAll('li');
listItem.forEach(item => {
    item.addEventListener('click', (e) => {
        e.target.remove();
    });
});

// Event delegation approach
const list = document.querySelector('ul');
list.addEventListener('click', (e) => {
    if (e.target.tagName === 'li') {
        e.target.remove();
    }
});

