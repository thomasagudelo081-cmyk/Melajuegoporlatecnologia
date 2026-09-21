/**
 * Sistema de Gestión Académica (SGA) - Portal Docente
 * Módulo: Gestión de Grupos Asignados (gruposA)
 * Asignatura: Desarrollo Web / Ingeniería de Software
 */

document.addEventListener('DOMContentLoaded', () => {
    GruposModulo.init();
});

const GruposModulo = (() => {
    // ------------------------------------------------------------------
    // ESTADO PRIVADO (State Management)
    // ------------------------------------------------------------------
    const state = {
        cursos: [
            {
                codigo: 'MAT-201',
                nombre: 'Cálculo Diferencial',
                grupo: 'Grupo 02',
                semestre: 'Semestre 2',
                jornada: 'Mañana',
                estudiantes: 32,
                horario: 'Lun y Mié 08:00 - 10:00',
                aula: 'Aula 302 • Edificio B (Campus Central)',
                icono: 'fa-sigma',
                avance: 60,
                estado: 'progress',
                estadoTexto: 'Calificaciones al 60%'
            },
            {
                codigo: 'MAT-102',
                nombre: 'Álgebra Lineal',
                grupo: 'Grupo 01',
                semestre: 'Semestre 1',
                jornada: 'Mañana',
                estudiantes: 35,
                horario: 'Mar y Jue 10:00 - 12:00',
                aula: 'Aula 104 • Pabellón A',
                icono: 'fa-table-cells',
                estado: 'warning',
                estadoTexto: 'Planilla sin enviar'
            },
            {
                codigo: 'MAT-305',
                nombre: 'Métodos Numéricos',
                grupo: 'Grupo 03',
                semestre: 'Semestre 4',
                jornada: 'Tarde',
                estudiantes: 28,
                horario: 'Viernes 14:00 - 18:00',
                aula: 'Laboratorio C-2 • Centro de Cómputo',
                icono: 'fa-laptop-code',
                estado: 'success',
                estadoTexto: 'Actas Listas para Envío'
            },
            {
                codigo: 'MAT-204',
                nombre: 'Ecuaciones Diferenciales',
                grupo: 'Grupo 01',
                semestre: 'Semestre 3',
                jornada: 'Tarde',
                estudiantes: 33,
                horario: 'Lun y Mié 14:00 - 16:00',
                aula: 'Aula 201 • Facultad de Ingeniería',
                icono: 'fa-square-root-variable',
                avance: 80,
                estado: 'neutral',
                estadoTexto: 'Al día'
            }
        ],
        modalCallback: null
    };

    // ------------------------------------------------------------------
    // REFERENCIAS AL DOM (DOM Selectors Cache)
    // ------------------------------------------------------------------
    const DOM = {
        courseGrid: document.getElementById('courseGrid'),
        courseSearch: document.getElementById('courseSearch'),
        globalSearch: document.getElementById('globalSearchInput'),
        semestreFilter: document.getElementById('semestreFilter'),
        jornadaFilter: document.getElementById('jornadaFilter'),
        visibleCount: document.getElementById('visibleCount'),
        syncBtn: document.getElementById('syncBtn'),
        actionModal: document.getElementById('actionModal'),
        modalTitle: document.getElementById('modalTitle'),
        modalBody: document.getElementById('modalBody'),
        modalConfirmBtn: document.getElementById('modalConfirmBtn'),
        toastContainer: document.getElementById('toastContainer')
    };

    // ------------------------------------------------------------------
    // COMPONENTES Y RENDERIZADO (UI Rendering)
    // ------------------------------------------------------------------

    /**
     * Renderiza dinámicamente las tarjetas de cursos evitando reflujos (reflow) usando DocumentFragment
     */
    const renderCursos = (lista) => {
        if (!DOM.courseGrid) return;
        DOM.courseGrid.innerHTML = '';

        if (lista.length === 0) {
            DOM.courseGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
                    <i class="fa-solid fa-folder-open fa-3x" style="margin-bottom: 12px; opacity: 0.5;"></i>
                    <p>No se encontraron asignaturas que coincidan con los filtros aplicados.</p>
                </div>`;
            DOM.visibleCount.textContent = '0';
            return;
        }

        const fragment = document.createDocumentFragment();

        lista.forEach(curso => {
            const card = document.createElement('article');
            card.className = 'course-card';
            card.dataset.code = curso.codigo;
            card.dataset.semester = curso.semestre;
            card.dataset.jornada = curso.jornada;

            card.innerHTML = `
                <div>
                    <div class="card-header">
                        <div>
                            <span class="course-code-tag">${curso.codigo}</span>
                            <span class="semester-tag">${curso.semestre}</span>
                        </div>
                        <i class="fa-solid ${curso.icono} course-icon"></i>
                    </div>
                    <h3 class="course-title">${curso.nombre}</h3>
                    <div class="group-name">${curso.grupo}</div>

                    <div class="course-details">
                        <div class="detail-item"><i class="fa-solid fa-users"></i> <strong>${curso.estudiantes}</strong> Estudiantes</div>
                        <div class="detail-item"><i class="fa-regular fa-clock"></i> ${curso.horario}</div>
                        <div class="detail-item"><i class="fa-solid fa-location-dot"></i> ${curso.aula}</div>
                    </div>

                    ${renderStatusBox(curso)}
                </div>

                <div class="card-actions">
                    ${renderCardActions(curso)}
                </div>
            `;

            fragment.appendChild(card);
        });

        DOM.courseGrid.appendChild(fragment);
        DOM.visibleCount.textContent = lista.length;
    };

    /**
     * Genera la estructura interna de la caja de estado según el tipo
     */
    const renderStatusBox = (curso) => {
        if (curso.estado === 'progress' || curso.estado === 'neutral') {
            const barColor = curso.estado === 'neutral' ? 'var(--primary-dark)' : '#854d0e';
            return `
                <div class="status-box ${curso.estado}">
                    <div style="display: flex; justify-content: space-between; font-weight: 600;">
                        <span>${curso.estadoTexto}</span>
                        <span style="color: ${barColor};">${curso.avance}%</span>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar-fill" style="width: ${curso.avance}%; background-color: ${barColor};"></div>
                    </div>
                </div>`;
        }
        if (curso.estado === 'warning') {
            return `
                <div class="status-box warning">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <span><i class="fa-solid fa-file-circle-exclamation"></i> <strong>${curso.estadoTexto}</strong></span>
                        <span style="font-weight: 700; font-size: 0.75rem;">Pendiente</span>
                    </div>
                    <p style="font-size: 0.75rem; margin-top: 4px; opacity: 0.9;">Tiene notas guardadas en borrador pendientes de publicar.</p>
                </div>`;
        }
        if (curso.estado === 'success') {
            return `
                <div class="status-box success">
                    <div style="display: flex; justify-content: space-between; font-weight: 600; margin-bottom: 4px;">
                        <span><i class="fa-regular fa-circle-check"></i> ${curso.estadoTexto}</span>
                        <span>100% Evaluado</span>
                    </div>
                    <p style="font-size: 0.75rem; color: #1e3a8a;">Cierre consolidado. Puede generar el reporte final firmado.</p>
                </div>`;
        }
        return '';
    };

    /**
     * Configura los botones de acción dinámicos de cada tarjeta
     */
    const renderCardActions = (curso) => {
        if (curso.codigo === 'MAT-102') {
            return `<button class="btn btn-navy btn-action-grades" style="width: 100%;" data-code="${curso.codigo}" data-title="${curso.nombre}">
                        <i class="fa-solid fa-pen-to-square"></i> Ingresar Calificaciones
                    </button>`;
        }
        if (curso.codigo === 'MAT-305') {
            return `<button class="btn btn-light btn-action-records" style="width: 100%;" data-code="${curso.codigo}" data-title="${curso.nombre}">
                        <i class="fa-regular fa-file-pdf"></i> Ver Actas
                    </button>`;
        }
        return `
            <button class="btn btn-light btn-action-criteria" data-code="${curso.codigo}" data-title="${curso.nombre}">Gestionar Criterios</button>
            <button class="btn btn-navy btn-action-grades" data-code="${curso.codigo}" data-title="${curso.nombre}">
                <i class="fa-solid fa-pen-to-square"></i> Ingresar Notas
            </button>`;
    };

    // ------------------------------------------------------------------
    // LÓGICA DE NEGOCIO Y FILTRADO (Business Logic)
    // ------------------------------------------------------------------

    /**
     * Aplica el filtro compuesto de búsqueda por texto, semestre y jornada
     */
    const aplicarFiltros = () => {
        const query = DOM.courseSearch ? DOM.courseSearch.value.toLowerCase().trim() : '';
        const sem = DOM.semestreFilter ? DOM.semestreFilter.value : '';
        const jor = DOM.jornadaFilter ? DOM.jornadaFilter.value : '';

        const filtrados = state.cursos.filter(c => {
            const matchSearch = c.codigo.toLowerCase().includes(query) || c.nombre.toLowerCase().includes(query);
            const matchSemestre = sem === '' || c.semestre === sem;
            const matchJornada = jor === '' || c.jornada === jor;
            return matchSearch && matchSemestre && matchJornada;
        });

        renderCursos(filtrados);
    };

    // ------------------------------------------------------------------
    // ACCIONES DE USUARIO (Handled Actions)
    // ------------------------------------------------------------------

    const accionesModal = {
        ingresarNotas: (codigo, titulo) => {
            abrirModal({
                titulo: `Ingresar Notas - ${titulo} (${codigo})`,
                contenido: `
                    <p style="margin-bottom: 12px;">Seleccione el corte de evaluación a registrar:</p>
                    <select id="modalCorteSelect" class="filter-select" style="width: 100%; margin-bottom: 12px;">
                        <option value="1">Corte 1 (30%)</option>
                        <option value="2">Corte 2 (30%)</option>
                        <option value="3">Corte Final (40%)</option>
                    </select>
                    <div style="background-color: #f1f5f9; padding: 10px; border-radius: 6px; font-size: 0.8rem; color: #475569;">
                        <i class="fa-solid fa-circle-info"></i> La matriz permite autoguardado en local.
                    </div>`,
                onConfirm: () => {
                    const corte = document.getElementById('modalCorteSelect').value;
                    mostrarToast(`Cargando matriz del Corte ${corte} para ${titulo}`);
                }
            });
        },

        gestionarCriterios: (codigo, titulo) => {
            abrirModal({
                titulo: `Criterios de Evaluación - ${titulo}`,
                contenido: `
                    <p style="margin-bottom: 10px;">Distribución porcentual del curso:</p>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 8px;">
                        <li style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Exámenes Parciales:</span>
                            <input type="number" value="50" class="filter-input" style="width: 70px; text-align: center;"> %
                        </li>
                        <li style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Talleres y Quices:</span>
                            <input type="number" value="30" class="filter-input" style="width: 70px; text-align: center;"> %
                        </li>
                        <li style="display: flex; justify-content: space-between; align-items: center;">
                            <span>Proyecto Integrador:</span>
                            <input type="number" value="20" class="filter-input" style="width: 70px; text-align: center;"> %
                        </li>
                    </ul>`,
                onConfirm: () => mostrarToast(`Criterios actualizados con éxito para ${codigo}`)
            });
        },

        verActas: (codigo, titulo) => {
            abrirModal({
                titulo: `Acta Oficial - ${titulo}`,
                contenido: `
                    <p style="margin-bottom: 12px;">Vista previa del consolidado definitivo para <strong>${codigo}</strong>.</p>
                    <div style="border: 1px dashed var(--border-color); padding: 16px; border-radius: 6px; text-align: center; background-color: #fafafa;">
                        <i class="fa-solid fa-file-pdf fa-2x" style="color: #dc2626; margin-bottom: 6px;"></i>
                        <p style="font-size: 0.85rem; font-weight: 600;">Acta_Final_${codigo}_2024-I.pdf</p>
                    </div>`,
                onConfirm: () => mostrarToast(`Descargando Acta PDF de ${codigo}...`)
            });
        },

        sincronizar: () => {
            if (!DOM.syncBtn) return;
            const originalHTML = DOM.syncBtn.innerHTML;
            DOM.syncBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Sincronizando...';
            DOM.syncBtn.disabled = true;

            setTimeout(() => {
                DOM.syncBtn.innerHTML = originalHTML;
                DOM.syncBtn.disabled = false;
                mostrarToast('¡Sincronización con el servidor completada!');
            }, 1200);
        }
    };

    // ------------------------------------------------------------------
    // COMPONENTES REUTILIZABLES (Modal & Toast)
    // ------------------------------------------------------------------

    const abrirModal = ({ titulo, contenido, onConfirm }) => {
        DOM.modalTitle.textContent = titulo;
        DOM.modalBody.innerHTML = contenido;
        state.modalCallback = onConfirm;
        DOM.actionModal.classList.add('active');
    };

    const cerrarModal = () => {
        DOM.actionModal.classList.remove('active');
        state.modalCallback = null;
    };

    const mostrarToast = (mensaje) => {
        if (!DOM.toastContainer) return;
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color: #4ade80;"></i> <span>${mensaje}</span>`;
        
        DOM.toastContainer.appendChild(toast);
        setTimeout(() => toast.remove(), 3000);
    };

    // ------------------------------------------------------------------
    // EVENT DELEGATION & LISTENERS
    // ------------------------------------------------------------------

    const bindEvents = () => {
        // Eventos de entrada para los campos de búsqueda y filtros
        if (DOM.courseSearch) DOM.courseSearch.addEventListener('keyup', aplicarFiltros);
        if (DOM.semestreFilter) DOM.semestreFilter.addEventListener('change', aplicarFiltros);
        if (DOM.jornadaFilter) DOM.jornadaFilter.addEventListener('change', aplicarFiltros);

        if (DOM.globalSearch) {
            DOM.globalSearch.addEventListener('input', (e) => {
                if (DOM.courseSearch) DOM.courseSearch.value = e.target.value;
                aplicarFiltros();
            });
        }

        // Delegación de eventos global para botones de tarjetas dinámicas
        if (DOM.courseGrid) {
            DOM.courseGrid.addEventListener('click', (e) => {
                const btnGrades = e.target.closest('.btn-action-grades');
                const btnCriteria = e.target.closest('.btn-action-criteria');
                const btnRecords = e.target.closest('.btn-action-records');

                if (btnGrades) {
                    accionesModal.ingresarNotas(btnGrades.dataset.code, btnGrades.dataset.title);
                } else if (btnCriteria) {
                    accionesModal.gestionarCriterios(btnCriteria.dataset.code, btnCriteria.dataset.title);
                } else if (btnRecords) {
                    accionesModal.verActas(btnRecords.dataset.code, btnRecords.dataset.title);
                }
            });
        }

        // Botón de Sincronización
        if (DOM.syncBtn) {
            DOM.syncBtn.addEventListener('click', accionesModal.sincronizar);
        }

        // Delegación de eventos para la barra lateral
        document.querySelectorAll('.sidebar-menu li a').forEach(item => {
            item.addEventListener('click', (e) => {
                document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
                e.currentTarget.parentElement.classList.add('active');
                const textoMenu = e.currentTarget.querySelector('span').textContent;
                mostrarToast(`Navegando a: ${textoMenu}`);
            });
        });

        // Controles de Modal
        if (DOM.modalConfirmBtn) {
            DOM.modalConfirmBtn.addEventListener('click', () => {
                if (typeof state.modalCallback === 'function') state.modalCallback();
                cerrarModal();
            });
        }

        // Cierre modal al dar clic por fuera o en botón cancelar
        DOM.actionModal.addEventListener('click', (e) => {
            if (e.target === DOM.actionModal || e.target.closest('.btn-light')) {
                cerrarModal();
            }
        });
    };

    return {
        init: () => {
            bindEvents();
            renderCursos(state.cursos);
        }
    };
})();