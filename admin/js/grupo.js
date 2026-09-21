document.addEventListener("DOMContentLoaded", function () {
    // =========================================
    // FORMULARIO DE GRUPO
    // =========================================
    let formulario = document.getElementById("formGrupo");
    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();
        let codigoGrupo =
            document.getElementById("codigoGrupo").value.trim();

        let periodo =
            document.getElementById("periodo").value;

        let materia =
            document.getElementById("materia").value;

        let docente =
            document.getElementById("docente").value;

        let capacidad =
            document.getElementById("capacidad").value;

        let aula =
            document.getElementById("aula").value.trim();

        console.log("Código:", codigoGrupo);
        console.log("Período:", periodo);
        console.log("Materia:", materia);
        console.log("Docente:", docente);
        console.log("Capacidad:", capacidad);
        console.log("Aula:", aula);

        // VALIDAR CAMPOS OBLIGATORIOS
        if (
            codigoGrupo === "" ||
            periodo === "" ||
            materia === "" ||
            docente === "" ||
            capacidad === ""
        ) {
            alert("Complete todos los campos obligatorios.");
            return;
        }
        // VALIDAR CAPACIDAD
        if (Number(capacidad) <= 0) {
            alert("La capacidad debe ser mayor que cero.");
            return;
        }

        // VALIDAR CÓDIGO
        if (codigoGrupo.length < 3) {
            alert("Ingrese un código de grupo válido.");
            return;
        }

        // GUARDAR EN EL ALMACÉN
        let grupo = {
            codigo: codigoGrupo,
            periodo: periodo,
            materia: materia,
            docente: docente,
            capacidad: capacidad,
            aula: aula
        };

        Almacen.agregar("grupos", grupo);
        alert("Grupo guardado correctamente.");
        window.location.href = "Ges_Universidad.html";
    });
});
