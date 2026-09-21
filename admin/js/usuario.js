document.addEventListener("DOMContentLoaded", function () {
    // =========================================
    // VARIABLES DEL FORMULARIO
    // =========================================
    let formulario = document.getElementById("formUsuario");
    let btnGuardar = document.getElementById("btnGuardar");
    let btnDescartar = document.getElementById("btnDescartar");
    let btnCargaMasiva = document.getElementById("btnCargaMasiva");
    // =========================================
    // REGISTRAR USUARIO
    // =========================================
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        let tipoPerfil =
            document.querySelector('input[name="tipoPerfil"]:checked');

        let nombres =
            document.getElementById("nombres").value.trim();

        let apellidos =
            document.getElementById("apellidos").value.trim();

        let tipoDocumento =
            document.getElementById("tipoDocumento").value;

        let numeroDocumento =
            document.getElementById("numeroDocumento").value.trim();

        let fechaNacimiento =
            document.getElementById("fechaNacimiento").value;

        let genero =
            document.getElementById("genero").value;

        let correoInstitucional =
            document.getElementById("correoInstitucional").value.trim();

        let correoPersonal =
            document.getElementById("correoPersonal").value.trim();

        let telefono =
            document.getElementById("telefono").value.trim();

        let direccion =
            document.getElementById("direccion").value.trim();

        let programa =
            document.getElementById("programa").value;

        let semestre =
            document.getElementById("semestre").value;

        let jornada =
            document.getElementById("jornada").value;

        let estado =
            document.querySelector('input[name="estado"]:checked');

        let modalidad =
            document.querySelector('input[name="modalidad"]:checked');

        let contrasena =
            document.getElementById("contrasena").value;

        let cambioClave =
            document.getElementById("cambioClave").checked;

        let notificarCorreo =
            document.getElementById("notificarCorreo").checked;
        // =========================================
        // VALIDACIONES
        // =========================================
        if (!tipoPerfil) {
            alert("Seleccione el tipo de perfil.");
            return;
        }

        if (
            nombres === "" ||
            apellidos === "" ||
            tipoDocumento === "" ||
            numeroDocumento === "" ||
            fechaNacimiento === "" ||
            correoInstitucional === "" ||
            telefono === "" ||
            programa === "" ||
            semestre === ""
        ) {
            alert("Complete todos los campos obligatorios.");
            return;
        }

        if (!correoInstitucional.includes("@")) {
            alert("Ingrese un correo institucional válido.");
            return;
        }

        if (numeroDocumento.length < 5) {
            alert("Ingrese un número de identificación válido.");
            return;
        }

        if (contrasena.length < 6) {
            alert("La contraseña debe tener mínimo 6 caracteres.");
            return;
        }

        // =========================================
        // CREAR OBJETO DE USUARIO
        // =========================================
        let usuario = {
            tipoPerfil: tipoPerfil.value,
            nombres: nombres,
            apellidos: apellidos,
            tipoDocumento: tipoDocumento,
            numeroDocumento: numeroDocumento,
            fechaNacimiento: fechaNacimiento,
            genero: genero,
            correoInstitucional: correoInstitucional,
            correoPersonal: correoPersonal,
            telefono: telefono,
            direccion: direccion,
            programa: programa,
            semestre: semestre,
            jornada: jornada,
            estado: estado ? estado.value : "",
            modalidad: modalidad ? modalidad.value : "",
            contrasena: contrasena,
            cambioClave: cambioClave,
            notificarCorreo: notificarCorreo
        };
        // GUARDAR EN EL ALMACÉN (la contraseña no se persiste: el acceso real lo gestionará el backend)
        delete usuario.contrasena;
        Almacen.agregar("usuarios", usuario);

        console.log("Usuario creado:", usuario);
        alert("Usuario registrado correctamente.");
        window.location.href = "Ges_Universidad.html";
    });
    // =========================================
    // GUARDAR BORRADOR
    // =========================================
    btnGuardar.addEventListener("click", function () {
        let nombres =
            document.getElementById("nombres").value.trim();

        let apellidos =
            document.getElementById("apellidos").value.trim();

        let correo =
            document.getElementById("correoInstitucional").value.trim();


        let borrador = {
            nombres: nombres,
            apellidos: apellidos,
            correo: correo
        };

        sessionStorage.setItem(
            "borradorUsuario",
            JSON.stringify(borrador)
        );

        alert("Borrador guardado correctamente.");
    });
    // =========================================
    // DESCARTAR REGISTRO
    // =========================================
    btnDescartar.addEventListener("click", function () {
        let confirmar =
            confirm("¿Desea descartar el registro actual?");

        if (confirmar) {
            formulario.reset();
            sessionStorage.removeItem("borradorUsuario");
            alert("Registro descartado.");
        }
    });
    // =========================================
    // CARGA MASIVA
    // =========================================
    btnCargaMasiva.addEventListener("click", function () {
        alert("La carga masiva mediante CSV estará disponible próximamente.");
    });
});