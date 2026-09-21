/**
 * SGA Institucional - Formulario de acceso (html/registro.html).
 * Requiere js/auth.js cargado antes.
 */
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formRegistro");
    const mensajeError = document.getElementById("mensajeError");

    // Si ya hay una sesión activa, ir directo al panel correspondiente.
    const sesionActiva = Auth.getSesion();
    if (sesionActiva) {
        Auth.irAInicio(sesionActiva.rol);
        return;
    }

    const mostrarError = mensaje => {
        mensajeError.textContent = mensaje;
        mensajeError.hidden = false;
    };

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        mensajeError.hidden = true;

        const tipoUsuario = document.getElementById("tipoUsuario").value;
        const correo = document.getElementById("correo").value;
        const contrasena = document.getElementById("contrasena").value;

        if (!tipoUsuario || !correo || !contrasena) {
            mostrarError("Por favor complete todos los campos.");
            return;
        }

        const resultado = Auth.login(tipoUsuario, correo, contrasena);
        if (!resultado.ok) {
            mostrarError(resultado.mensaje);
            return;
        }

        Auth.irAInicio(resultado.sesion.rol);
    });
});
