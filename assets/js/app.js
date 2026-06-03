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

// ── CHART SETUP ─────────────────────────────────────────────────────────────
let chart = null;

const COLORS = {
  line: '#990000',
  ci: 'rgba(153,0,0,0.12)',
  lineBreak1: '#990000',
  lineBreak2: '#cc6600',
  ci2: 'rgba(204,102,0,0.12)'
};

function buildChartDatasets(geo, variable) {
  const varData = DATA[variable];
  if (!varData) {
    console.warn('Variable not found in data:', variable);
    return { datasets: [], labels: YEARS.map(String) };
  }

  // Determine which geo data to use
  let geoData = null;
  if (geo === 'coc') {
    geoData = varData.geographies.coc;
  } else if (geo === 'city') {
    geoData = varData.geographies.city || varData.geographies.coc; // fallback
  } else if (geo === 'county') {
    geoData = varData.geographies.county || varData.geographies.coc;
  } else if (geo.startsWith('spa')) {
    const spaNum = parseInt(geo.replace('spa', ''));
    geoData = varData.geographies.spa ? varData.geographies.spa[spaNum] : varData.geographies.coc;
  }

  if (!geoData) {
    console.warn('Geo data not found:', geo, 'for variable:', variable);
    return { datasets: [], labels: YEARS.map(String) };
  }

  const harmKey = varData.harmonization;
  const labels = YEARS.map(String);

  if (!harmKey) {
    // Clean trend — single line with CI band
    return {
      labels,
      datasets: [
        {
          label: 'CI Band',
          data: geoData.upper95,
          fill: '+1',
          borderWidth: 0,
          backgroundColor: COLORS.ci,
          pointRadius: 0,
          tension: 0.3
        },
        {
          label: 'Lower CI',
          data: geoData.lower95,
          fill: false,
          borderWidth: 0,
          borderColor: 'transparent',
          pointRadius: 0,
          tension: 0.3
        },
        {
          label: varData.label,
          data: geoData.estimate,
          borderColor: COLORS.line,
          backgroundColor: COLORS.line,
          borderWidth: 2.5,
          pointRadius: 5,
          pointHoverRadius: 7,
          tension: 0.3,
          fill: false
        }
      ]
    };
  }

  // Has harmonization break — single line with color change at break year
  // Simple, reliable: Chart.js segment option colors different parts of the line
  const note = HARMONIZATION_NOTES[harmKey];
  const breakYr = note.breakYear;
  const breakIdx = YEARS.indexOf(breakYr);

  // CI band (full width, single color)
  const hasCi = geoData.lower95.some(v => v !== null);
  const datasets = [];

  if (hasCi) {
    // Upper CI
    datasets.push({
      label: '_ci_hi',
      data: geoData.upper95,
      fill: false,
      borderWidth: 0,
      borderColor: 'transparent',
      backgroundColor: 'transparent',
      pointRadius: 0,
      tension: 0.2,
      spanGaps: true
    });
    // Lower CI — fill to upper
    datasets.push({
      label: '_ci_lo',
      data: geoData.lower95,
      fill: '-1',
      backgroundColor: 'rgba(56,56,56,0.10)',
      borderWidth: 0,
      borderColor: 'transparent',
      pointRadius: 0,
      tension: 0.2,
      spanGaps: true
    });
  }

  // Main estimate line — color changes at break year via segment option
  datasets.push({
    label: varData.label,
    data: geoData.estimate,
    borderWidth: 2.5,
    pointRadius: 5,
    pointHoverRadius: 7,
    tension: 0.2,
    fill: false,
    spanGaps: true,
    segment: {
      borderColor: ctx => YEARS[ctx.p1DataIndex] >= breakYr ? COLORS.lineBreak2 : COLORS.lineBreak1,
      borderDash: ctx => YEARS[ctx.p1DataIndex] >= breakYr ? [6, 3] : [],
    },
    pointBackgroundColor: YEARS.map(yr => yr >= breakYr ? COLORS.lineBreak2 : COLORS.lineBreak1),
    pointBorderColor: YEARS.map(yr => yr >= breakYr ? COLORS.lineBreak2 : COLORS.lineBreak1),
  });

  return { labels, datasets };
}

function renderChart() {
  const geoSelect  = document.getElementById('geo-select');
  const varSelect  = document.getElementById('var-select');
  const spaGroup   = document.getElementById('spa-group');
  const spaSelect  = document.getElementById('spa-select');

  let geo = geoSelect.value;
  if (geo === 'spa') geo = 'spa' + spaSelect.value;

  const variable = varSelect.value;
  const varData  = DATA[variable];

  // Show/hide SPA sub-selector
  spaGroup.style.display = (geoSelect.value === 'spa') ? 'flex' : 'none';

  // Harmonization alert
  const alertEl = document.getElementById('harm-alert');
  if (varData && varData.harmonization) {
    const note = HARMONIZATION_NOTES[varData.harmonization];
    alertEl.querySelector('.harm-text').textContent = note.note;
    alertEl.classList.add('visible');
  } else {
    alertEl.classList.remove('visible');
  }

  // Chart title
  const geoLabel = geoSelect.options[geoSelect.selectedIndex].text +
    (geoSelect.value === 'spa' ? ' — ' + spaSelect.options[spaSelect.selectedIndex].text : '');
  document.getElementById('chart-title').textContent =
    (varData ? varData.label : 'Unsheltered Adults') + ' · ' + geoLabel;

  // Build datasets
  const { labels, datasets } = buildChartDatasets(geo, variable);

  const ctx = document.getElementById('main-chart').getContext('2d');
  if (chart) chart.destroy();

  chart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets },
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
          callbacks: {
            label: ctx => {
              if (ctx.dataset.label === 'Lower CI' || ctx.dataset.label?.includes('CI Band')) return null;
              const val = ctx.parsed.y;
              if (val === null) return null;
              return ctx.dataset.label + ': ' + val.toLocaleString();
            }
          },
          filter: item => item.parsed.y !== null && item.dataset.label && !item.dataset.label.startsWith('_')
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
document.getElementById('geo-select').addEventListener('change', renderChart);
document.getElementById('var-select').addEventListener('change', renderChart);
document.getElementById('spa-select').addEventListener('change', renderChart);

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
