const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Por favor, escribe una tarea.");
        return;
    }

    const li = document.createElement("li");
    
    const textSpan = document.createElement("span");
    textSpan.textContent = task;
    textSpan.classList.add("task-text");

    li.append(
        textSpan, 
        agregarBotonesSpan("  " + "❌", "delete-btn"),
        agregarBotonesSpan("  " + "✏️", "edit-btn")
    );
    
    taskList.appendChild(li);
    
    taskInput.value = "";
    taskInput.focus();
});

function agregarBotonesSpan(texto, nombreClase) {
    const btn = document.createElement("span");
    btn.textContent = texto;
    btn.classList.add(nombreClase);
    return btn;
}

taskList.addEventListener("click", (event) => {
    const target = event.target;
    if (target.closest(".delete-btn")) {
        if (confirm("¿Estás seguro de borrar este elemento?")) {
            target.closest("li").remove();
        }
    } else if (target.closest(".edit-btn")) {
        const li = target.closest("li");
        const textSpan = li.querySelector(".task-text");
        const txtEdit = prompt("Editar tarea:", textSpan.textContent);      
        if (txtEdit !== null && txtEdit.trim() !== "") {
            textSpan.textContent = txtEdit.trim();
        }
    }
});

// AGREGAR ESTA LÍNEA PARA CAMBIAR DE TEMA AL DARLE CLIC EN EL BOTÓN toggle-theme-btn
// document.body.classList.toggle("dark-theme");
document.querySelector("#toggle-theme-btn").addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
});
