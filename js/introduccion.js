document.addEventListener("DOMContentLoaded", function () {
    // =========================================
    // VALIDACIÓN DEL REGISTRO
    // =========================================
    let formulario = document.getElementById("formRegistro");
    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            let nombre = document.getElementById("nombre").value;
            let correo = document.getElementById("correo").value;
            let usuario = document.getElementById("usuario").value;
            let contrasena = document.getElementById("contrasena").value;
            let confirmar = document.getElementById("confirmar").value;
            let rol = document.getElementById("rol").value;

            console.log("Nombre:", nombre);
            console.log("Correo:", correo);
            console.log("Usuario:", usuario);
            console.log("Rol:", rol);

            if (
                nombre === "" ||
                correo === "" ||
                usuario === "" ||
                contrasena === "" ||
                confirmar === "" ||
                rol === ""
            ) {
                alert("Por favor complete todos los campos.");
                return;
            }

            if (contrasena !== confirmar) {
                alert("Las contraseñas no coinciden.");
                return;
            }

            if (contrasena.length < 6) {
                alert("La contraseña debe tener mínimo 6 caracteres.");
                return;
            }

            alert("Registro realizado correctamente.");
            formulario.reset();
        });
    }

    // =========================================
    // BOTONES DE LA PÁGINA DE INICIO
    // =========================================
    let btnPortal = document.getElementById("btnPortal");
    if (btnPortal) {
        btnPortal.addEventListener("click", function () {
            alert("Ingresando al Portal SGA...");
        });
    }

    let btnConocer = document.getElementById("btnConocer");

    if (btnConocer) {
        btnConocer.addEventListener("click", function () {
            document.getElementById("funcionalidades").scrollIntoView({
                behavior: "smooth"
            });
        });
    }
});