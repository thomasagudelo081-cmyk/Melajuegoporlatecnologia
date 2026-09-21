/**
 * Sistema de Gestión Académica (SGA) - Portal Docente
 * Módulo: Configuración de Criterios y Calificaciones
 * Asignatura: Desarrollo Web / Ingeniería de Sistemas
 */

document.addEventListener('DOMContentLoaded', () => {
    CriteriosModulo.init();
});

const CriteriosModulo = (() => {
    // ------------------------------------------------------------------
    // ESTADO PRIVADO (State Management)
    // ------------------------------------------------------------------
    const state = {
        pesosPorDefecto: [0.30, 0.30, 0.40]
    };

    // ------------------------------------------------------------------
    // REFERENCIAS AL DOM (DOM Selectors Cache)
    // ------------------------------------------------------------------
    const DOM = {
        formCriterio: document.getElementById('formCriterio'),
        nombreCriterio: document.getElementById('nombreCriterio'),
        porcentajeCriterio: document.getElementById('porcentajeCriterio'),
        tbodyCriterios: document.getElementById('tbodyCriterios'),
        totalPorcentaje: document.getElementById('totalPorcentaje'),
        tablaNotas: document.getElementById('tablaNotas'),
        globalSearch: document.getElementById('globalSearch'),
        btnExportar: document.querySelector("button[onclick*='exportarPlanilla']"),
        btnGuardar: document.querySelector("button[onclick*='guardarBorrador']"),
        btnEnviar: document.querySelector("button[onclick*='enviarCoordinacion']"),
        btnNotificaciones: document.querySelector("button[onclick*='notificaciones']"),
        btnConfiguracion: document.querySelector("button[onclick*='configuracion']")
    };

    // ------------------------------------------------------------------
    // LÓGICA DE NEGOCIO Y CÁLCULOS (Business Logic)
    // ------------------------------------------------------------------

    /**
     * Recalcula la suma total de los porcentajes asignados a los criterios
     */
    const recalcularTotalPorcentaje = () => {
        if (!DOM.tbodyCriterios || !DOM.totalPorcentaje) return;

        const rows = DOM.tbodyCriterios.querySelectorAll('tr');
        let total = 0;

        rows.forEach(r => {
            const cellText = r.cells[1]?.innerText || '0';
            const valor = parseInt(cellText.replace('%', ''), 10);
            if (!isNaN(valor)) total += valor;
        });

        DOM.totalPorcentaje.innerText = `${total}%`;

        if (total === 100) {
            DOM.totalPorcentaje.className = 'text-center font-weight-bold success-text';
        } else {
            DOM.totalPorcentaje.className = 'text-center font-weight-bold danger-text';
        }
    };

    /**
     * Calcula el promedio ponderado de un estudiante según sus calificaciones
     */
    const calcularPromedioFila = (inputElement) => {
        const tr = inputElement.closest('tr');
        if (!tr) return;

        const inputs = tr.querySelectorAll('.grade-input');
        let acumulado = 0;

        inputs.forEach((inp, idx) => {
            const val = parseFloat(inp.value) || 0;
            acumulado += val * (state.pesosPorDefecto[idx] || 0);
        });

        const scoreCell = tr.querySelector('.score-cell');
        if (!scoreCell) return;

        const promedioFinal = acumulado.toFixed(1);
        scoreCell.innerText = promedioFinal;

        // Actualizar representación visual según el desempeño
        if (promedioFinal >= 85) {
            scoreCell.className = 'text-center font-weight-bold text-success score-cell';
        } else if (promedioFinal >= 70) {
            scoreCell.className = 'text-center font-weight-bold text-warning score-cell';
        } else {
            scoreCell.className = 'text-center font-weight-bold text-danger score-cell';
        }
    };

    /**
     * Filtra la tabla de estudiantes según el texto ingresado en la búsqueda
     */
    const filtrarTablaEstudiantes = () => {
        if (!DOM.globalSearch || !DOM.tablaNotas) return;
        const query = DOM.globalSearch.value.toLowerCase().trim();
        const rows = DOM.tablaNotas.querySelectorAll('tbody tr');

        rows.forEach(row => {
            const text = row.innerText.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    };

    // ------------------------------------------------------------------
    // ACCIONES DE USUARIO & MANEJADORES DE EVENTOS (Event Handlers)
    // ------------------------------------------------------------------

    const agregarCriterio = (e) => {
        e.preventDefault();
        const nombre = DOM.nombreCriterio.value.trim();
        const porcentaje = parseInt(DOM.porcentajeCriterio.value, 10);

        if (!nombre || isNaN(porcentaje)) return;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${nombre}</td>
            <td class="text-center">${porcentaje}%</td>
            <td class="text-right">
                <button class="btn-delete" type="button">
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </td>
        `;

        DOM.tbodyCriterios.appendChild(tr);
        DOM.formCriterio.reset();
        recalcularTotalPorcentaje();
    };

    const accionesPlanilla = {
        exportar: () => alert("⚙️ Exportando planilla de calificaciones en formato Excel/PDF..."),
        guardarBorrador: () => alert("💾 Guardado exitoso. La información se ha guardado temporalmente."),
        enviarCoordinacion: () => {
            const total = parseInt(DOM.totalPorcentaje.innerText, 10);
            if (total !== 100) {
                alert("⚠️ Atención: La suma de los criterios debe ser exactamente igual al 100% para enviar la planilla.");
                return;
            }
            alert("🚀 ¡Planilla enviada exitosamente a la Coordinación Académica!");
        },
        notificaciones: () => alert("🔔 Tienes 2 notificaciones del sistema docente."),
        configuracion: () => alert("⚙️ Ajustes del sistema.")
    };

    // ------------------------------------------------------------------
    // REGISTRO DE EVENTOS (Event Listeners & Delegation)
    // ------------------------------------------------------------------

    const bindEvents = () => {
        // Formulario de criterios
        if (DOM.formCriterio) {
            DOM.formCriterio.addEventListener('submit', agregarCriterio);
        }

        // Delegación para eliminar criterios dinámicamente
        if (DOM.tbodyCriterios) {
            DOM.tbodyCriterios.addEventListener('click', (e) => {
                const btnDelete = e.target.closest('.btn-delete');
                if (btnDelete) {
                    const row = btnDelete.closest('tr');
                    if (row) row.remove();
                    recalcularTotalPorcentaje();
                }
            });
        }

        // Delegación para cálculo de notas en tiempo real
        if (DOM.tablaNotas) {
            DOM.tablaNotas.addEventListener('input', (e) => {
                if (e.target.classList.contains('grade-input')) {
                    calcularPromedioFila(e.target);
                }
            });
        }

        // Búsqueda global
        if (DOM.globalSearch) {
            DOM.globalSearch.addEventListener('keyup', filtrarTablaEstudiantes);
        }

        // Eventos para botones de la barra superior y acciones
        if (DOM.btnExportar) DOM.btnExportar.addEventListener('click', accionesPlanilla.exportar);
        if (DOM.btnGuardar) DOM.btnGuardar.addEventListener('click', accionesPlanilla.guardarBorrador);
        if (DOM.btnEnviar) DOM.btnEnviar.addEventListener('click', accionesPlanilla.enviarCoordinacion);
        if (DOM.btnNotificaciones) DOM.btnNotificaciones.addEventListener('click', accionesPlanilla.notificaciones);
        if (DOM.btnConfiguracion) DOM.btnConfiguracion.addEventListener('click', accionesPlanilla.configuracion);
    };

    return {
        init: () => {
            bindEvents();
            recalcularTotalPorcentaje();
        }
    };
})();