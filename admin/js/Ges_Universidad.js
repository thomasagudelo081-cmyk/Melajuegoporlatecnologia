document.addEventListener("DOMContentLoaded", function () {
    // =========================================
    // VERIFICAR PERMISO DE ADMINISTRADOR
    // =========================================
    let tipoUsuario = sessionStorage.getItem("tipoUsuario");
    if (tipoUsuario !== "administrador") {
        alert("Acceso denegado. Solo los administradores pueden ingresar.");
        window.location.href = "../../html/Registro.html";
        return;
    }
    // =========================================
    // CERRAR SESIÓN
    // =========================================
    let btnCerrarSesion =
        document.getElementById("btnCerrarSesion");
    if (btnCerrarSesion) {
        btnCerrarSesion.addEventListener("click", function (evento) {
            evento.preventDefault();
            sessionStorage.removeItem("tipoUsuario");
            alert("Sesión cerrada correctamente.");
            window.location.href = "../../html/Registro.html";
        });
    }
    // =========================================
    // REPORTE RÁPIDO
    // =========================================
    let btnReporte =
        document.getElementById("btnReporte");
    if (btnReporte) {
        btnReporte.addEventListener("click", function () {
            alert("Generando reporte rápido del sistema.");
        });
    }
    // =========================================
    // SINCRONIZAR DATOS
    // =========================================
    let btnSincronizar =
        document.getElementById("btnSincronizar");
    if (btnSincronizar) {
        btnSincronizar.addEventListener("click", function () {
            alert("Datos sincronizados correctamente.");
        });
    }
    // =========================================
    // BUSCADOR
    // =========================================
    let buscar =
        document.getElementById("buscar");
    if (buscar) {
        buscar.addEventListener("keyup", function () {
            console.log("Buscando:", buscar.value);
        });
    }

    let btnCrearUsuario =
        document.getElementById("btnCrearUsuario");
    if (btnCrearUsuario) {
         btnCrearUsuario.addEventListener("click", function () {
            window.location.href = "CrearUsuario.html";
         });
    }
});