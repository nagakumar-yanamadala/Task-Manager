const toDoList = [];
const form = document.getElementById('addTodoForm');
const ul = document.getElementById('todoList');

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = form.elements.newTodo;
    const newTodo = input.value.trim();

    if (!newTodo) {
        alert('Task cannot be empty.');
        return;
    }

    if (toDoList.includes(newTodo)) {
        alert('To-do already exists');
    } else {
        toDoList.push(newTodo);
        renderList();
    }

    input.value = '';
});

function renderList() {
    ul.innerHTML = '';
    toDoList.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = 'Listitem';

        const span = document.createElement('span');
        span.textContent = task;

        const btn = document.createElement('button');
        btn.className = 'trash';
        btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        btn.style.background = 'none';
        btn.style.border = 'none';
        btn.style.borderRadius = '50%';

        btn.addEventListener('click', () => {
            li.classList.add('fade-out');
            setTimeout(() => {
                toDoList.splice(index, 1);
                renderList();
            }, 300);
        });

        li.appendChild(span);
        li.appendChild(btn);
        ul.appendChild(li);
    });
}