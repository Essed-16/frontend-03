const h2 = document.querySelector("section form h2");
const nombre = document.querySelector("#nombre");
const correo = document.querySelector("#correo");
const clave = document.querySelector("#clave");
const repetirclave = document.querySelector("#repetirclave");
const mensaje = document.querySelector("#mensaje");
const btn = document.querySelector("#btnEnviar");

// Al cargar: rellenar nombre y correo si ya hay datos guardados
const datosLocalStorage = JSON.parse(localStorage.getItem("datos"));

if (datosLocalStorage) {
    nombre.value = datosLocalStorage.nombre;
    correo.value = datosLocalStorage.correo;
}

// Envío de datos usando solo js
btn.addEventListener("click", btnOnclick);

function btnOnclick(event) {
    event.preventDefault();
    console.log("\nNombre: " + nombre.value +
                "\nCorreo: " + correo.value +
                "\nClave: " + clave.value +
                "\nrepetirclave: " + repetirclave.value
    );

    const datos = {
        nombre: nombre.value,
        correo: correo.value,
        clave: clave.value
    };

    localStorage.setItem("datos", JSON.stringify(datos));
    console.log(localStorage.getItem("datos"));   

    fetch('procesa.php', {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {"Content-type": "application/json; charset=UTF-8"}
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
        if (data.status === 200) {
            mensaje.innerHTML = "SE REGISTRO SATISFACTORIAMENTE";
        } else {
            mensaje.innerHTML = "Error: " + data.message;
        }
    })
    .catch(error => console.log(error));
}

document.getElementById("loginLink").addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("loginModal").style.display = "flex";
});

document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("loginModal").style.display = "none";
});

document.getElementById("loginBtn").addEventListener("click", () => {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const message = document.getElementById("loginMessage");

    if (user === "admin" && pass === "12345") {
        message.textContent = "¡Login exitoso!";
        message.style.color = "green";
    } else {
        message.textContent = "Usuario o contraseña incorrectos.";
        message.style.color = "red";
    }
});