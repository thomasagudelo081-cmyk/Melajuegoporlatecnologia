document.addEventListener("DOMContentLoaded", function () {
    // ==========================================
    // 1. VERIFICACIÓN DE ROLES
    // ==========================================
    let rolUsuario = sessionStorage.getItem("rolUsuario");
    let rolesPermitidos = [
        "estudiante",
        "profesor",
        "administrador"
    ];

    // Verificar si existe un rol válido
    if (!rolesPermitidos.includes(rolUsuario)) {
        alert("No existe una sesión válida.");
        window.location.href = "Registro.html";
        return;
    }

    // Solo el administrador puede acceder
    if (rolUsuario !== "administrador") {
        alert(
            "Acceso denegado. Solo el administrador puede gestionar materias."
        );
        window.location.href = "PanelAdmin.html";
        return;
    }

    // ==========================================
    // 2. VARIABLES DE LOS ELEMENTOS HTML
    // ==========================================
    let formulario = document.getElementById("formMateria");
    let btnDescartar = document.getElementById("btnDescartar");
    let btnVista = document.getElementById("btnVista");
    let btnVersiones = document.getElementById("btnVersiones");
    let btnImportar = document.getElementById("btnImportar");
    let archivoExcel = document.getElementById("archivoExcel")
    let buscarMateria = document.getElementById("buscarMateria");
    let tablaCuerpo = document.getElementById("tablaCuerpo");

    // Código de la materia que se está editando
    let codigoEditando = null;

    // ==========================================
    // 3. OBTENER MATERIAS DEL LOCALSTORAGE
    // ==========================================
    let materias = JSON.parse(
        localStorage.getItem("materias")
    ) || [];

    // ==========================================
    // 4. CARGAR MATERIAS INICIALES
    // ==========================================
    if (materias.length === 0) {
        materias = [
            {
                codigo: "MAT-201",
                nombre: "Cálculo Multivariable",
                facultad: "ingenieria",
                programa: "sistemas",
                creditos: "4",
                horasTeoricas: "3",
                horasPracticas: "2",
                nivel: "3",
                tipo: "obligatoria",
                prerrequisitos: "",
                correquisitos: "",
                descripcion: ""
            },

            {
                codigo: "SYS-304",
                nombre: "Arquitectura de Microservicios",
                facultad: "ingenieria",
                programa: "sistemas",
                creditos: "4",
                horasTeoricas: "3",
                horasPracticas: "2",
                nivel: "5",
                tipo: "obligatoria",
                prerrequisitos: "",
                correquisitos: "",
                descripcion: ""
            }
        ];

        localStorage.setItem(
            "materias",
            JSON.stringify(materias)
        );
    }

    // ==========================================
    // 5. MOSTRAR MATERIAS EN LA TABLA
    // ==========================================
    function cargarMaterias() {
        tablaCuerpo.innerHTML = "";
        materias.forEach(function (materia) {
            let fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${materia.codigo}</td>
                <td>${materia.nombre}</td>
                <td>${materia.programa}</td>
                <td>${materia.nivel}</td>
                <td>${materia.tipo}</td>
                <td>${materia.creditos}</td>
                <td>
                    <button
                        type="button"
                        class="btn-tabla btn-editar"
                        data-codigo="${materia.codigo}">
                        ✎
                    </button>

                    <button
                        type="button"
                        class="btn-tabla btn-ver"
                        data-codigo="${materia.codigo}">
                        ◉
                    </button>
                </td>
            `;
            tablaCuerpo.appendChild(fila);
        });
    }
    cargarMaterias();

    // ==========================================
    // 6. GUARDAR O ACTUALIZAR MATERIA
    // ==========================================
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        // Obtener datos del formulario
        let codigoMateria =
            document.getElementById("codigoMateria").value.trim();

        let nombreMateria =
            document.getElementById("nombreMateria").value.trim();

        let formatoCodigo =
            document.getElementById("formatoCodigo").value;

        let facultad =
            document.getElementById("facultad").value;

        let programa =
            document.getElementById("programa").value;

        let creditos =
            document.getElementById("creditos").value;

        let horasTeoricas =
            document.getElementById("horasTeoricas").value;

        let horasPracticas =
            document.getElementById("horasPracticas").value;

        let nivel =
            document.getElementById("nivel").value;

        let tipoAsignatura =
            document.getElementById("tipoAsignatura").value;

        let prerrequisitos =
            document.getElementById("prerrequisitos").value.trim();

        let correquisitos =
            document.getElementById("correquisitos").value.trim();

        let descripcion =
            document.getElementById("descripcion").value.trim();
        // ==========================================
        // VALIDAR CAMPOS OBLIGATORIOS
        // ==========================================
        if (
            codigoMateria === "" ||
            nombreMateria === "" ||
            facultad === "" ||
            programa === "" ||
            creditos === "" ||
            horasTeoricas === "" ||
            horasPracticas === "" ||
            nivel === "" ||
            tipoAsignatura === ""
        ) {
            alert("Complete todos los campos obligatorios.");
            return;
        }

        // ==========================================
        // VALIDAR CÓDIGO
        // ==========================================
        if (!/^[A-Za-z0-9-]+$/.test(codigoMateria)) {
            alert(
                "El código solo puede contener letras, números y guiones."
            );
            return;
        }

        // ==========================================
        // VALIDAR VALORES NUMÉRICOS
        // ==========================================
        if (Number(creditos) <= 0) {
            alert("Los créditos deben ser mayores que cero.");
            return;
        }

        if (
            Number(horasTeoricas) < 0 ||
            Number(horasPracticas) < 0
        ) {
            alert("Las horas no pueden ser negativas.");
            return;
        }

        // ==========================================
        // CREAR OBJETO MATERIA
        // ==========================================
        let materia = {
            codigo: codigoMateria,
            nombre: nombreMateria,
            formato: formatoCodigo,
            facultad: facultad,
            programa: programa,
            creditos: creditos,
            horasTeoricas: horasTeoricas,
            horasPracticas: horasPracticas,
            nivel: nivel,
            tipo: tipoAsignatura,
            prerrequisitos: prerrequisitos,
            correquisitos: correquisitos,
            descripcion: descripcion
        };
        // ==========================================
        // ACTUALIZAR MATERIA
        // ==========================================
        if (codigoEditando !== null) {
            let posicion = materias.findIndex(function (elemento) {
                return elemento.codigo === codigoEditando;
            });

            if (posicion !== -1) {
                // Evitar que el código coincida con otra materia
                let codigoRepetido = materias.some(function (elemento) {
                    return (
                        elemento.codigo === codigoMateria &&
                        elemento.codigo !== codigoEditando
                    );
                });

                if (codigoRepetido) {
                    alert(
                        "Ya existe otra materia con ese código."
                    );
                    return;
                }

                materias[posicion] = materia;
                alert("Materia actualizada correctamente.");
            }

        } else {
            // ==========================================
            // REGISTRAR NUEVA MATERIA
            // ==========================================
            let materiaExiste = materias.some(function (elemento) {
                return elemento.codigo === codigoMateria;
            });

            if (materiaExiste) {
                alert(
                    "Ya existe una materia con ese código."
                );
                return;
            }

            materias.push(materia);
            alert("Materia registrada correctamente.");
        }
        // ==========================================
        // GUARDAR CAMBIOS
        // ==========================================
        localStorage.setItem(
            "materias",
            JSON.stringify(materias)
        );
        console.log("Materias registradas:", materias);
        formulario.reset();
        codigoEditando = null;
        cargarMaterias();
    });
    // ==========================================
    // 7. DESCARTAR INFORMACIÓN
    // ==========================================
    btnDescartar.addEventListener("click", function () {
        let confirmar = confirm(
            "¿Desea descartar la información ingresada?"
        );
        if (confirmar) {
            formulario.reset();
            codigoEditando = null;
            alert("Formulario limpiado correctamente.");
        }
    });
    // ==========================================
    // 8. VISTA PREVIA
    // ==========================================
    btnVista.addEventListener("click", function () {
        let codigo =
            document.getElementById("codigoMateria").value.trim();

        let nombre =
            document.getElementById("nombreMateria").value.trim();

        let creditos =
            document.getElementById("creditos").value;

        let descripcion =
            document.getElementById("descripcion").value.trim();

        if (codigo === "" || nombre === "") {
            alert(
                "Ingrese el código y el nombre de la materia."
            );
            return;
        }
        alert(
            "VISTA PREVIA\n\n" +
            "Código: " + codigo + "\n" +
            "Materia: " + nombre + "\n" +
            "Créditos: " + creditos + "\n" +
            "Descripción: " + descripcion
        );
    });
    // ==========================================
    // 9. VERSIONES CURRICULARES
    // ==========================================
    btnVersiones.addEventListener("click", function () {
        alert(
            "El módulo de versiones curriculares estará disponible próximamente."
        );
    });

    // ==========================================
    // 10. IMPORTAR ARCHIVO
    // ==========================================
    btnImportar.addEventListener("click", function () {
        archivoExcel.click();
    });

    archivoExcel.addEventListener("change", function () {
        let archivo = archivoExcel.files[0];
        if (archivo) {
            let extension = archivo.name
                .split(".")
                .pop()
                .toLowerCase();

            if (
                extension !== "xlsx" &&
                extension !== "xls" &&
                extension !== "csv"
            ) {
                alert(
                    "Seleccione un archivo Excel o CSV válido."
                );
                archivoExcel.value = "";
                return;
            }
            alert(
                "Archivo seleccionado: " + archivo.name
            );

            console.log(
                "Archivo preparado para importar:",
                archivo
            );
        }
    });
    // ==========================================
    // 11. BUSCAR MATERIAS
    // ==========================================
    buscarMateria.addEventListener("input", function () {

        let texto =
            buscarMateria.value.toLowerCase().trim();

        let filas =
            tablaCuerpo.querySelectorAll("tr");

        filas.forEach(function (fila) {

            let contenido =
                fila.textContent.toLowerCase();

            if (contenido.includes(texto)) {
                fila.style.display = "";

            } else {
                fila.style.display = "none";
            }
        });
    });
    // ==========================================
    // 12. EDITAR Y VER MATERIAS
    // ==========================================
    tablaCuerpo.addEventListener("click", function (evento) {
        let boton = evento.target.closest("button");
        if (!boton) {
            return;
        }

        let codigo = boton.getAttribute("data-codigo");

        if (boton.classList.contains("btn-editar")) {
            editarMateria(codigo);
        }

        if (boton.classList.contains("btn-ver")) {
            verMateria(codigo);
        }
    });
    // ==========================================
    // 13. FUNCIÓN PARA EDITAR
    // ==========================================
    function editarMateria(codigo) {
        let materia = materias.find(function (elemento) {
            return elemento.codigo === codigo;
        });

        if (!materia) {
            alert("No se encontró la materia.");
            return;
        }

        document.getElementById("codigoMateria").value =
            materia.codigo;

        document.getElementById("nombreMateria").value =
            materia.nombre;

        document.getElementById("formatoCodigo").value =
            materia.formato || "alfanumerico";

        document.getElementById("facultad").value =
            materia.facultad;

        document.getElementById("programa").value =
            materia.programa;

        document.getElementById("creditos").value =
            materia.creditos;

        document.getElementById("horasTeoricas").value =
            materia.horasTeoricas;

        document.getElementById("horasPracticas").value =
            materia.horasPracticas;

        document.getElementById("nivel").value =
            materia.nivel;

        document.getElementById("tipoAsignatura").value =
            materia.tipo;

        document.getElementById("prerrequisitos").value =
            materia.prerrequisitos;

        document.getElementById("correquisitos").value =
            materia.correquisitos;

        document.getElementById("descripcion").value =
            materia.descripcion;
        codigoEditando = codigo;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

        alert(
            "Información cargada. Puede modificar la materia."
        );
    }
    // ==========================================
    // 14. FUNCIÓN PARA VER INFORMACIÓN
    // ==========================================
    function verMateria(codigo) {
        let materia = materias.find(function (elemento) {
            return elemento.codigo === codigo;
        });

        if (!materia) {
            alert("No se encontró la materia.");
            return;
        }

        alert(
            "INFORMACIÓN DE LA MATERIA\n\n" +
            "Código: " + materia.codigo + "\n" +
            "Nombre: " + materia.nombre + "\n" +
            "Facultad: " + materia.facultad + "\n" +
            "Programa: " + materia.programa + "\n" +
            "Créditos: " + materia.creditos + "\n" +
            "Horas teóricas: " + materia.horasTeoricas + "\n" +
            "Horas prácticas: " + materia.horasPracticas + "\n" +
            "Nivel: " + materia.nivel + "\n" +
            "Tipo: " + materia.tipo
        );
    }
});