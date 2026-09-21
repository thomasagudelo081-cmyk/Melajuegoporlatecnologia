// ========================================
// ACADEMIA PRO
// JavaScript
// ========================================


// BOTÓN EXPORTAR PDF

const exportar = document.querySelector(
    ".student-header button"
);

exportar.addEventListener("click", function () {

    alert(
        "La opción de exportar PDF está lista para conectarse con un sistema real."
    );

});


// ========================================
// BOTONES DEL HORARIO
// ========================================

const tabs = document.querySelectorAll(
    ".toolbar button"
);


tabs.forEach(function(tab) {

    tab.addEventListener("click", function() {

        // Quitamos la clase selected
        // de todos los botones

        tabs.forEach(function(item) {

            item.classList.remove(
                "selected"
            );

        });


        // Agregamos selected
        // al botón seleccionado

        tab.classList.add(
            "selected"
        );

    });

});


// ========================================
// MOSTRAR HORA EN CONSOLA
// ========================================

const ahora = new Date();

console.log(
    "Portal Academia Pro cargado:",
    ahora.toLocaleTimeString()
);