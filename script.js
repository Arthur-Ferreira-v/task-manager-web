const taskInput = document.getElementById('taskInput');

const addTaskButton = document.getElementById('addTaskButton');

const taskList = document.getElementById('taskList');

let tasks = [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function renderTask(taskText) {
    const li = document.createElement('li');

    li.innerHTML = `<span>${taskText}</span>`;

    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'Excluir';

    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation();

        tasks = tasks.filter(task => task !== taskText);

        saveTasks();

        li.remove();
    });

    li.addEventListener('click', function () {
        li.classList.toggle('completed');
    });

    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    tasks.push(taskText);

    saveTasks();

    renderTask(taskText);

    taskInput.value = '';
});

taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});

loadTasks();

tasks.forEach(function (task) {
    renderTask(task);
});