let contador = 1; // Contador para generar nombres únicos

function crearNuevaTarea() {
    // ID único para el bloque
    let bloqueId = `bloque_${contador}`;
    let radioName = `exampleRadios_${contador}`;

    // Plantilla del nuevo bloque con identificadores dinámicos
    let nuevoBloque = document.createElement("div");
    nuevoBloque.classList.add("card", "mb-3");
    nuevoBloque.style.width = "18rem";
    nuevoBloque.setAttribute("id", bloqueId);

    nuevoBloque.innerHTML = `
        
        <div class="card-body">
          <div class="form-check">
              <input class="form-check-input" type="radio" name="${radioName}" id="${radioName}_1" value="Pendiente" checked>
              <label class="form-check-label" for="${radioName}_1">Pendiente</label>
          </div>
          
          <div class="form-check">
              <input class="form-check-input" type="radio" name="${radioName}" id="${radioName}_2" value="En proceso">
              <label class="form-check-label" for="${radioName}_2">En proceso</label>
          </div>
          <div class="form-check">
              <input class="form-check-input" type="radio" name="${radioName}" id="${radioName}_3" value="Completada">
              <label class="form-check-label" for="${radioName}_3">Completada</label>
          </div>
      </div>
        
        <div class="card-body descripcion-edit">
          <input class="form-control titulo-input card-title" type="text" placeholder="Título">
          <textarea class="form-control desc-input card-text" placeholder="Descripción" rows="3"></textarea>
      </div>
        <div class="card-body secc-iconos">
            <a href="#" onclick="eliminarBloque('${bloqueId}')"><img src="images/borrar.png" alt="Eliminar" width="20" height="20"></a>
            <a href="#" onclick="alternarEdicion('${bloqueId}')" class="boton-editar"><img src="images/disquete.png" alt="Guardar" width="17" height="17"  class="icono-boton"></a>
        </div>
      
    `;

    // Agregar el bloque al contenedor
    document.getElementById("contenedor-bloques").appendChild(nuevoBloque);
    contador++; // Incrementar para el próximo bloque
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
    filtrarTareas();
}

function eliminarBloque(bloqueId) {
    document.getElementById(bloqueId).remove();
}
// 🚀 FILTRAR TAREAS POR ESTADO 🚀
function filtrarTareas() {
    let filtro = document.getElementById("mostrar").value; // Obtener el valor seleccionado
    let tareas = document.querySelectorAll(".tarea"); // Obtener todas las tareas

    tareas.forEach(tarea => {
        let estadoSeleccionado = tarea.querySelector(`input[type="radio"]:checked`).value; // Obtener el estado del bloque

        if (filtro === "all" || estadoSeleccionado === filtro) {
            tarea.style.display = "block"; // Mostrar si coincide con el filtro
        } else {
            tarea.style.display = "none"; // Ocultar si no coincide
        }
    });
}
