
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        const taskList = document.getElementById("taskList");
        const li = createTaskItem(taskText);
        taskList.appendChild(li);
        saveTasks();
        taskInput.value = "";
    }
}

function createTaskItem(taskText, completed = false) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;
    checkbox.onclick = function (event) {
        event.stopPropagation();
        toggleTaskCompletion(li, checkbox);
        saveTasks();
    };

    const span = document.createElement("span");
    span.textContent = taskText;
    span.style.marginLeft = "8px";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function (event) {
        event.stopPropagation();
        deleteTask(li);
        saveTasks();
    };

    li.onclick = function () {
        checkbox.checked = !checkbox.checked;
        toggleTaskCompletion(li, checkbox);
        saveTasks();
    };

    if (completed) {
        li.classList.add("completed");
    }

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    return li;
}

function toggleTaskCompletion(li, checkbox) {
    if (checkbox.checked) {
        li.classList.add("completed");
    } else {
        li.classList.remove("completed");
    }
}

function deleteTask(li) {
    li.remove();
    saveTasks();
}

function clearAllTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
    saveTasks();
}

function saveTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = [];

    taskList.querySelectorAll("li").forEach((li) => {
        const text = li.querySelector("span").textContent;
        const completed = li.querySelector("input[type='checkbox']").checked;
        tasks.push({ text, completed });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const taskList = document.getElementById("taskList");

    savedTasks.forEach((task) => {
        const li = createTaskItem(task.text, task.completed);
        taskList.appendChild(li);
    });
}
