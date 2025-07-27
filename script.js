const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list')

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
renderTasks();

addBtn.addEventListener('click', () => {
    const taskText = input.value.trim();
    if (taskText === '') return;

    tasks.push({ text: taskText, done: false });
    input.value = '';
    saveTasks();
    renderTasks();
});

function renderTasks() {
    taskList.innerHTML = '';
// ATTENTION
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = task.done ? 'done' : '';
        li.innerHTML = `
        <span>${task.text}</span>
        <div>
        <button onclick="toggleTask(${index})">✅</button>
        <button class="remove-btn" onclick="removeTask(${index})">❌</button>
        </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].done = !tasks[index].done;
    saveTasks();
    renderTasks();
}

function removeTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}