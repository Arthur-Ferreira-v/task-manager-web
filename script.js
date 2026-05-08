const taskInput = document.getElementById('taskInput');

const addTaskButton = document.getElementById('addTaskButton');

const taskList = document.getElementById('taskList');

addTaskButton.addEventListener('click', function () {

    const taskText = taskInput.value.trim();

    if (taskText === '') {
        return;
    }

    const li = document.createElement('li');

    li.innerHTML = `<span>${taskText}</span>`;
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Excluir';
    deleteButton.addEventListener('click', function () {

        event.stopPropagation();
        li.remove();

    });

    li.addEventListener('click', function(){li.classList.toggle('completed');

    })

    li.appendChild(deleteButton);
    taskList.appendChild(li);
    taskInput.value = '';

});

taskInput.addEventListener('keydown', function (event) {

    if (event.key === 'Enter') {
        addTaskButton.click();
    }

});

