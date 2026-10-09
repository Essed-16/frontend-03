const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

loadData();
function crearTarea(task) {
    const li = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = task;
    textSpan.classList.add("task-text");

    li.append(
        textSpan,
        agregarBotonesSpan("❌", "delete-btn"),
        agregarBotonesSpan("✏️", "edit-btn")
    );
    taskList.appendChild(li);
}

function agregarBotonesSpan(texto, nombreClase) {
    const btn = document.createElement("span");
    btn.textContent = texto;
    btn.classList.add(nombreClase);
    return btn;
}

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = taskInput.value.trim();
    if (task === "") return;

    crearTarea(task);
    createData(task);

    taskInput.value = "";
    taskInput.focus();
});


taskList.addEventListener("click", (event) => {
    const target = event.target;

    if (target.closest(".delete-btn")) {
        if (confirm("¿Estás seguro de borrar este elemento?")) {
            const li = target.closest("li");
            deleteData(li.querySelector(".task-text").textContent);
            li.remove();
        }
    } else if (target.closest(".edit-btn")) {
        const li = target.closest("li");
        const textSpan = li.querySelector(".task-text");
        const txtEdit = prompt("Editar tarea:", textSpan.textContent);
        if (txtEdit !== null && txtEdit.trim() !== "") {
            textSpan.textContent = txtEdit.trim();
            update();
        }
    }
});


document.querySelector("#toggle-theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});


function createData(task) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadData() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach((tarea) => crearTarea(tarea));
}

function update() {
    const tasks = Array.from(taskList.querySelectorAll(".task-text"))
        .map((span) => span.textContent.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function deleteData(texto) {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    const index = tasks.indexOf(texto);
    if (index !== -1) tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}