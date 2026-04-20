// ── Grade Data ─────────────────────────────────────────────────────────────
const GRADE_POINTS = { O: 10, 'A+': 9, A: 8, 'B+': 7, B: 6, 'C+': 5, C: 4, U: 0 };
const GRADES = Object.keys(GRADE_POINTS);

function getGrade(mark) {
  if (mark >= 96) return ['O', 10];
  if (mark >= 91) return ['A+', 9];
  if (mark >= 81) return ['A', 8];
  if (mark >= 71) return ['B+', 7];
  if (mark >= 61) return ['B', 6];
  if (mark >= 51) return ['C+', 5];
  if (mark === 50) return ['C', 4];
  return ['U', 0];
}

// ── Tab Switching ───────────────────────────────────────────────────────────
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('panel-' + btn.dataset.tab).classList.add('active');
  });
});

// ── Helper: Create Select for Grades ───────────────────────────────────────
function gradeSelect(id) {
  return `
    <select id="${id}">
      <option value="" disabled selected>Select</option>
      ${GRADES.map(g => `<option value="${g}">${g}</option>`).join('')}
    </select>
  `;
}

// ── MARKS PANEL ─────────────────────────────────────────────────────────────
function renderMarksInputs() {
  const value = document.getElementById('marks-count').value;

  if (!value) {
    document.getElementById('marks-inputs').innerHTML = '';
    return;
  }

  const n = parseInt(value);
  const grid = document.getElementById('marks-inputs');
  grid.innerHTML = '';

  for (let i = 0; i < n; i++) {
    grid.innerHTML += `
      <div class="subject-item">
        <label>SUBJECT ${i + 1}</label>
        <input type="number" id="mark-${i}" min="0" max="100" placeholder="0–100">
      </div>`;
  }
}

document.getElementById('marks-count').addEventListener('change', renderMarksInputs);

document.getElementById('calc-marks-btn').addEventListener('click', () => {
  const value = document.getElementById('marks-count').value;

  if (value === "") {
    alert("Please select number of subjects");
    return;
  }

  const n = parseInt(value);
  let total = 0, hasFail = false, rows = '';

  for (let i = 0; i < n; i++) {
    const mark = parseInt(document.getElementById(`mark-${i}`).value) || 0;
    if (mark < 0 || mark > 100) {
      alert(`Subject ${i + 1}: Marks must be between 0 and 100.`);
      return;
    }
    const [grade, pts] = getGrade(mark);
    if (grade === 'U') hasFail = true;
    total += pts;
    rows += `
      <div class="result-row">
        <span class="sub-name">Subject ${i + 1} — ${mark} marks</span>
        <span class="${grade === 'U' ? 'grade-pill u-grade' : 'grade-pill'}">${grade}</span>
      </div>`;
  }

  const cgpa = (total / n).toFixed(2);
  document.getElementById('marks-cgpa').textContent = cgpa;
  document.getElementById('marks-badge').textContent = hasFail ? 'FAIL' : 'PASS';
  document.getElementById('marks-badge').className = 'result-badge ' + (hasFail ? 'fail' : 'pass');
  document.getElementById('marks-table').innerHTML = rows;
  document.getElementById('marks-result').classList.remove('hidden');
});

// ── GPA PANEL ───────────────────────────────────────────────────────────────
function renderGpaInputs() {
  const value = document.getElementById('gpa-count').value;
  if (value === "") {
    alert("Please select number of subjects");
    return;
  }

  const n = parseInt(value);
  const grid = document.getElementById('gpa-inputs');
  grid.innerHTML = '';

  for (let i = 0; i < n; i++) {
    grid.innerHTML += `
      <div class="subject-item">
        <label>SUBJECT ${i + 1}</label>
        <div class="sub-row-inner">
          <div>
            <label>GRADE</label>
            ${gradeSelect(`grade-${i}`)}
          </div>
          <div>
            <label>CREDITS</label>
            <input type="number" id="credit-${i}" min="1" max="5" placeholder="1–5">
          </div>
        </div>
      </div>`;
  }
}

document.getElementById('gpa-count').addEventListener('change', renderGpaInputs);

document.getElementById('calc-gpa-btn').addEventListener('click', () => {
  const n = parseInt(document.getElementById('gpa-count').value);
  let totalPts = 0, totalCreds = 0, rows = '';

  for (let i = 0; i < n; i++) {
    const grade = document.getElementById(`grade-${i}`).value;
    const credit = parseInt(document.getElementById(`credit-${i}`).value) || 0;
    const pts = GRADE_POINTS[grade];

    if (grade !== 'U' && credit > 0) {
      totalPts += pts * credit;
      totalCreds += credit;
    }

    rows += `
      <div class="result-row">
        <span class="sub-name">Subject ${i + 1}</span>
        <span class="sub-val">${grade} · ${credit} cr · ${pts * credit} pts</span>
      </div>`;
  }

  if (totalCreds === 0) { alert('No valid credits found. Check your inputs.'); return; }

  const gpa = (totalPts / totalCreds).toFixed(2);
  document.getElementById('gpa-value').textContent = gpa;
  document.getElementById('gpa-credits').textContent = totalCreds;
  document.getElementById('gpa-table').innerHTML = rows +
    `<div class="result-row">
      <span class="sub-name" style="font-weight:600;color:var(--text)">Total weighted points</span>
      <span class="sub-val" style="color:var(--accent)">${totalPts}</span>
    </div>`;
  document.getElementById('gpa-result').classList.remove('hidden');
});

// ── CGPA FROM SEMESTERS PANEL ───────────────────────────────────────────────
function renderSemInputs() {
  const value = document.getElementById('sem-count').value;
  if (value === "") {
    alert("Please select number of semesters");
    return;
  }

  const n = parseInt(value);
  const grid = document.getElementById('sem-inputs');
  grid.innerHTML = '';

  for (let i = 0; i < n; i++) {
    grid.innerHTML += `
      <div class="subject-item">
        <label>SEMESTER ${i + 1} GPA</label>
        <input type="number" id="sem-${i}" min="0" max="10" step="0.01" placeholder="0.00–10.00">
      </div>`;
  }
}

document.getElementById('sem-count').addEventListener('change', renderSemInputs);

document.getElementById('calc-cgpa-btn').addEventListener('click', () => {
  const n = parseInt(document.getElementById('sem-count').value);
  let total = 0, rows = '';

  for (let i = 0; i < n; i++) {
    const gpa = parseFloat(document.getElementById(`sem-${i}`).value) || 0;
    if (gpa < 0 || gpa > 10) { alert(`Semester ${i + 1}: GPA must be 0–10.`); return; }
    total += gpa;
    rows += `
      <div class="result-row">
        <span class="sub-name">Semester ${i + 1}</span>
        <span class="sub-val">${gpa.toFixed(2)}</span>
      </div>`;
  }

  const cgpa = (total / n).toFixed(2);
  document.getElementById('cgpa-value').textContent = cgpa;
  document.getElementById('cgpa-table').innerHTML = rows;
  document.getElementById('cgpa-result').classList.remove('hidden');
});

// ── Init ────────────────────────────────────────────────────────────────────
document.getElementById('marks-count').addEventListener('change', renderMarksInputs);
document.getElementById('gpa-count').addEventListener('change', renderGpaInputs);
document.getElementById('sem-count').addEventListener('change', renderSemInputs);
