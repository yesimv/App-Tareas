let contador = 1;

document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const toggleButton = document.getElementById("toggleDarkMode");

    function applyDarkMode() {
        body.classList.add("bg-dark", "text-light");
        toggleButton.classList.replace("btn-dark", "btn-light");
        toggleButton.innerHTML = "☀️";

        document.querySelectorAll(".card").forEach(card => card.classList.add("bg-secondary"));
        document.querySelectorAll("button").forEach(btn => btn.classList.add("btn-outline-light"));

        localStorage.setItem("darkMode", "enabled");
    }

    function removeDarkMode() {
        body.classList.remove("bg-dark", "text-light");
        toggleButton.classList.replace("btn-light", "btn-dark");
        toggleButton.innerHTML = "🌙";

        document.querySelectorAll(".card").forEach(card => card.classList.remove("bg-secondary", "text-light"));
        document.querySelectorAll("button").forEach(btn => btn.classList.remove("btn-outline-light"));

        localStorage.setItem("darkMode", "disabled");
    }

    if (localStorage.getItem("darkMode") === "enabled") {
        applyDarkMode();
    }

    toggleButton.addEventListener("click", function () {
        if (body.classList.contains("bg-dark")) {
            removeDarkMode();
        } else {
            applyDarkMode();
        }
    });

    // 🔹 Al recargar la página, aplicar modo oscuro a tareas existentes
    if (localStorage.getItem("darkMode") === "enabled") {
        document.querySelectorAll(".card").forEach(card => card.classList.add("bg-secondary", "text-light"));
    }
});

// 🔹 Función para guardar una nueva tarea
function guardarTarea() {
    let titulo = document.getElementById("titulo").value.trim();
    let descripcion = document.getElementById("descripcion").value.trim();
    let estado = document.querySelector('input[name="estado"]:checked').value;

    if (titulo === "") {
        alert("El título no puede estar vacío.");
        return;
    }

    let bloqueId = `bloque_${contador}`;
    let radioName = `exampleRadios_${contador}`;
    let isDarkMode = document.body.classList.contains("bg-dark");

    let nuevoBloque = document.createElement("div");
    nuevoBloque.classList.add("card", "mb-3");
    if (isDarkMode) nuevoBloque.classList.add("bg-secondary");
    nuevoBloque.style.width = "18rem";
    nuevoBloque.setAttribute("id", bloqueId);

    nuevoBloque.innerHTML = `
        <div class="card-body">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="${radioName}" value="pendiente" ${estado === "pendiente" ? "checked" : ""} disabled>
                <label class="form-check-label">Pendiente</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="${radioName}" value="proceso" ${estado === "proceso" ? "checked" : ""} disabled>
                <label class="form-check-label">En proceso</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="${radioName}" value="completado" ${estado === "completado" ? "checked" : ""} disabled>
                <label class="form-check-label">Completada</label>
            </div>
        </div>

        <div class="card-body">
            <input class="form-control titulo-input card-title" type="text" value="${titulo}" disabled>
            <textarea class="form-control desc-input card-text" disabled>${descripcion}</textarea>
        </div>

        <div class="card-body secc-iconos">
            <a href="#" onclick="eliminarBloque('${bloqueId}')">
                <img src="images/borrar.png" alt="Eliminar" width="20" height="20">
            </a>
            <a href="#" onclick="alternarEdicion('${bloqueId}')" class="boton-editar">
                <img src="images/boton-editar.png" alt="Editar" width="17" height="17">
            </a>
        </div>
    `;

    document.getElementById("contenedor-bloques").appendChild(nuevoBloque);
    contador++;

    let collapse = new bootstrap.Collapse(document.getElementById("formularioCollapse"), { toggle: true });

    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
    document.querySelector('input[name="estado"][value="pendiente"]').checked = true;
}

// 🔹 Función para alternar edición
function alternarEdicion(bloqueId) {
    let bloque = document.getElementById(bloqueId);
    let tituloInput = bloque.querySelector(".titulo-input");
    let descInput = bloque.querySelector(".desc-input");
    let radios = bloque.querySelectorAll(`input[type="radio"]`);
    let boton = bloque.querySelector(".boton-editar img");

    if (tituloInput.disabled) {
        tituloInput.disabled = false;
        descInput.disabled = false;
        radios.forEach(radio => radio.disabled = false);
        boton.src = "images/disquete.png";
    } else {
        if (tituloInput.value == "") {
            alert("No puedes dejar el título vacío.");
            return;
        }

        tituloInput.disabled = true;
        descInput.disabled = true;
        radios.forEach(radio => radio.disabled = true);
        boton.src = "images/boton-editar.png";
    }
}

// 🔹 Función para eliminar tarea
function eliminarBloque(bloqueId) {
    document.getElementById(bloqueId).remove();
}

// 🔹 Filtrar tareas por estado
function mostrarAll() {
    document.querySelectorAll(".card").forEach(tarea => tarea.style.display = "flex");
}

function mostrarPendiente() {
    filtrarPorEstado("pendiente");
}

function mostrarProceso() {
    filtrarPorEstado("proceso");
}

function mostrarCompletado() {
    filtrarPorEstado("completado");
}

function filtrarPorEstado(estado) {
    document.querySelectorAll(".card").forEach(tarea => {
        let estadoSeleccionado = tarea.querySelector(`input[type="radio"]:checked`).value;
        tarea.style.display = (estadoSeleccionado === estado) ? "flex" : "none";
    });
}
