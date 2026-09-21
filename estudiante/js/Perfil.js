/* =========================================
   BOTÓN DESCARGAR CERTIFICADO
========================================= */

const certificateBtn =
    document.getElementById(
        "certificateBtn"
    );


if (certificateBtn) {

    certificateBtn.addEventListener(
        "click",
        function () {

            alert(
                "El certificado se descargará próximamente."
            );

        }
    );

}



/* =========================================
   CERRAR SESIÓN
========================================= */

const logoutBtn =
    document.getElementById(
        "logoutBtn"
    );


if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmar =
                confirm(
                    "¿Deseas cerrar sesión?"
                );


            if (confirmar) {

                alert(
                    "Sesión cerrada correctamente."
                );

            }

        }
    );

}



/* =========================================
   NOTIFICACIONES
========================================= */

const notification =
    document.querySelector(
        ".notification"
    );


if (notification) {

    notification.addEventListener(
        "click",
        function () {

            alert(
                "No tienes nuevas notificaciones."
            );

        }
    );

}



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


if (avatar) {

    avatar.addEventListener(
        "click",
        function () {

            alert(
                "Perfil de Alejandro García Pérez"
            );

        }
    );

}
