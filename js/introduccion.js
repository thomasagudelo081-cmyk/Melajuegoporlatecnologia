/**
 * SGA Institucional - Página de inicio (html/introduccion.html).
 * Requiere js/auth.js cargado antes.
 */
document.addEventListener("DOMContentLoaded", () => {
    const btnPortal = document.getElementById("btnPortal");
    const btnConocer = document.getElementById("btnConocer");

    btnPortal.addEventListener("click", () => {
        const sesion = Auth.getSesion();
        if (sesion) {
            Auth.irAInicio(sesion.rol);
        } else {
            window.location.href = "registro.html";
        }
    });

    btnConocer.addEventListener("click", () => {
        document.getElementById("funcionalidades").scrollIntoView({ behavior: "smooth" });
    });
});
