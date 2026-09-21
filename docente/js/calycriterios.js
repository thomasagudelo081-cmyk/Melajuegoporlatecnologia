function parseGrade(val) {
    if(!val || val.trim() === '-' || val.trim() === '') return null;
    let normalized = val.replace(',', '.');
    let parsed = parseFloat(normalized);
    return isNaN(parsed) ? null : parsed;
}

function formatGrade(num) {
    if (num === null) return '-';
    return num % 1 === 0 ? num.toFixed(1) : parseFloat(num.toFixed(2)).toString();
}

function calcularFila(input) {
    const tr = input.closest('tr');
    const inputs = tr.querySelectorAll('.grade-input');
    const finalCell = tr.querySelector('.final-grade');

    inputs.forEach(inp => {
        let val = parseGrade(inp.value);
        if(val !== null && val < 3.0) {
            inp.classList.add('danger-border');
        } else {
            inp.classList.remove('danger-border');
        }
    });

    const weights = Array.from(document.querySelectorAll('.crit-weight')).map(w => (parseFloat(w.value) || 0) / 100);

    let total = 0;
    let hasAllGrades = true;

    inputs.forEach((inp, idx) => {
        let val = parseGrade(inp.value);
        if (val !== null && weights[idx]) {
            total += val * weights[idx];
        } else {
            hasAllGrades = false;
        }
    });

    if (hasAllGrades && weights.reduce((a, b) => a + b, 0) > 0) {
        finalCell.innerText = formatGrade(total);
        finalCell.classList.remove('text-muted');
    } else {
        finalCell.innerText = '-';
        finalCell.classList.add('text-muted');
    }
}

function recalcularCriterios() {
    const weights = document.querySelectorAll('.crit-weight');
    let sum = 0;
    weights.forEach(w => sum += parseFloat(w.value) || 0);

    const totalEl = document.getElementById('totalPercent');
    totalEl.innerText = `${sum}%`;
    
    if(sum === 100) {
        totalEl.style.color = '#0b1a30';
    } else {
        totalEl.style.color = '#d32f2f';
    }

    document.querySelectorAll('#tablaNotas tbody tr input.grade-input').forEach(inp => calcularFila(inp));
}

function agregarParametro() {
    const container = document.getElementById('criteriaList');
    const newBox = document.createElement('div');
    newBox.className = 'criterion-box';
    newBox.innerHTML = `
        <div class="input-group">
            <label>Nombre del Parámetro</label>
            <input type="text" class="crit-name" placeholder="Nuevo Parámetro">
        </div>
        <div class="input-group weight-group">
            <label>Peso (%)</label>
            <input type="number" class="crit-weight" value="0" oninput="recalcularCriterios()">
        </div>
    `;
    container.appendChild(newBox);
    recalcularCriterios();
}

function filtrarTablaEstudiantes() {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    const rows = document.querySelectorAll('#tablaNotas tbody tr');

    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(query) ? '' : 'none';
    });
}

function guardarBorrador() {
    alert("💾 Borrador guardado correctamente.");
}

function exportarPlanilla() {
    alert("📄 Exportando planilla a formato Excel / PDF...");
}

function enviarCoordinacion() {
    alert("🚀 Planilla de Cálculo Diferencial enviada a Coordinación.");
}
