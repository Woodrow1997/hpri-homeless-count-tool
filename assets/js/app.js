/* HPRI Homeless Count Data Query Tool — app.js */
'use strict';

// ── NAV ────────────────────────────────────────────────────────────────────
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.dataset.section;
    document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    link.classList.add('active');
    document.getElementById(target).classList.add('active');
  });
});

// ── COLOR PALETTE ───────────────────────────────────────────────────────────
const PALETTE = [
  { line: '#383838', ci: 'rgba(56,56,56,0.12)' },
  { line: '#c65c00', ci: 'rgba(198,92,0,0.12)' },
  { line: '#2c6e9e', ci: 'rgba(44,110,158,0.12)' },
  { line: '#2a7a3b', ci: 'rgba(42,122,59,0.12)' },
  { line: '#8b2fc9', ci: 'rgba(139,47,201,0.12)' },
];
const BREAK_COLOR = '#c65c00';

// ── CHART SETUP ─────────────────────────────────────────────────────────────
let chart = null;

// Build datasets for a SINGLE variable + single geography
function singleDatasets(variable, geoKey, colorIdx) {
  const varData = DATA[variable];
  if (!varData) return [];

  const geoData = resolveGeo(varData, geoKey);
  if (!geoData) return [];

  const col = PALETTE[colorIdx % PALETTE.length];
  const label = varData.label + (colorIdx > 0 ? '' : '');
  const harmKey = varData.harmonization;

  if (!harmKey) {
    // Simple: one CI band + one estimate line
    const ds = [];
    if (geoData.lower95 && geoData.lower95.some(v => v !== null)) {
      ds.push({ label: '_hi_' + colorIdx, data: geoData.upper95, fill: false, borderWidth: 0, borderColor: 'transparent', pointRadius: 0, tension: 0.2, spanGaps: true });
      ds.push({ label: '_lo_' + colorIdx, data: geoData.lower95, fill: '-1', backgroundColor: col.ci, borderWidth: 0, borderColor: 'transparent', pointRadius: 0, tension: 0.2, spanGaps: true });
    }
    ds.push({
      label,
      data: geoData.estimate,
      borderColor: col.line, backgroundColor: col.line,
      borderWidth: 2.5, pointRadius: 5, pointHoverRadius: 7,
      tension: 0.2, fill: false, spanGaps: true
    });
    return ds;
  }

  // Harmonized: single line with color segment at break year
  const note = HARMONIZATION_NOTES[harmKey];
  const breakYr = note.breakYear;
  const ds = [];

  if (geoData.lower95 && geoData.lower95.some(v => v !== null)) {
    ds.push({ label: '_hi_' + colorIdx, data: geoData.upper95, fill: false, borderWidth: 0, borderColor: 'transparent', pointRadius: 0, tension: 0.2, spanGaps: true });
    ds.push({ label: '_lo_' + colorIdx, data: geoData.lower95, fill: '-1', backgroundColor: 'rgba(56,56,56,0.09)', borderWidth: 0, borderColor: 'transparent', pointRadius: 0, tension: 0.2, spanGaps: true });
  }
  ds.push({
    label: label + ' ⚠',
    data: geoData.estimate,
    borderWidth: 2.5, pointRadius: 5, pointHoverRadius: 7,
    tension: 0.2, fill: false, spanGaps: true,
    segment: {
      borderColor: ctx => YEARS[ctx.p1DataIndex] >= breakYr ? BREAK_COLOR : col.line,
      borderDash: ctx => YEARS[ctx.p1DataIndex] >= breakYr ? [6, 3] : [],
    },
    pointBackgroundColor: YEARS.map(yr => yr >= breakYr ? BREAK_COLOR : col.line),
    pointBorderColor: YEARS.map(yr => yr >= breakYr ? BREAK_COLOR : col.line),
  });
  return ds;
}

function resolveGeo(varData, geoKey) {
  if (!varData || !varData.geographies) return null;
  const g = varData.geographies;
  if (geoKey === 'coc') return g.coc || null;
  if (geoKey === 'city') return g.city || g.coc || null;
  if (geoKey === 'county') return g.county || null;
  if (geoKey.startsWith('spa')) {
    const n = parseInt(geoKey.replace('spa',''));
    return g.spa && g.spa[n] ? g.spa[n] : null;
  }
  return g.coc || null;
}

