let contador = 1;

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

    let nuevoBloque = document.createElement("div");
    nuevoBloque.classList.add("card", "mb-3");
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
            <input class="form-control card-title" type="text" value="${titulo}" disabled>
            <textarea class="form-control card-text" disabled>${descripcion}</textarea>
        </div>

        <div class="card-body secc-iconos">
            <a href="#" onclick="eliminarBloque('${bloqueId}')">
                <img src="images/borrar.png" alt="Eliminar" width="20" height="20">
            </a>
            <a href="#" onclick="alternarEdicion('${bloqueId}')" class="boton-editar">
                <img src="images/disquete.png" alt="Guardar" width="17" height="17">
            </a>
        </div>
    `;

    document.getElementById("contenedor-bloques").appendChild(nuevoBloque);
    contador++;

    // Cerrar el collapse después de guardar
    let collapse = new bootstrap.Collapse(document.getElementById("formularioCollapse"), {
        toggle: true
    });

    // Limpiar el formulario
    document.getElementById("titulo").value = "";
    document.getElementById("descripcion").value = "";
    document.querySelector('input[name="estado"][value="pendiente"]').checked = true;
}



function alternarEdicion(bloqueId) {
    let bloque = document.getElementById(bloqueId);
    let tituloInput = bloque.querySelector(".titulo-input");
    let descInput = bloque.querySelector(".desc-input");
    let radios = bloque.querySelectorAll(`input[type="radio"]`);
    let boton = bloque.querySelector(".boton-editar img");

    if (tituloInput.disabled) {
        // Habilitar edición
        tituloInput.disabled = false;
        descInput.disabled = false;
        radios.forEach(radio => radio.disabled = false);
        boton.src = "images/disquete.png"; // Cambia icono a "Guardar"
    } else {
        // Guardar cambios
        if (tituloInput.value == "") {
            alert("Can't leave title empty.\nPlease set a title.");
            return;
        }else{
            let titulo = tituloInput.value.trim() || "Sin título";
            let descripcion = descInput.value.trim() || "Sin descripción";
            let radioSeleccionado = bloque.querySelector(`input[type="radio"]:checked`).value;
    
            bloque.querySelector(".card-title").textContent = titulo;
            bloque.querySelector(".card-text").textContent = `${descripcion} (${radioSeleccionado})`;
    
            // Deshabilitar inputs
            tituloInput.disabled = true;
            descInput.disabled = true;
            radios.forEach(radio => radio.disabled = true);
            boton.src = "images/boton-editar.png"; // Cambia icono a "Editar"
        }
        
    }
    filtrarTareas();
}

function eliminarBloque(bloqueId) {

    document.getElementById(bloqueId).remove();
}
function mostrarAll() {
    let tareas = document.querySelectorAll(".card");
    tareas.forEach(tarea => {
        tarea.style.display = "flex";
    });
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
    let tareas = document.querySelectorAll(".card");
    tareas.forEach(tarea => {
        let estadoSeleccionado = tarea.querySelector(`input[type="radio"]:checked`).value;
        tarea.style.display = (estadoSeleccionado === estado) ? "flex" : "none";
    });
}
