
/* =========================================
   DESCARGAR CERTIFICADO
========================================= */

const certificateBtn =
    document.getElementById("certificateBtn");


certificateBtn.addEventListener(
    "click",
    function () {

        alert(
            "El certificado se descargará próximamente."
        );

    }
);


/* =========================================
   CERRAR SESIÓN
========================================= */

const logoutBtn =
    document.getElementById("logoutBtn");


logoutBtn.addEventListener(
    "click",
    function () {

        const confirmar = confirm(
            "¿Deseas cerrar sesión?"
        );


        if (confirmar) {

            Auth.logout();

        }

    }
);


/* =========================================
   NOTIFICACIONES
========================================= */

const notification =
    document.querySelector(".notification");


notification.addEventListener(
    "click",
    function () {

        alert(
            "No tienes nuevas notificaciones."
        );

    }
);


/* =========================================
   NAVEGACIÓN
========================================= */

const navigationLinks =
    document.querySelectorAll(
        ".navigation a"
    );


navigationLinks.forEach(
    function (link) {

        link.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                navigationLinks.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    }
);


/* =========================================
   AVATAR
========================================= */

const avatar =
    document.querySelector(
        ".user-avatar"
    );


avatar.addEventListener(
    "click",
    function () {

        alert(
            "Perfil de Alejandro García Pérez"
        );

    }
);
