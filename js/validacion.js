document.addEventListener("DOMContentLoaded", function () {
    let formulario = document.getElementById("formRegistro");
    if (formulario) {
        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();

            let tipoUsuario = document.getElementById("tipoUsuario").value;
            let correo = document.getElementById("correo").value;
            let contrasena = document.getElementById("contrasena").value;

            console.log("Tipo de usuario:", tipoUsuario);
            console.log("Correo:", correo);

            if (
                tipoUsuario === "" ||
                correo === "" ||
                contrasena === ""
            ) {
                alert("Por favor complete todos los campos.");
                return;
            }

            if (!correo.includes("@")) {
                alert("Ingrese un correo electrónico válido.");
                return;
            }

            if (contrasena.length < 6) {
                alert("La contraseña debe tener mínimo 6 caracteres.");
                return;
            }

            alert("Acceso validado correctamente.");
        });
    }
    /* BOTÓN INGRESAR AL PORTAL */
    let btnPortal = document.getElementById("btnPortal");

    if (btnPortal) {
        btnPortal.addEventListener("click", function () {
            window.location.href = "Registro.html";
        });
    }
    /* BOTÓN CONOCER SGA */
    let btnConocer = document.getElementById("btnConocer");

    if (btnConocer) {
        btnConocer.addEventListener("click", function () {
            let funcionalidades =
                document.getElementById("funcionalidades");

            if (funcionalidades) {
                funcionalidades.scrollIntoView({
                    behavior: "smooth"
                });
            }
        });
    }
});