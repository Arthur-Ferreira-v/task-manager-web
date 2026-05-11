const taskInput = document.getElementById('taskInput');

const addTaskButton = document.getElementById('addTaskButton');

const taskList = document.getElementById('taskList');

const taskCounter = document.getElementById('taskCounter');

const clearTasksButton = document.getElementById('clearTasksButton');

let tasks = [];

function updateTaskCounter() {
    const total = tasks.length;

    taskCounter.textContent = `${total} tarefa${total !== 1 ? 's' : ''}`;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function renderTask(task) {
    const li = document.createElement('li');

    li.innerHTML = `<span>${task.text}</span>`;

    if (task.completed) {
    li.classList.add('completed');
    }

    const deleteButton = document.createElement('button');

    deleteButton.textContent = 'Excluir';

    deleteButton.addEventListener('click', function (event) {
        event.stopPropagation();

        tasks = tasks.filter(t => t !== task);

        saveTasks();

        updateTaskCounter();

        li.remove();
    });

    li.addEventListener('click', function () {
        task.completed = !task.completed;

        saveTasks();

        li.classList.toggle('completed')

    });

    li.appendChild(deleteButton);

    taskList.appendChild(li);
}

addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();

    renderTask(tasks[tasks.length - 1]);

    updateTaskCounter();

    taskInput.value = '';
});

taskInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});

loadTasks();


clearTasksButton.addEventListener('click', function () {
    tasks = [];

    saveTasks();

    taskList.innerHTML = '';

    updateTaskCounter();
});

tasks.forEach(function (task) {
    renderTask(task);
});

updateTaskCounter();