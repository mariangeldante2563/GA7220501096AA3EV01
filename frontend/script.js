// ============================================
// Registro de Clientes - Frontend (JavaScript)
// ============================================
// Este archivo maneja toda la interaccion con la API REST
// del backend usando Fetch API, sin librerias externas.
// ============================================

// URL base de la API REST del backend.
const API_URL = "http://localhost:8080/api/clientes";

// Selectores del DOM.
const formCliente = document.getElementById("form-cliente");
const clienteIdInput = document.getElementById("cliente-id");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const telefonoInput = document.getElementById("telefono");
const tituloForm = document.getElementById("titulo-form");
const btnCancelar = document.getElementById("btn-cancelar");
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const mensajeVacio = document.getElementById("mensaje-vacio");

// ============================================
// Event listeners
// ============================================

// Cargamos la lista de clientes al iniciar la pagina.
document.addEventListener("DOMContentLoaded", listarClientes);

// Enviamos la informacion del formulario al backend mediante Fetch API.
formCliente.addEventListener("submit", manejarSubmit);

// Cancelamos la edicion y restauramos el formulario.
btnCancelar.addEventListener("click", resetFormulario);

// ============================================
// Funciones de peticion a la API
// ============================================

/**
 * Obtiene la lista de clientes desde el backend y la pinta en la tabla.
 */
async function listarClientes() {
    try {
        const respuesta = await fetch(API_URL);

        if (!respuesta.ok) {
            throw new Error("Error al obtener los clientes");
        }

        const clientes = await respuesta.json();
        renderizarTabla(clientes);
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo cargar la lista de clientes. Verifique que el backend este activo.");
    }
}

/**
 * Crea o actualiza un cliente segun corresponda.
 * Si el formulario tiene un id guardado, hace PUT (actualizar).
 * Si no, hace POST (crear nuevo).
 */
async function manejarSubmit(event) {
    event.preventDefault();

    const cliente = {
        nombre: nombreInput.value.trim(),
        correo: correoInput.value.trim(),
        telefono: telefonoInput.value.trim()
    };

    // Validacion basica del lado del cliente.
    if (!cliente.nombre || !cliente.correo) {
        alert("El nombre y el correo son obligatorios.");
        return;
    }

    const id = clienteIdInput.value;
    const esEdicion = id !== "";

    try {
        let respuesta;

        if (esEdicion) {
            // Actualizamos el cliente existente con PUT.
            respuesta = await fetch(`${API_URL}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente)
            });
        } else {
            // Creamos un nuevo cliente con POST.
            respuesta = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(cliente)
            });
        }

        if (!respuesta.ok) {
            const errorData = await respuesta.json().catch(() => null);
            const mensaje = errorData?.message || "Error al guardar el cliente";
            throw new Error(mensaje);
        }

        // Exito: recargamos la tabla y limpiamos el formulario.
        alert(esEdicion ? "Cliente actualizado correctamente." : "Cliente registrado correctamente.");
        resetFormulario();
        listarClientes();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo guardar el cliente: " + error.message);
    }
}

/**
 * Carga los datos de un cliente en el formulario para editarlo.
 */
function cargarParaEditar(cliente) {
    clienteIdInput.value = cliente.id;
    nombreInput.value = cliente.nombre;
    correoInput.value = cliente.correo;
    telefonoInput.value = cliente.telefono;

    tituloForm.textContent = "Editar Cliente (ID: " + cliente.id + ")";
    btnCancelar.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
}

/**
 * Elimina un cliente previa confirmacion del usuario.
 */
async function eliminarCliente(id) {
    if (!confirm("¿Esta seguro de eliminar el cliente con ID " + id + "?")) {
        return;
    }

    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (respuesta.status === 404) {
            alert("El cliente ya no existe.");
        } else if (!respuesta.ok) {
            throw new Error("Error al eliminar");
        } else {
            alert("Cliente eliminado correctamente.");
        }

        listarClientes();
    } catch (error) {
        console.error("Error:", error);
        alert("No se pudo eliminar el cliente.");
    }
}

// ============================================
// Funciones de renderizado
// ============================================

/**
 * Pinta las filas de la tabla a partir del arreglo de clientes.
 */
function renderizarTabla(clientes) {
    cuerpoTabla.innerHTML = "";

    if (clientes.length === 0) {
        mensajeVacio.classList.remove("hidden");
        return;
    }

    mensajeVacio.classList.add("hidden");

    clientes.forEach(function (cliente) {
        const fila = document.createElement("tr");

        // Usamos escaparHTML para evitar inyeccion XSS.
        fila.innerHTML = `
            <td>${cliente.id}</td>
            <td>${escaparHTML(cliente.nombre)}</td>
            <td>${escaparHTML(cliente.correo)}</td>
            <td>${escaparHTML(cliente.telefono || "")}</td>
            <td class="actions-col">
                <button class="btn btn-edit" data-id="${cliente.id}">Editar</button>
                <button class="btn btn-delete" data-id="${cliente.id}">Eliminar</button>
            </td>
        `;

        // Asignamos eventos a los botones de la fila.
        fila.querySelector(".btn-edit").addEventListener("click", function () {
            cargarParaEditar(cliente);
        });
        fila.querySelector(".btn-delete").addEventListener("click", function () {
            eliminarCliente(cliente.id);
        });

        cuerpoTabla.appendChild(fila);
    });
}

/**
 * Restablece el formulario a su estado inicial (modo crear).
 */
function resetFormulario() {
    formCliente.reset();
    clienteIdInput.value = "";
    tituloForm.textContent = "Nuevo Cliente";
    btnCancelar.classList.add("hidden");
}

/**
 * Escapa caracteres HTML para prevenir XSS cuando insertamos
 * contenido dinamicamente con innerHTML.
 */
function escaparHTML(texto) {
    const div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}
