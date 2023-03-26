const newTaskInput = document.getElementById("newTaskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");

let tasks = [];

function addTask(event) {
    event.preventDefault();
    const taskText = newTaskInput.value;
    if (taskText !== "") {
        tasks.push(taskText);
        updateTaskList();
        newTaskInput.value = "";
    }
}

function updateTask(index, newText) {
    tasks[index] = newText;
    updateTaskList();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    updateTaskList();
}

function editTask(index) {
    const li = taskList.childNodes[index];
    const input = li.querySelector("input[type=text]");
    const editButton = li.querySelector("button.edit");
    input.disabled = false;
    input.classList.add("editing");
    input.focus();
    editButton.style.display = "none";
}

function closeEdit(index) {
    const li = taskList.childNodes[index];
    const input = li.querySelector("input[type=text]");
    const editButton = li.querySelector("button.edit");
    input.disabled = true;
    input.classList.remove("editing");
    editButton.style.display = "inline-block";
}

function updateFromEdit(event, index) {
    if (event.keyCode === 13 || event.type === "blur") {
        const li = taskList.childNodes[index];
        const input = li.querySelector("input[type=text]");
        const newText = input.value.trim();
        if (newText !== "") {
            updateTask(index, newText);
            closeEdit(index);
        } else {
            deleteTask(index);
        }
    }
}

function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="task-container">
                <input type="text" value="${task}" disabled onchange="updateTask(${index}, this.value)" onblur="closeEdit(${index})" onkeyup="updateFromEdit(event, ${index})">
                <button class="edit" onclick="editTask(${index})">✎</button>
                <button class="delete" onclick="deleteTask(${index})">🗑</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

document.querySelector('form').addEventListener('submit', addTask);
updateTaskList();