// ── MAIN RENDER ─────────────────────────────────────────────────────────────
function renderChart() {
  const mode = document.getElementById('mode-select').value;
  const geoEl = document.getElementById('geo-select');
  const spaEl = document.getElementById('spa-select');
  const varEl = document.getElementById('var-select');
  const geoMultiEl = document.getElementById('geo-multi-select');

  // Show/hide UI groups
  document.getElementById('geo-group').style.display = mode === 'compare-geo' ? 'none' : 'flex';
  document.getElementById('spa-group').style.display = (mode === 'single' && geoEl.value === 'spa') ? 'flex' : 'none';
  document.getElementById('geo-multi-group').style.display = mode === 'compare-geo' ? 'flex' : 'none';
  document.getElementById('multi-hint').style.display = mode === 'compare-demo' ? 'block' : 'none';
  varEl.size = mode === 'compare-demo' ? 8 : 1;
  varEl.multiple = mode === 'compare-demo';

  // Determine what to plot
  let allDatasets = [];
  let titleParts = [];
  let showHarmAlert = false;

  if (mode === 'single') {
    const geoKey = geoEl.value === 'spa' ? 'spa' + spaEl.value : geoEl.value;
    const variable = varEl.value;
    const varData = DATA[variable];
    if (varData && varData.harmonization) showHarmAlert = varData.harmonization;
    allDatasets = singleDatasets(variable, geoKey, 0);
    titleParts = [varData ? varData.label : variable, geoEl.options[geoEl.selectedIndex].text];

  } else if (mode === 'compare-demo') {
    const geoKey = geoEl.value === 'spa' ? 'spa' + spaEl.value : geoEl.value;
    const selected = Array.from(varEl.selectedOptions).map(o => o.value);
    selected.forEach((variable, i) => {
      const varData = DATA[variable];
      if (!varData) return;
      if (varData.harmonization) showHarmAlert = varData.harmonization;
      allDatasets = allDatasets.concat(singleDatasets(variable, geoKey, i));
    });
    titleParts = [selected.map(v => DATA[v] ? DATA[v].label : v).join(' vs '), geoEl.options[geoEl.selectedIndex].text];

  } else if (mode === 'compare-geo') {
    const variable = varEl.value;
    const varData = DATA[variable];
    if (varData && varData.harmonization) showHarmAlert = varData.harmonization;
    const selectedGeos = Array.from(geoMultiEl.selectedOptions).map(o => o.value);
    selectedGeos.forEach((geoKey, i) => {
      const geoLabel = geoMultiEl.querySelector(`option[value="${geoKey}"]`).text;
      const ds = singleDatasets(variable, geoKey, i);
      // Rename the estimate line to include geo label
      ds.filter(d => d.label && !d.label.startsWith('_')).forEach(d => d.label = geoLabel);
      allDatasets = allDatasets.concat(ds);
    });
    titleParts = [varData ? varData.label : variable, 'Geography comparison'];
  }

  // Harmonization alert
  const alertEl = document.getElementById('harm-alert');
  if (showHarmAlert) {
    const note = HARMONIZATION_NOTES[showHarmAlert];
    alertEl.querySelector('.harm-text').textContent = note.note;
    alertEl.classList.add('visible');
  } else {
    alertEl.classList.remove('visible');
  }

  document.getElementById('chart-title').textContent = titleParts.join(' · ');

  // Render
  const ctx = document.getElementById('main-chart').getContext('2d');
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'line',
    data: { labels: YEARS.map(String), datasets: allDatasets },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: {
          display: true,
          labels: {
            filter: item => item.text && !item.text.startsWith('_'),
            font: { size: 12 }
          }
        },
        tooltip: {
          filter: item => item.parsed.y !== null && item.dataset.label && !item.dataset.label.startsWith('_'),
          callbacks: {
            label: ctx => {
              if (!ctx.parsed.y && ctx.parsed.y !== 0) return null;
              return ctx.dataset.label.replace(' ⚠','') + ': ' + ctx.parsed.y.toLocaleString();
            }
          }
        }
      },
      scales: {
        y: {
          title: { display: true, text: 'Estimated Count', font: { size: 12 } },
          ticks: { callback: v => v.toLocaleString() }
        },
        x: { title: { display: true, text: 'Count Year' } }
      }
    }
  });
}

// ── EVENT LISTENERS ─────────────────────────────────────────────────────────
['mode-select','geo-select','spa-select','var-select','geo-multi-select'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', renderChart);
});

// ── DATA LIBRARY ─────────────────────────────────────────────────────────
function renderLibrary() {
  const tbody = document.getElementById('library-tbody');
  tbody.innerHTML = DATA_LIBRARY.map(row => `
    <tr>
      <td><span class="year-badge">${row.year}</span></td>
      <td>${row.type}</td>
      <td>${row.n}</td>
      <td>${row.format}</td>
      <td style="color:#555;font-size:.85rem">${row.notes}</td>
    </tr>
  `).join('');
}

// ── INIT ────────────────────────────────────────────────────────────────────
renderChart();
renderLibrary();
