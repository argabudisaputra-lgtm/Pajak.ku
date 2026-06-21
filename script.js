// ================= KALKUPAJAK ENGINE v1.1.0 =================
// Implementasi: Theme Engine, PPh 21 Koreksi DJP, Gross Up, PKP Rounding

// ===================== DARK / LIGHT MODE ENGINE =====================
function applyMode(mode) {
  document.documentElement.setAttribute('data-mode', mode);
  try { localStorage.setItem('kalkupajak-mode', mode); } catch(e){}

  // Update header toggle icon
  const icon = document.getElementById('mode-icon');
  if (icon) {
    icon.className = mode === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
  }

  // Update mode cards in settings
  document.getElementById('mode-card-dark')?.classList.toggle('active', mode === 'dark');
  document.getElementById('mode-card-light')?.classList.toggle('active', mode === 'light');
}

function loadSavedMode() {
  let saved = 'dark';
  try { saved = localStorage.getItem('kalkupajak-mode') || 'dark'; } catch(e){}
  applyMode(saved);
}

// Header mode toggle button
document.getElementById('mode-toggle-btn')?.addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-mode') || 'dark';
  applyMode(current === 'dark' ? 'light' : 'dark');
});

// ===================== THEME ENGINE =====================
const THEMES = {
  default: {
    '--primary': '#7367f0',
    '--primary-gradient': 'linear-gradient(135deg, #7367f0 0%, #a29bfe 100%)',
    '--border-focus': 'rgba(115, 103, 240, 0.5)',
    '--shadow-glow': '0 0 20px rgba(115, 103, 240, 0.15)',
  },
  sunset: {
    '--primary': '#ff6b35',
    '--primary-gradient': 'linear-gradient(135deg, #ff6b35 0%, #f7c59f 100%)',
    '--border-focus': 'rgba(255, 107, 53, 0.5)',
    '--shadow-glow': '0 0 20px rgba(255, 107, 53, 0.15)',
  },
  forest: {
    '--primary': '#10b981',
    '--primary-gradient': 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
    '--border-focus': 'rgba(16, 185, 129, 0.5)',
    '--shadow-glow': '0 0 20px rgba(16, 185, 129, 0.15)',
  },
  cyberpunk: {
    '--primary': '#ec4899',
    '--primary-gradient': 'linear-gradient(135deg, #ec4899 0%, #f472b6 100%)',
    '--border-focus': 'rgba(236, 72, 153, 0.5)',
    '--shadow-glow': '0 0 20px rgba(236, 72, 153, 0.15)',
  },
  gold: {
    '--primary': '#f59e0b',
    '--primary-gradient': 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
    '--border-focus': 'rgba(245, 158, 11, 0.5)',
    '--shadow-glow': '0 0 20px rgba(245, 158, 11, 0.15)',
  },
};

function applyTheme(themeName) {
  try { localStorage.setItem('kalkupajak-theme', themeName); } catch(e){}
  const theme = THEMES[themeName] || THEMES.default;
  const root = document.documentElement;
  Object.entries(theme).forEach(([prop, val]) => {
    root.style.setProperty(prop, val);
  });
  // Update active state on theme cards
  document.querySelectorAll('.theme-card').forEach(card => {
    if (card.getAttribute('data-theme') === themeName) {
      card.classList.add('active');
    } else {
      card.classList.remove('active');
    }
  });
}

function loadSavedTheme() {
  let saved = 'default';
  try { saved = localStorage.getItem('kalkupajak-theme') || 'default'; } catch(e){}
  applyTheme(saved);
}

// ===================== TER DATABASE (PP 58/2023) =====================
const TER_DATABASE = {
  A: [
    { max: 5400000, rate: 0 }, { max: 5650000, rate: 0.25 }, { max: 5950000, rate: 0.5 },
    { max: 6300000, rate: 0.75 }, { max: 6750000, rate: 1.0 }, { max: 7500000, rate: 1.25 },
    { max: 8550000, rate: 1.5 }, { max: 9650000, rate: 1.75 }, { max: 10050000, rate: 2.0 },
    { max: 10350000, rate: 2.25 }, { max: 10700000, rate: 2.5 }, { max: 11050000, rate: 3.0 },
    { max: 11600000, rate: 3.5 }, { max: 12500000, rate: 4.0 }, { max: 13750000, rate: 4.5 },
    { max: 15100000, rate: 5.0 }, { max: 16950000, rate: 5.5 }, { max: 19750000, rate: 6.0 },
    { max: 24150000, rate: 7.0 }, { max: 26450000, rate: 7.5 }, { max: 28000000, rate: 8.0 },
    { max: 30050000, rate: 8.5 }, { max: 32400000, rate: 9.0 }, { max: 35400000, rate: 9.5 },
    { max: 39100000, rate: 10.0 }, { max: 43850000, rate: 10.5 }, { max: 47800000, rate: 11.0 },
    { max: 51400000, rate: 11.5 }, { max: 56300000, rate: 12.0 }, { max: 62200000, rate: 12.5 },
    { max: 68600000, rate: 13.0 }, { max: 77500000, rate: 13.5 }, { max: 89000000, rate: 14.0 },
    { max: 103000000, rate: 14.5 }, { max: 125000000, rate: 15.0 }, { max: 157000000, rate: 15.5 },
    { max: 206000000, rate: 16.0 }, { max: 337000000, rate: 17.0 }, { max: 454000000, rate: 18.0 },
    { max: 550000000, rate: 19.0 }, { max: 695000000, rate: 20.0 }, { max: 910000000, rate: 21.0 },
    { max: 1400000000, rate: 22.0 }, { max: Infinity, rate: 34.0 }
  ],
  B: [
    { max: 6200000, rate: 0 }, { max: 6500000, rate: 0.25 }, { max: 6850000, rate: 0.5 },
    { max: 7300000, rate: 0.75 }, { max: 9200000, rate: 1.0 }, { max: 10750000, rate: 1.5 },
    { max: 11250000, rate: 2.0 }, { max: 11600000, rate: 2.5 }, { max: 12600000, rate: 3.0 },
    { max: 13600000, rate: 3.5 }, { max: 14950000, rate: 4.0 }, { max: 16400000, rate: 4.5 },
    { max: 18450000, rate: 5.0 }, { max: 21850000, rate: 5.5 }, { max: 26000000, rate: 6.0 },
    { max: 27700000, rate: 6.5 }, { max: 29350000, rate: 7.0 }, { max: 31450000, rate: 7.5 },
    { max: 33950000, rate: 8.0 }, { max: 37100000, rate: 8.5 }, { max: 41100000, rate: 9.0 },
    { max: 45800000, rate: 9.5 }, { max: 49500000, rate: 10.0 }, { max: 53800000, rate: 10.5 },
    { max: 58500000, rate: 11.0 }, { max: 64000000, rate: 11.5 }, { max: 71000000, rate: 12.0 },
    { max: 80000000, rate: 12.5 }, { max: 93000000, rate: 13.0 }, { max: 109000000, rate: 13.5 },
    { max: 129000000, rate: 14.0 }, { max: 163000000, rate: 14.5 }, { max: 211000000, rate: 15.0 },
    { max: 374000000, rate: 15.5 }, { max: 459000000, rate: 16.0 }, { max: 555000000, rate: 17.0 },
    { max: 704000000, rate: 18.0 }, { max: 957000000, rate: 19.0 }, { max: 1405000000, rate: 20.0 },
    { max: Infinity, rate: 34.0 }
  ],
  C: [
    { max: 6600000, rate: 0 }, { max: 6950000, rate: 0.25 }, { max: 7350000, rate: 0.5 },
    { max: 7800000, rate: 0.75 }, { max: 8850000, rate: 1.0 }, { max: 9800000, rate: 1.25 },
    { max: 10950000, rate: 1.5 }, { max: 11200000, rate: 1.75 }, { max: 12050000, rate: 2.0 },
    { max: 12950000, rate: 3.0 }, { max: 14150000, rate: 3.5 }, { max: 15550000, rate: 4.0 },
    { max: 17050000, rate: 4.5 }, { max: 19500000, rate: 5.0 }, { max: 22700000, rate: 5.5 },
    { max: 26600000, rate: 6.0 }, { max: 28100000, rate: 6.5 }, { max: 30100000, rate: 7.0 },
    { max: 32600000, rate: 7.5 }, { max: 35400000, rate: 8.0 }, { max: 38900000, rate: 8.5 },
    { max: 43000000, rate: 9.0 }, { max: 47400000, rate: 9.5 }, { max: 51200000, rate: 10.0 },
    { max: 55800000, rate: 10.5 }, { max: 60400000, rate: 11.0 }, { max: 66700000, rate: 11.5 },
    { max: 74500000, rate: 12.0 }, { max: 83200000, rate: 12.5 }, { max: 95600000, rate: 13.0 },
    { max: 110000000, rate: 13.5 }, { max: 134000000, rate: 14.0 }, { max: 169000000, rate: 14.5 },
    { max: 221000000, rate: 15.0 }, { max: 390000000, rate: 15.5 }, { max: 463000000, rate: 16.0 },
    { max: 561000000, rate: 17.0 }, { max: 709000000, rate: 18.0 }, { max: 965000000, rate: 19.0 },
    { max: Infinity, rate: 34.0 }
  ]
};

// ===================== PTKP DATABASE =====================
const PTKP_DATABASE = {
  "TK/0": 54000000, "TK/1": 58500000, "TK/2": 63000000, "TK/3": 67500000,
  "K/0": 58500000, "K/1": 63000000, "K/2": 67500000, "K/3": 72000000
};

// ===================== FORMAT UTILITIES =====================
function cleanNumberStr(str) {
  return str.replace(/\./g, '').replace(/[^0-9]/g, '');
}
function parseRupiah(str) {
  if (typeof str !== 'string') str = String(str || '');
  const parsed = parseInt(cleanNumberStr(str), 10);
  return isNaN(parsed) ? 0 : parsed;
}
function formatRupiah(num) {
  return 'Rp ' + Math.round(num).toLocaleString('id-ID').replace(/,/g, '.');
}
function formatRawNumber(val) {
  const clean = val.replace(/\D/g, '');
  if (clean === '') return '';
  return parseInt(clean, 10).toLocaleString('id-ID').replace(/,/g, '.');
}

// Rupiah input formatter
document.querySelectorAll('.rupiah-input').forEach(input => {
  input.addEventListener('input', function () {
    const start = this.selectionStart;
    const oldLength = this.value.length;
    this.value = formatRawNumber(this.value);
    const diff = this.value.length - oldLength;
    this.setSelectionRange(start + diff, start + diff);
  });
});

// ===================== NAVIGATION =====================
// Select semua nav items termasuk settings di header-actions
const menuItems = document.querySelectorAll('[data-tab]');
const tabPanels = document.querySelectorAll('.tab-panel');

menuItems.forEach(item => {
  item.addEventListener('click', (e) => {
    e.preventDefault();
    switchTab(item.getAttribute('data-tab'));
  });
});

function switchTab(tabId) {
  // Update active nav item
  menuItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-tab') === tabId);
  });
  // Show correct panel
  tabPanels.forEach(panel => {
    panel.classList.toggle('active', panel.id === `panel-${tabId}`);
  });
  // Scroll ke atas setiap pindah tab
  document.querySelector('.main-content').scrollTo({ top: 0, behavior: 'smooth' });
  if (tabId === 'kamus') renderKamusTable();
}

// Tampilkan sub-tab regulasi di kamus (dipanggil dari header badge / shortcut)
function showRegulasiTab() {
  // Aktifkan sub-tab regulasi
  document.querySelectorAll('.sub-tab-btn').forEach(b => {
    if (b.getAttribute('data-subtab') === 'kamus-regulasi') b.classList.add('active');
    else if (b.getAttribute('data-subtab') === 'kamus-tabel') b.classList.remove('active');
  });
  document.querySelectorAll('.sub-panel').forEach(p => {
    if (p.id === 'subpanel-kamus-regulasi') p.classList.add('active');
    else if (p.id === 'subpanel-kamus-tabel') p.classList.remove('active');
  });
}

// Sub-tabs Navigation
const subTabBtns = document.querySelectorAll('.sub-tab-btn');
const subPanels = document.querySelectorAll('.sub-panel');

subTabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const targetSub = btn.getAttribute('data-subtab');
    subTabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    subPanels.forEach(p => {
      p.classList.toggle('active', p.id === `subpanel-${targetSub}`);
    });
  });
});

// ===================== SCHEME TOGGLE (GROSS / GROSS UP) =====================
// State tracking for each calculator's active scheme
const schemeState = {};

document.querySelectorAll('.scheme-toggle').forEach(toggle => {
  const btns = toggle.querySelectorAll('.scheme-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.getAttribute('data-target');
      const scheme = btn.getAttribute('data-scheme');
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      schemeState[target] = scheme;
      updateSchemeLabels(target, scheme);
    });
  });
  // Initialize
  const target = btns[0].getAttribute('data-target');
  schemeState[target] = 'gross';
});

function updateSchemeLabels(target, scheme) {
  const isGrossUp = scheme === 'grossup';
  const labelMap = {
    p21t: { el: 'p21t-bruto-label', gross: 'Penghasilan Bruto Bulanan (Rp)', grossup: 'Target Take Home Pay / Neto (Rp)' },
    p21p: { el: 'p21p-bruto-label', gross: 'Uang Pensiun Bulanan Bruto (Rp)', grossup: 'Target Take Home Pay / Neto (Rp)' },
    p21f: { el: 'p21f-bruto-label', gross: 'Jumlah Penghasilan Bruto (Rp)', grossup: 'Target Nilai Bersih / Neto (Rp)' },
    p21tt: { el: 'p21tt-bruto-label', gross: 'Upah / Penghasilan Harian Bruto (Rp)', grossup: 'Target Upah Harian Neto (Rp)' },
    p21th: { el: 'p21th-bruto-label', gross: 'Penghasilan Bruto (Rp)', grossup: 'Target Penghasilan Neto / Take Home Pay (Rp)' },
    p23: { el: 'p23-bruto-label', gross: 'Jumlah Penghasilan Bruto / Nilai Transaksi (Rp)', grossup: 'Target Nilai Bersih Diterima / Neto (Rp)' },
    p42: { el: 'p42-bruto-label', gross: 'Nilai Transaksi Bruto (Rp)', grossup: 'Target Nilai Bersih Diterima / Neto (Rp)' },
    p21nf: { el: 'p21nf-bruto-label', gross: 'Penghasilan Bruto yang Dibayarkan Saat Ini (Rp)', grossup: 'Target Neto / Bersih Transaksi Ini (Rp)' },
    p15: { el: 'p15-bruto-label', gross: 'Peredaran Bruto / Nilai Premi (Rp)', grossup: 'Target Nilai Bersih / Neto (Rp)' },
    p22: { el: 'p22-nilai-label', gross: 'Nilai Impor / Harga Beli / Penjualan (Rp)', grossup: 'Target Nilai Bersih / Neto (Rp)' },
  };
  if (labelMap[target]) {
    const el = document.getElementById(labelMap[target].el);
    if (el) el.textContent = isGrossUp ? labelMap[target].grossup : labelMap[target].gross;
  }
}

// ===================== CORE TAX FUNCTIONS =====================

// TER lookup
function getTERCategory(ptkp) {
  if (['TK/0', 'TK/1', 'K/0'].includes(ptkp)) return 'A';
  if (['TK/2', 'TK/3', 'K/1', 'K/2'].includes(ptkp)) return 'B';
  if (ptkp === 'K/3') return 'C';
  return 'A';
}
function lookupTERRate(category, bruto) {
  const rows = TER_DATABASE[category];
  for (const row of rows) {
    if (bruto <= row.max) return row.rate;
  }
  return 0;
}

// Pasal 17 with DJP rounding (PKP dibulatkan ke bawah ribuan)
function calculateStandardPasal17(pkpRaw) {
  if (pkpRaw <= 0) return 0;
  // PKP dibulatkan ke bawah ke ribuan terdekat (DJP regulation)
  const pkp = Math.floor(pkpRaw / 1000) * 1000;
  const layers = [
    { limit: 60000000, rate: 0.05 },
    { limit: 190000000, rate: 0.15 },
    { limit: 250000000, rate: 0.25 },
    { limit: 4500000000, rate: 0.30 },
    { limit: Infinity, rate: 0.35 }
  ];
  let remaining = pkp;
  let tax = 0;
  for (const layer of layers) {
    if (remaining <= 0) break;
    const basis = Math.min(remaining, layer.limit);
    tax += basis * layer.rate;
    remaining -= basis;
  }
  return tax;
}

// PPh 21 Final: Pesangon (PP 68/2009)
// 0% s/d 50jt, 5% > 50jt s/d 100jt, 15% > 100jt s/d 500jt, 25% > 500jt
function calculatePesangonTax(bruto) {
  const layers = [
    { limit: 50000000, rate: 0.00, text: 'Lapisan 1 (0%) s.d. Rp 50jt' },
    { limit: 50000000, rate: 0.05, text: 'Lapisan 2 (5%) > Rp 50jt s.d. Rp 100jt' },
    { limit: 400000000, rate: 0.15, text: 'Lapisan 3 (15%) > Rp 100jt s.d. Rp 500jt' },
    { limit: Infinity, rate: 0.25, text: 'Lapisan 4 (25%) > Rp 500jt' },
  ];
  return applyLayeredTax(bruto, layers);
}

// PPh 21 Final: Manfaat Pensiun / THT / JHT (PP 68/2009)
// 0% s/d 50jt, 5% > 50jt
function calculateManfaatPensiunTax(bruto) {
  const layers = [
    { limit: 50000000, rate: 0.00, text: 'Lapisan 1 (0%) s.d. Rp 50jt' },
    { limit: Infinity, rate: 0.05, text: 'Lapisan 2 (5%) > Rp 50jt' },
  ];
  return applyLayeredTax(bruto, layers);
}

// PPh 21 Final: Honorarium PNS APBN/APBD (PP 80/2010)
// Golongan I/II = 0%, III = 5%, IV = 15%
function calculateAPBNTax(bruto, golongan) {
  const rateMap = { I_II: 0, III: 0.05, IV: 0.15 };
  const rate = rateMap[golongan] || 0;
  const tax = bruto * rate;
  const golText = { I_II: 'Gol I & II (0%)', III: 'Gol III (5%)', IV: 'Gol IV (15%)' };
  return {
    totalTax: tax,
    breakdown: [{ label: `Tarif Flat ${golText[golongan]}`, basis: bruto, rateText: `${rate * 100}%`, tax }]
  };
}

// Generic layered tax helper
function applyLayeredTax(bruto, layers) {
  let remaining = bruto;
  let totalTax = 0;
  const breakdown = [];
  for (const layer of layers) {
    if (remaining <= 0) break;
    const basis = Math.min(remaining, layer.limit === Infinity ? remaining : layer.limit);
    const tax = basis * layer.rate;
    totalTax += tax;
    breakdown.push({ label: layer.text, basis, rateText: `${layer.rate * 100}%`, tax });
    remaining -= basis;
  }
  return { totalTax, breakdown };
}

// TER-based tax for monthly (for gross-up binary search)
function calcTERTax(bruto, category, hasNpwp) {
  const rate = lookupTERRate(category, bruto);
  let tax = bruto * (rate / 100);
  if (!hasNpwp) tax *= 1.2;
  return tax;
}

// ===================== GROSS UP BINARY SEARCH =====================
// Finds grossAmount such that grossAmount - taxFn(grossAmount) = netTarget
function runGrossUpSearch(netTarget, taxFn, maxIter = 100) {
  let lo = netTarget;
  let hi = netTarget * 3 + 1000000; // generous upper bound
  for (let i = 0; i < maxIter; i++) {
    const mid = (lo + hi) / 2;
    const tax = taxFn(mid);
    const net = mid - tax;
    if (Math.abs(net - netTarget) < 1) return { gross: mid, tax };
    if (net < netTarget) lo = mid;
    else hi = mid;
  }
  const gross = (lo + hi) / 2;
  return { gross, tax: taxFn(gross) };
}

// Gross-up for flat-rate taxes (PPh 23, PPh 4(2))
// Bruto = Neto / (1 - rate/100)
function flatRateGrossUp(neto, rate) {
  if (rate >= 100) return { gross: neto, tax: 0 };
  const gross = neto / (1 - rate / 100);
  const tax = gross * (rate / 100);
  return { gross, tax };
}

// ===================== RESULT DISPLAY HELPERS =====================
function showResult(contentId, placeholderCardId) {
  const card = document.getElementById(placeholderCardId);
  if (card) card.querySelector('.result-placeholder').classList.add('hidden');
  document.getElementById(contentId).classList.remove('hidden');
}
function hideResult(contentId, placeholderCardId) {
  document.getElementById(contentId).classList.add('hidden');
  const card = document.getElementById(placeholderCardId);
  if (card) card.querySelector('.result-placeholder').classList.remove('hidden');
}
function renderBreakdown(containerId, breakdown) {
  const div = document.getElementById(containerId);
  div.innerHTML = '';
  breakdown.forEach(row => {
    if (row.basis > 0 || row.tax > 0) {
      const bRow = document.createElement('div');
      bRow.className = 'breakdown-row';
      bRow.innerHTML = `
        <span class="layer-name">${row.label}</span>
        <span class="layer-math">${row.rateText} × ${formatRupiah(row.basis)}</span>
        <span class="layer-val">${formatRupiah(row.tax)}</span>
      `;
      div.appendChild(bRow);
    }
  });
}

// ===================== PPh 21 BULANAN TETAP =====================
document.getElementById('p21t-btn-hitung').addEventListener('click', () => {
  const ptkp = document.getElementById('p21t-ptkp').value;
  const inputVal = parseRupiah(document.getElementById('p21t-bruto').value);
  const hasNpwp = document.querySelector('input[name="p21t-npwp"]:checked').value === 'ya';
  const scheme = schemeState['p21t'] || 'gross';

  if (inputVal <= 0) { alert('Silakan masukkan nilai penghasilan!'); return; }

  const category = getTERCategory(ptkp);
  let bruto, pphTotal, gross = null;

  if (scheme === 'grossup') {
    // Binary search: find bruto such that bruto - TER_tax(bruto) = inputVal
    const result = runGrossUpSearch(inputVal, (g) => calcTERTax(g, category, hasNpwp));
    gross = result.gross;
    bruto = inputVal; // shown as neto
    pphTotal = result.tax;
  } else {
    bruto = inputVal;
    pphTotal = calcTERTax(bruto, category, hasNpwp);
  }

  const rate = lookupTERRate(category, scheme === 'grossup' ? gross : bruto);

  document.getElementById('p21t-res-title').textContent =
    scheme === 'grossup' ? 'Hasil Gross Up PPh 21 Bulanan (Masa)' : 'Hasil Perhitungan Bulanan (Masa)';
  document.getElementById('p21t-res-total').textContent = formatRupiah(pphTotal);
  document.getElementById('p21t-res-bruto').textContent = formatRupiah(bruto);
  document.getElementById('p21t-res-input-label').textContent = scheme === 'grossup' ? 'Take Home Pay (Neto Target)' : 'Penghasilan Bruto';
  document.getElementById('p21t-res-ptkp').textContent = ptkp;
  document.getElementById('p21t-res-kategori').textContent = `Kategori ${category}`;
  document.getElementById('p21t-res-tarif').textContent = `${rate}%`;

  const grossRow = document.getElementById('p21t-res-gross-row');
  const netRow = document.getElementById('p21t-res-net-row');
  if (scheme === 'grossup' && gross !== null) {
    grossRow.style.display = 'flex';
    document.getElementById('p21t-res-gross').textContent = formatRupiah(gross);
    netRow.style.display = 'flex';
    document.getElementById('p21t-res-net').textContent = formatRupiah(bruto);
  } else {
    grossRow.style.display = 'none';
    netRow.style.display = 'none';
  }

  const penaltyRow = document.getElementById('p21t-res-npwp-penalty-row');
  penaltyRow.style.display = (!hasNpwp && pphTotal > 0) ? 'flex' : 'none';

  showResult('p21t-result-content', 'p21t-result-card');
});

document.getElementById('p21t-btn-reset').addEventListener('click', () => {
  document.getElementById('p21t-bruto').value = '';
  hideResult('p21t-result-content', 'p21t-result-card');
});

// ===================== PPh 21 BULANAN PENSIUN =====================
document.getElementById('p21p-btn-hitung').addEventListener('click', () => {
  const ptkp = document.getElementById('p21p-ptkp').value;
  const inputVal = parseRupiah(document.getElementById('p21p-bruto').value);
  const hasNpwp = document.querySelector('input[name="p21p-npwp"]:checked').value === 'ya';
  const scheme = schemeState['p21p'] || 'gross';

  if (inputVal <= 0) { alert('Silakan masukkan nilai uang pensiun!'); return; }

  const category = getTERCategory(ptkp);
  let bruto, pphTotal, gross = null;

  if (scheme === 'grossup') {
    const result = runGrossUpSearch(inputVal, (g) => calcTERTax(g, category, hasNpwp));
    gross = result.gross;
    bruto = inputVal;
    pphTotal = result.tax;
  } else {
    bruto = inputVal;
    pphTotal = calcTERTax(bruto, category, hasNpwp);
  }

  const rate = lookupTERRate(category, scheme === 'grossup' ? gross : bruto);

  document.getElementById('p21p-res-title').textContent =
    scheme === 'grossup' ? 'Hasil Gross Up PPh 21 Pensiun Berkala' : 'Hasil Perhitungan Pensiun Berkala';
  document.getElementById('p21p-res-total').textContent = formatRupiah(pphTotal);
  document.getElementById('p21p-res-bruto').textContent = formatRupiah(bruto);
  document.getElementById('p21p-res-input-label').textContent = scheme === 'grossup' ? 'Take Home Pay (Neto Target)' : 'Uang Pensiun Bruto';
  document.getElementById('p21p-res-ptkp').textContent = ptkp;
  document.getElementById('p21p-res-kategori').textContent = `Kategori ${category}`;
  document.getElementById('p21p-res-tarif').textContent = `${rate}%`;

  const grossRow = document.getElementById('p21p-res-gross-row');
  const netRow = document.getElementById('p21p-res-net-row');
  if (scheme === 'grossup' && gross !== null) {
    grossRow.style.display = 'flex';
    document.getElementById('p21p-res-gross').textContent = formatRupiah(gross);
    netRow.style.display = 'flex';
    document.getElementById('p21p-res-net').textContent = formatRupiah(bruto);
  } else {
    grossRow.style.display = 'none';
    netRow.style.display = 'none';
  }

  const penaltyRow = document.getElementById('p21p-res-npwp-penalty-row');
  penaltyRow.style.display = (!hasNpwp && pphTotal > 0) ? 'flex' : 'none';

  showResult('p21p-result-content', 'p21p-result-card');
});

document.getElementById('p21p-btn-reset').addEventListener('click', () => {
  document.getElementById('p21p-bruto').value = '';
  hideResult('p21p-result-content', 'p21p-result-card');
});

// ===================== PPh 21 FINAL =====================
// Show/hide Golongan dropdown based on jenis
document.getElementById('p21f-jenis').addEventListener('change', function () {
  const golGroup = document.getElementById('p21f-golongan-group');
  golGroup.style.display = this.value === 'apbn_apbd' ? 'block' : 'none';
});

document.getElementById('p21f-btn-hitung').addEventListener('click', () => {
  const jenis = document.getElementById('p21f-jenis').value;
  const inputVal = parseRupiah(document.getElementById('p21f-bruto').value);
  const golongan = document.getElementById('p21f-golongan').value;
  const scheme = schemeState['p21f'] || 'gross';

  if (inputVal <= 0) { alert('Silakan masukkan nilai penghasilan final!'); return; }

  const titleMap = {
    pesangon: 'Hasil PPh 21 Final Uang Pesangon',
    manfaat_pensiun: 'Hasil PPh 21 Final Uang Manfaat Pensiun/THT/JHT',
    apbn_apbd: 'Hasil PPh 21 Final Honor PNS/TNI/Polri (APBN/APBD)'
  };

  // Define tax function based on jenis
  const taxFn = (grossAmt) => {
    if (jenis === 'pesangon') return calculatePesangonTax(grossAmt).totalTax;
    if (jenis === 'manfaat_pensiun') return calculateManfaatPensiunTax(grossAmt).totalTax;
    if (jenis === 'apbn_apbd') return calculateAPBNTax(grossAmt, golongan).totalTax;
    return 0;
  };

  let bruto, totalTax, breakdown, grossUpBruto = null;

  if (scheme === 'grossup') {
    const result = runGrossUpSearch(inputVal, taxFn);
    grossUpBruto = result.gross;
    totalTax = result.tax;
    bruto = grossUpBruto;
  } else {
    bruto = inputVal;
  }

  // Recalculate breakdown with the resolved bruto
  let calcResult;
  if (jenis === 'pesangon') calcResult = calculatePesangonTax(bruto);
  else if (jenis === 'manfaat_pensiun') calcResult = calculateManfaatPensiunTax(bruto);
  else calcResult = calculateAPBNTax(bruto, golongan);

  totalTax = calcResult.totalTax;
  breakdown = calcResult.breakdown;

  const effRate = bruto > 0 ? (totalTax / bruto) * 100 : 0;

  document.getElementById('p21f-res-title').textContent =
    (scheme === 'grossup' ? '[Gross Up] ' : '') + titleMap[jenis];
  document.getElementById('p21f-res-total').textContent = formatRupiah(totalTax);
  document.getElementById('p21f-res-efektif-rate').textContent = `${effRate.toFixed(2)}%`;
  renderBreakdown('p21f-res-breakdown', breakdown);

  const grossUpDetail = document.getElementById('p21f-res-grossup-detail');
  if (scheme === 'grossup' && grossUpBruto !== null) {
    grossUpDetail.style.display = 'block';
    document.getElementById('p21f-res-neto-input').textContent = formatRupiah(inputVal);
    document.getElementById('p21f-res-gross').textContent = formatRupiah(grossUpBruto);
  } else {
    grossUpDetail.style.display = 'none';
  }

  showResult('p21f-result-content', 'p21f-result-card');
});

document.getElementById('p21f-btn-reset').addEventListener('click', () => {
  document.getElementById('p21f-bruto').value = '';
  hideResult('p21f-result-content', 'p21f-result-card');
});

// ===================== PPh 21 HARIAN / TIDAK TETAP =====================
function calculateHarianTax(harianBruto, hasNpwp) {
  const npwpMult = hasNpwp ? 1.0 : 1.2;
  if (harianBruto <= 450000) {
    return { pphHarian: 0, metode: 'Bebas Pajak (≤ Rp 450.000/hari)', tarifText: '0%' };
  } else if (harianBruto <= 2500000) {
    return {
      pphHarian: harianBruto * 0.005 * npwpMult,
      metode: 'Tarif Flat 0,5% (> Rp 450.000 s/d Rp 2.500.000/hari)',
      tarifText: '0.5%'
    };
  } else {
    const ptkpHarian = 150000;
    const pkpHarian = Math.max(0, harianBruto - ptkpHarian);
    const pkpAnnual = pkpHarian * 360;
    const taxAnnual = calculateStandardPasal17(pkpAnnual);
    return {
      pphHarian: (taxAnnual / 360) * npwpMult,
      metode: 'Tarif Progresif Pasal 17 atas PKP Harian (Upah − Rp 150.000)',
      tarifText: 'Progresif Pasal 17'
    };
  }
}

document.getElementById('p21tt-btn-hitung').addEventListener('click', () => {
  const inputVal = parseRupiah(document.getElementById('p21tt-bruto').value);
  const hariInput = document.getElementById('p21tt-hari').value;
  const hari = hariInput ? parseInt(hariInput, 10) : 1;
  const hasNpwp = document.querySelector('input[name="p21tt-npwp"]:checked').value === 'ya';
  const scheme = schemeState['p21tt'] || 'gross';

  if (inputVal <= 0) { alert('Silakan masukkan nilai upah harian!'); return; }

  let bruto, pphHarian, metode, tarifText, grossUpBruto = null;

  if (scheme === 'grossup') {
    // Find gross daily such that gross - tax(gross) = inputVal
    const result = runGrossUpSearch(inputVal, (g) => {
      const { pphHarian: t } = calculateHarianTax(g, hasNpwp);
      return t;
    });
    grossUpBruto = result.gross;
    bruto = inputVal;
    const calc = calculateHarianTax(grossUpBruto, hasNpwp);
    pphHarian = calc.pphHarian;
    metode = calc.metode;
    tarifText = calc.tarifText;
  } else {
    bruto = inputVal;
    ({ pphHarian, metode, tarifText } = calculateHarianTax(bruto, hasNpwp));
  }

  const pphBulanan = pphHarian * hari;

  document.getElementById('p21tt-res-title').textContent =
    scheme === 'grossup' ? 'Hasil Gross Up PPh 21 Harian' : 'Hasil Perhitungan Pegawai Tidak Tetap';
  document.getElementById('p21tt-res-total').textContent = formatRupiah(pphHarian);
  document.getElementById('p21tt-res-bruto').textContent = formatRupiah(bruto);
  document.getElementById('p21tt-res-input-label').textContent = scheme === 'grossup' ? 'Target Upah Neto (Per Hari)' : 'Upah Harian Bruto';
  document.getElementById('p21tt-res-metode').textContent = metode;
  document.getElementById('p21tt-res-tarif').textContent = tarifText;
  document.getElementById('p21tt-res-hari-count').textContent = hari;
  document.getElementById('p21tt-res-total-bulanan').textContent = formatRupiah(pphBulanan);

  const grossRow = document.getElementById('p21tt-res-gross-row');
  if (scheme === 'grossup' && grossUpBruto !== null) {
    grossRow.style.display = 'flex';
    document.getElementById('p21tt-res-gross').textContent = formatRupiah(grossUpBruto);
  } else {
    grossRow.style.display = 'none';
  }

  const penaltyRow = document.getElementById('p21tt-res-npwp-penalty-row');
  penaltyRow.style.display = (!hasNpwp && pphHarian > 0) ? 'flex' : 'none';

  showResult('p21tt-result-content', 'p21tt-result-card');
});

document.getElementById('p21tt-btn-reset').addEventListener('click', () => {
  document.getElementById('p21tt-bruto').value = '';
  document.getElementById('p21tt-hari').value = '';
  hideResult('p21tt-result-content', 'p21tt-result-card');
});

// ===================== PPh 21 TAHUNAN (SPT A1/A2) =====================
document.getElementById('p21th-auto-jabatan').addEventListener('change', function () {
  document.getElementById('p21th-jabatan-manual-group').style.display = this.checked ? 'none' : 'block';
});

document.getElementById('p21th-btn-hitung').addEventListener('click', () => {
  const ptkpKey = document.getElementById('p21th-ptkp').value;
  const skema = document.querySelector('input[name="p21th-skema"]:checked').value;
  const mStart = parseInt(document.getElementById('p21th-masa-awal').value, 10);
  const mEnd = parseInt(document.getElementById('p21th-masa-akhir').value, 10);
  const inputVal = parseRupiah(document.getElementById('p21th-bruto').value);
  const autoJabatan = document.getElementById('p21th-auto-jabatan').checked;
  const iuranPensiun = parseRupiah(document.getElementById('p21th-pensiun').value);
  const hasNpwp = document.querySelector('input[name="p21th-npwp"]:checked').value === 'ya';
  const scheme = schemeState['p21th'] || 'gross';

  if (mEnd < mStart) { alert('Masa Penghasilan Akhir tidak boleh kurang dari Masa Penghasilan Awal!'); return; }
  if (inputVal <= 0) { alert('Silakan masukkan nilai penghasilan!'); return; }

  const nMonths = mEnd - mStart + 1;
  const ptkp = PTKP_DATABASE[ptkpKey];

  // Core tax calculation function (accepts bruto, returns { pphTerutangRill, pkp, ... })
  function calcTahunan(brutoVal) {
    let biayaJabatan = 0;
    if (autoJabatan) {
      biayaJabatan = Math.min(brutoVal * 0.05, 500000 * nMonths);
    } else {
      biayaJabatan = parseRupiah(document.getElementById('p21th-jabatan').value);
    }
    const netoMasa = Math.max(0, brutoVal - biayaJabatan - iuranPensiun);
    let pkp = 0, pphTerutangRill = 0, pphSetahunSimulasi = 0;
    if (skema === 'setahun') {
      pkp = Math.max(0, netoMasa - ptkp);
      pphTerutangRill = calculateStandardPasal17(pkp);
    } else {
      const netoDisetahunkan = (netoMasa / nMonths) * 12;
      pkp = Math.max(0, netoDisetahunkan - ptkp);
      pphSetahunSimulasi = calculateStandardPasal17(pkp);
      pphTerutangRill = (pphSetahunSimulasi / 12) * nMonths;
    }
    if (!hasNpwp) {
      pphTerutangRill *= 1.2;
      pphSetahunSimulasi *= 1.2;
    }
    return { pphTerutangRill, pphSetahunSimulasi, pkp, biayaJabatan, netoMasa: Math.max(0, brutoVal - biayaJabatan - iuranPensiun) };
  }

  let displayBruto, grossUpBruto = null;
  let result;

  if (scheme === 'grossup') {
    // Find bruto such that bruto - pph(bruto) = inputVal (neto target)
    const gu = runGrossUpSearch(inputVal, (g) => calcTahunan(g).pphTerutangRill);
    grossUpBruto = gu.gross;
    displayBruto = grossUpBruto;
    result = calcTahunan(grossUpBruto);
  } else {
    displayBruto = inputVal;
    result = calcTahunan(inputVal);
  }

  const { pphTerutangRill, pphSetahunSimulasi, pkp, biayaJabatan, netoMasa } = result;

  // Build Pasal 17 visual breakdown
  const breakdownDiv = document.getElementById('p21th-res-breakdown');
  breakdownDiv.innerHTML = '';
  const layers = [
    { limit: 60000000, rate: 0.05, text: 'Lapisan 5% (s.d. Rp 60jt)' },
    { limit: 190000000, rate: 0.15, text: 'Lapisan 15% (> Rp 60jt s.d. Rp 250jt)' },
    { limit: 250000000, rate: 0.25, text: 'Lapisan 25% (> Rp 250jt s.d. Rp 500jt)' },
    { limit: 4500000000, rate: 0.30, text: 'Lapisan 30% (> Rp 500jt s.d. Rp 5M)' },
    { limit: Infinity, rate: 0.35, text: 'Lapisan 35% (> Rp 5M)' }
  ];
  // Use rounded PKP for display
  const pkpRounded = Math.floor(pkp / 1000) * 1000;
  let remainingPKP = pkpRounded;
  layers.forEach(layer => {
    if (remainingPKP > 0) {
      const basis = Math.min(remainingPKP, layer.limit);
      let taxValue = basis * layer.rate;
      if (!hasNpwp) taxValue *= 1.2;
      const bRow = document.createElement('div');
      bRow.className = 'breakdown-row';
      bRow.innerHTML = `
        <span class="layer-name">${layer.text}</span>
        <span class="layer-math">${(layer.rate * 100).toFixed(0)}% × ${formatRupiah(basis)}${!hasNpwp ? ' × 1.2' : ''}</span>
        <span class="layer-val">${formatRupiah(taxValue)}</span>
      `;
      breakdownDiv.appendChild(bRow);
      remainingPKP -= basis;
    }
  });

  document.getElementById('p21th-res-title').textContent =
    scheme === 'grossup' ? 'Hasil Gross Up PPh 21 Tahunan (SPT A1/A2)' : 'Hasil Perhitungan Tahunan (SPT A1/A2)';
  document.getElementById('p21th-res-total').textContent = formatRupiah(pphTerutangRill);
  document.getElementById('p21th-res-bruto-label').textContent =
    scheme === 'grossup' ? 'Penghasilan Bruto (Gross Up)' : 'Penghasilan Bruto Masa Kerja';

  // Gross up supplementary row
  const grossupRow = document.getElementById('p21th-res-grossup-row');
  if (scheme === 'grossup' && grossUpBruto !== null) {
    grossupRow.style.display = 'flex';
    document.getElementById('p21th-res-neto-target').textContent = formatRupiah(inputVal);
  } else {
    grossupRow.style.display = 'none';
  }

  document.getElementById('p21th-res-bruto').textContent = formatRupiah(displayBruto);
  document.getElementById('p21th-res-bulan').textContent = `${nMonths} bulan`;
  document.getElementById('p21th-res-jabatan').textContent = `-${formatRupiah(biayaJabatan)}`;
  document.getElementById('p21th-res-pensiun').textContent = `-${formatRupiah(iuranPensiun)}`;
  document.getElementById('p21th-res-neto').textContent = formatRupiah(netoMasa);
  document.getElementById('p21th-res-ptkp-status').textContent = ptkpKey;
  document.getElementById('p21th-res-ptkp-val').textContent = `-${formatRupiah(ptkp)}`;
  document.getElementById('p21th-res-pkp').textContent = formatRupiah(pkpRounded);

  const disetahunkanBox = document.getElementById('p21th-res-disetahunkan-summary-box');
  const rowNetoSetahun = document.getElementById('p21th-res-row-neto-setahun');
  if (skema === 'disetahunkan') {
    disetahunkanBox.style.display = 'flex';
    document.getElementById('p21th-res-total-setahun-simulasi').textContent = formatRupiah(pphSetahunSimulasi);
    rowNetoSetahun.style.display = 'flex';
    const netoDisetahunkan = (netoMasa / nMonths) * 12;
    document.getElementById('p21th-res-neto-setahun').textContent = formatRupiah(netoDisetahunkan);
  } else {
    disetahunkanBox.style.display = 'none';
    rowNetoSetahun.style.display = 'none';
  }

  showResult('p21th-result-content', 'p21th-result-card');
});

document.getElementById('p21th-btn-reset').addEventListener('click', () => {
  document.getElementById('p21th-bruto').value = '';
  document.getElementById('p21th-pensiun').value = '';
  document.getElementById('p21th-jabatan').value = '';
  hideResult('p21th-result-content', 'p21th-result-card');
});

// ===================== PPh 23 =====================
document.getElementById('p23-btn-hitung').addEventListener('click', () => {
  const option = document.getElementById('p23-objek').options[document.getElementById('p23-objek').selectedIndex];
  const inputVal = parseRupiah(document.getElementById('p23-bruto').value);
  const hasNpwp = document.querySelector('input[name="p23-npwp"]:checked').value === 'ya';
  const scheme = schemeState['p23'] || 'gross';

  if (inputVal <= 0) { alert('Silakan masukkan nilai bruto transaksi!'); return; }

  const rateDasar = parseFloat(option.getAttribute('data-tarif'));
  const multiplier = hasNpwp ? 1.0 : 2.0;
  const rateTerapan = rateDasar * multiplier;

  let bruto, pph23, netto, grossUpBruto = null;

  if (scheme === 'grossup') {
    const result = flatRateGrossUp(inputVal, rateTerapan);
    grossUpBruto = result.gross;
    pph23 = result.tax;
    bruto = inputVal; // neto target
    netto = inputVal;
  } else {
    bruto = inputVal;
    pph23 = bruto * (rateTerapan / 100);
    netto = bruto - pph23;
  }

  document.getElementById('p23-res-title').textContent =
    scheme === 'grossup' ? 'Hasil Gross Up PPh Pasal 23' : 'Hasil Perhitungan PPh Pasal 23';
  document.getElementById('p23-res-total').textContent = formatRupiah(pph23);
  document.getElementById('p23-res-netto').textContent = formatRupiah(netto);
  document.getElementById('p23-res-bruto').textContent = formatRupiah(bruto);
  document.getElementById('p23-res-input-label').textContent = scheme === 'grossup' ? 'Neto Target (Input)' : 'Nilai Transaksi Bruto';
  document.getElementById('p23-res-jenis').textContent = option.textContent.split('(')[0].trim();
  document.getElementById('p23-res-tarif-dasar').textContent = `${rateDasar}%`;
  document.getElementById('p23-res-tarif-terapan').textContent = `${rateTerapan}%`;

  const grossRow = document.getElementById('p23-res-gross-row');
  if (scheme === 'grossup' && grossUpBruto !== null) {
    grossRow.style.display = 'flex';
    document.getElementById('p23-res-gross').textContent = formatRupiah(grossUpBruto);
  } else {
    grossRow.style.display = 'none';
  }

  document.getElementById('p23-res-npwp-penalty-row').style.display = !hasNpwp ? 'flex' : 'none';
  showResult('p23-result-content', 'p23-result-card');
});

document.getElementById('p23-btn-reset').addEventListener('click', () => {
  document.getElementById('p23-bruto').value = '';
  hideResult('p23-result-content', 'p23-result-card');
});

// ===================== PPh 4(2) =====================
document.getElementById('p42-btn-hitung').addEventListener('click', () => {
  const option = document.getElementById('p42-objek').options[document.getElementById('p42-objek').selectedIndex];
  const inputVal = parseRupiah(document.getElementById('p42-bruto').value);
  const scheme = schemeState['p42'] || 'gross';

  if (inputVal <= 0) { alert('Silakan masukkan nilai transaksi!'); return; }

  const rate = parseFloat(option.getAttribute('data-tarif'));
  let bruto, pph42, netto, grossUpBruto = null;

  if (scheme === 'grossup') {
    const result = flatRateGrossUp(inputVal, rate);
    grossUpBruto = result.gross;
    pph42 = result.tax;
    bruto = inputVal;
    netto = inputVal;
  } else {
    bruto = inputVal;
    pph42 = bruto * (rate / 100);
    netto = bruto - pph42;
  }

  document.getElementById('p42-res-title').textContent =
    scheme === 'grossup' ? 'Hasil Gross Up PPh Pasal 4 (2) Final' : 'Hasil Perhitungan PPh Pasal 4 (2) Final';
  document.getElementById('p42-res-total').textContent = formatRupiah(pph42);
  document.getElementById('p42-res-netto').textContent = formatRupiah(netto);
  document.getElementById('p42-res-bruto').textContent = formatRupiah(bruto);
  document.getElementById('p42-res-input-label').textContent = scheme === 'grossup' ? 'Neto Target (Input)' : 'Nilai Transaksi Bruto';
  document.getElementById('p42-res-jenis').textContent = option.textContent.split('-')[0].trim().split('(')[0].trim();
  document.getElementById('p42-res-tarif').textContent = `${rate}%`;

  const grossRow = document.getElementById('p42-res-gross-row');
  if (scheme === 'grossup' && grossUpBruto !== null) {
    grossRow.style.display = 'flex';
    document.getElementById('p42-res-gross').textContent = formatRupiah(grossUpBruto);
  } else {
    grossRow.style.display = 'none';
  }

  showResult('p42-result-content', 'p42-result-card');
});

document.getElementById('p42-btn-reset').addEventListener('click', () => {
  document.getElementById('p42-bruto').value = '';
  hideResult('p42-result-content', 'p42-result-card');
});

// ===================== PPh 21 TIDAK FINAL (BUKAN PEGAWAI / NON-FINAL) =====================

// Database Kode Objek Pajak Tidak Final
const P21NF_DATABASE = {
  '21-100-01': { label: 'Tenaga Ahli Profesional',          dppType: '50persen_bruto', regulasi: 'PMK 252/PMK.03/2008 Pasal 3 ayat (2)' },
  '21-100-02': { label: 'Seniman / Olahragawan / Pembawa Acara', dppType: '50persen_bruto', regulasi: 'PMK 252/PMK.03/2008 Pasal 3 ayat (2)' },
  '21-100-03': { label: 'Pegawai Tidak Tetap (Per Proyek)',  dppType: '50persen_bruto', regulasi: 'PMK 252/PMK.03/2008 Pasal 3 ayat (2)' },
  '21-100-04': { label: 'Distributor MLM',                   dppType: '50persen_bruto', regulasi: 'PMK 252/PMK.03/2008 Pasal 3 ayat (2)' },
  '21-100-05': { label: 'Agen Asuransi',                     dppType: '50persen_bruto', regulasi: 'PMK 252/PMK.03/2008 Pasal 3 ayat (2)' },
  '21-100-06': { label: 'Penjaja Barang Dagangan',           dppType: '50persen_bruto', regulasi: 'PMK 252/PMK.03/2008 Pasal 3 ayat (2)' },
  '21-100-07': { label: 'Tenaga Ahli Mandiri / Freelancer',  dppType: '50persen_bruto', regulasi: 'PMK 252/PMK.03/2008 Pasal 3 ayat (2)' },
  '21-100-08': { label: 'Seniman / Artis Perorangan',        dppType: '50persen_bruto', regulasi: 'PMK 252/PMK.03/2008 Pasal 3 ayat (2)' },
  '21-401':    { label: 'Dewan Komisaris / Dewan Pengawas',  dppType: 'pasal17_penuh',  regulasi: 'PMK 252/PMK.03/2008 Pasal 9' },
  '21-402':    { label: 'Mantan Pegawai (Tantiem/Bonus)',     dppType: 'pasal17_penuh',  regulasi: 'PMK 252/PMK.03/2008 Pasal 9 ayat (1) huruf b' },
  '21-402-pensiun': { label: 'Penarikan Dana Pensiun (Peserta Aktif)', dppType: 'pasal17_penuh', regulasi: 'PMK 252/PMK.03/2008 Pasal 9 ayat (1) huruf c' },
  '21-100-pk': { label: 'Peserta Kegiatan',                  dppType: 'pasal17_penuh',  regulasi: 'PMK 252/PMK.03/2008 Pasal 10' },
  '21-499':    { label: 'Penghasilan Tidak Final Lainnya',   dppType: 'pasal17_penuh',  regulasi: 'PMK 252/PMK.03/2008' },
};

// Update info box saat KOP berubah
document.getElementById('p21nf-kop').addEventListener('change', function () {
  const opt = this.options[this.selectedIndex];
  const desc = opt.getAttribute('data-desc') || '';
  document.getElementById('p21nf-info-text').innerHTML = desc;

  // Tampilkan/sembunyikan field kumulatif
  const kop = P21NF_DATABASE[this.value];
  const showKumulatif = kop && kop.dppType === '50persen_bruto';
  document.getElementById('p21nf-kumulatif-group').style.display = showKumulatif ? 'block' : 'none';
});

// Hitung PPh 21 Tidak Final
document.getElementById('p21nf-btn-hitung').addEventListener('click', () => {
  const kopKey   = document.getElementById('p21nf-kop').value;
  const inputVal = parseRupiah(document.getElementById('p21nf-bruto').value);
  const kumulatifSebelum = parseRupiah(document.getElementById('p21nf-kumulatif').value);
  const hasNpwp  = document.querySelector('input[name="p21nf-npwp"]:checked').value === 'ya';
  const scheme   = schemeState['p21nf'] || 'gross';

  if (inputVal <= 0) { alert('Masukkan nilai bruto penghasilan!'); return; }

  const obj = P21NF_DATABASE[kopKey];
  if (!obj) return;

  const npwpMult = hasNpwp ? 1 : 1.2;
  const taxFn = (brutoAmt) => {
    if (obj.dppType === '50persen_bruto') {
      const dppBefore = kumulatifSebelum * 0.5;
      const dppAfter  = (kumulatifSebelum + brutoAmt) * 0.5;
      return (calculateStandardPasal17(dppAfter) - calculateStandardPasal17(dppBefore)) * npwpMult;
    } else {
      return calculateStandardPasal17(brutoAmt) * npwpMult;
    }
  };

  let bruto, pphSekarang, grossUpBruto = null;
  if (scheme === 'grossup') {
    const result = runGrossUpSearch(inputVal, taxFn);
    grossUpBruto = result.gross;
    bruto = grossUpBruto;
    pphSekarang = result.tax;
  } else {
    bruto = inputVal;
    pphSekarang = taxFn(bruto);
  }

  let dpp = 0;
  let dppLabel = '';
  let showKumulatif = false;
  let kumDPP = 0;

  if (obj.dppType === '50persen_bruto') {
    const brutoAfter  = kumulatifSebelum + bruto;
    const dppBefore   = kumulatifSebelum * 0.5;
    const dppAfter    = brutoAfter * 0.5;
    
    dpp      = dppAfter - dppBefore;
    kumDPP   = dppAfter;
    dppLabel = `50% × Bruto (kumulatif Rp ${Math.round(brutoAfter).toLocaleString('id-ID')})`;
    showKumulatif = true;
  } else {
    dpp = bruto;
    dppLabel = '100% × Bruto';
  }

  // Breakdown Pasal 17 atas DPP transaksi ini (untuk visual)
  const breakdownDiv = document.getElementById('p21nf-res-breakdown');
  breakdownDiv.innerHTML = '';

  const layers = [
    { limit: 60000000,   rate: 0.05, text: 'Lapisan 5% (s.d. Rp 60 jt)' },
    { limit: 190000000,  rate: 0.15, text: 'Lapisan 15% (> Rp 60 jt s.d. Rp 250 jt)' },
    { limit: 250000000,  rate: 0.25, text: 'Lapisan 25% (> Rp 250 jt s.d. Rp 500 jt)' },
    { limit: 4500000000, rate: 0.30, text: 'Lapisan 30% (> Rp 500 jt s.d. Rp 5 M)' },
    { limit: Infinity,   rate: 0.35, text: 'Lapisan 35% (> Rp 5 M)' },
  ];

  // Untuk 50% kumulatif: hitung breakdown atas dppAfter dikurangi dppBefore
  const dppBase = obj.dppType === '50persen_bruto'
    ? kumulatifSebelum * 0.5
    : 0;
  const dppTarget = obj.dppType === '50persen_bruto'
    ? (kumulatifSebelum + bruto) * 0.5
    : dpp;

  let remainLo = dppBase;
  let remainHi = dppTarget;
  let layerPos  = 0;
  let cumLimit  = 0;

  layers.forEach(layer => {
    const layerStart = cumLimit;
    const layerEnd   = cumLimit + (layer.limit === Infinity ? remainHi : layer.limit);

    const lo = Math.max(remainLo, layerStart);
    const hi = Math.min(remainHi, layerEnd);
    if (hi > lo) {
      const basis    = hi - lo;
      let taxValue = basis * layer.rate * npwpMult;
      const el = document.createElement('div');
      el.className = 'breakdown-row';
      el.innerHTML = `
        <span class="layer-name">${layer.text}</span>
        <span class="layer-math">${(layer.rate * 100).toFixed(0)}% × ${formatRupiah(basis)}${!hasNpwp ? ' × 1.2' : ''}</span>
        <span class="layer-val">${formatRupiah(taxValue)}</span>
      `;
      breakdownDiv.appendChild(el);
    }
    cumLimit += layer.limit === Infinity ? 0 : layer.limit;
  });

  // Tampilkan hasil
  document.getElementById('p21nf-res-title').textContent = (scheme === 'grossup' ? '[Gross Up] ' : '') + `PPh 21 Tidak Final — ${obj.label}`;
  document.getElementById('p21nf-res-badge').textContent = kopKey;

  document.getElementById('p21nf-res-total').textContent = formatRupiah(pphSekarang);
  document.getElementById('p21nf-res-kop').textContent   = `${kopKey} · ${obj.label}`;
  document.getElementById('p21nf-res-bruto').textContent = formatRupiah(bruto);
  document.getElementById('p21nf-res-input-label').textContent = scheme === 'grossup' ? 'Neto Target (Input)' : 'Bruto Transaksi Ini';

  const grossRow = document.getElementById('p21nf-res-gross-row');
  if (scheme === 'grossup' && grossUpBruto !== null) {
    grossRow.style.display = 'flex';
    document.getElementById('p21nf-res-gross').textContent = formatRupiah(grossUpBruto);
  } else {
    grossRow.style.display = 'none';
  }

  const kumRow = document.getElementById('p21nf-res-kumulatif-row');
  const kumDppRow = document.getElementById('p21nf-res-kum-dpp-row');
  if (showKumulatif) {
    kumRow.style.display = 'flex';
    document.getElementById('p21nf-res-kumulatif').textContent = formatRupiah(kumulatifSebelum);
    kumDppRow.style.display = 'flex';
    document.getElementById('p21nf-res-kum-dpp').textContent = formatRupiah(kumDPP);
  } else {
    kumRow.style.display = 'none';
    kumDppRow.style.display = 'none';
  }

  document.getElementById('p21nf-res-dpp-label').textContent = dppLabel;
  document.getElementById('p21nf-res-dpp').textContent = formatRupiah(dpp);

  document.getElementById('p21nf-res-npwp-row').style.display = !hasNpwp ? 'flex' : 'none';

  document.getElementById('p21nf-res-note').innerHTML =
    `<i class="fa-solid fa-circle-info"></i> <strong>Sifat: Tidak Final.</strong> Penghasilan ini wajib dilaporkan penerima dalam SPT Tahunan PPh OP. PPh yang dipotong dapat dikreditkan. Dasar hukum: <strong>${obj.regulasi}</strong> jo PMK 168/2023.`;

  showResult('p21nf-result-content', 'p21nf-result-card');
});

document.getElementById('p21nf-btn-reset').addEventListener('click', () => {
  document.getElementById('p21nf-bruto').value = '';
  document.getElementById('p21nf-kumulatif').value = '';
  hideResult('p21nf-result-content', 'p21nf-result-card');
});

// Trigger KOP change on load for initial state
document.getElementById('p21nf-kop').dispatchEvent(new Event('change'));

// ===================== PPh 21 TIDAK FINAL — end =====================

// ===================== PPN CALCULATION =====================

// Database objek PPN — tarif efektif, jenis, regulasi
const PPN_DATABASE = {
  tarif_12:               { tarifPPN: 12,   tarifEfektif: 12,   jenis: 'normal',    label: 'Tarif Umum 12%',             regulasi: 'UU HPP No.7/2021 Pasal 7 · PMK 131/2024 · berlaku 1 Januari 2025' },
  tarif_11:               { tarifPPN: 11,   tarifEfektif: 11,   jenis: 'normal',    label: 'Tarif 11% (s/d 31 Des 2024)',regulasi: 'UU HPP No.7/2021 Pasal 7 ayat (1) · berlaku 1 April 2022 – 31 Desember 2024' },
  tarif_1_2:              { tarifPPN: 12,   tarifEfektif: 1.2,  jenis: 'nilai_lain',label: 'DPP Nilai Lain (11/12 × Harga Jual)',dppFaktor: 11/12, regulasi: 'PMK 131/2024 · SE-02/PJ/2025 · DPP = 11/12 × Harga Jual' },
  tarif_2_4:              { tarifPPN: 12,   tarifEfektif: 2.4,  jenis: 'nilai_lain',label: 'Kendaraan Bekas Dealer (DPP 20% × Harga)',dppFaktor: 0.20, regulasi: 'PMK 131/2024 · DPP = 20% × Harga Jual' },
  tarif_1_1:              { tarifPPN: 11,   tarifEfektif: 1.1,  jenis: 'nilai_lain',label: 'Kendaraan Bekas Dealer s/d Des 2024 (DPP 10% × Harga)',dppFaktor: 0.10, regulasi: 'PMK 79/2010 jo PMK 102/2011 · DPP = 10% × Harga Jual' },
  tarif_jasa_pengiriman:  { tarifPPN: 12,   tarifEfektif: 1.2,  jenis: 'nilai_lain',label: 'Jasa Pengiriman Paket (DPP 10% × Tagihan)',dppFaktor: 0.10, regulasi: 'PMK 131/2024 · DPP = 10% × Tagihan/Harga' },
  tarif_jasa_biro:        { tarifPPN: 12,   tarifEfektif: 1.2,  jenis: 'nilai_lain',label: 'Jasa Biro Perjalanan (DPP 10% × Tagihan)',dppFaktor: 0.10, regulasi: 'PMK 131/2024 · DPP = 10% × Tagihan Perjalanan' },
  tarif_ev_roda4_lokal:   { tarifPPN: 12,   tarifEfektif: 1,    jenis: 'ev',        label: 'KBLBB Roda 4 Dalam Negeri (TKDN ≥ 40%)',  regulasi: 'PMK 12/2025 · Insentif DTP: PPN ditanggung pemerintah 11%, konsumen bayar 1% · s/d 31 Des 2025' },
  tarif_ev_roda4_impor_ckd:{ tarifPPN: 12,  tarifEfektif: 5,    jenis: 'ev',        label: 'KBLBB Roda 4 CKD / TKDN Transisi',        regulasi: 'PMK 12/2025 · Insentif DTP: PPN ditanggung pemerintah 7%, konsumen bayar 5% · s/d 31 Des 2025' },
  tarif_ev_bus_lokal:     { tarifPPN: 12,   tarifEfektif: 1,    jenis: 'ev',        label: 'Bus Listrik Dalam Negeri (TKDN ≥ 40%)',   regulasi: 'PMK 12/2025 · DTP 11%, konsumen bayar 1% · s/d 31 Des 2025' },
  tarif_ev_bus_ckd:       { tarifPPN: 12,   tarifEfektif: 5,    jenis: 'ev',        label: 'Bus Listrik CKD / TKDN Transisi',          regulasi: 'PMK 12/2025 · DTP 7%, konsumen bayar 5% · s/d 31 Des 2025' },
  tarif_ev_motor_lokal:   { tarifPPN: 12,   tarifEfektif: 0,    jenis: 'ev',        label: 'Motor Listrik Dalam Negeri (TKDN ≥ 40%)', regulasi: 'PMK 8/2025 · Perpres 79/2023 · DTP 12%, konsumen bayar 0% · maks 1 unit/NIK · s/d 31 Des 2025' },
  bebas_sembako:          { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Barang Kebutuhan Pokok (Sembako)',          regulasi: 'UU HPP Pasal 16B · PMK 71/2022 · Dibebaskan dari PPN' },
  bebas_jasa_kesehatan:   { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Jasa Kesehatan Medis',                     regulasi: 'UU PPN Pasal 16B · PMK 71/2022 · Dibebaskan dari PPN' },
  bebas_jasa_pendidikan:  { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Jasa Pendidikan',                          regulasi: 'UU PPN Pasal 16B · Dibebaskan dari PPN' },
  bebas_jasa_sosial:      { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Jasa Sosial & Kemanusiaan',                regulasi: 'UU PPN Pasal 16B · Dibebaskan dari PPN' },
  bebas_jasa_keuangan:    { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Jasa Keuangan & Asuransi',                 regulasi: 'UU PPN Pasal 16B · PMK 71/2022 · Dibebaskan dari PPN' },
  bebas_buku:             { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Buku Pelajaran & Kitab Suci',              regulasi: 'UU HPP Pasal 16B · Dibebaskan dari PPN' },
  bebas_vaksin:           { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Vaksin Program Nasional',                  regulasi: 'Keppres No.7/2002 · UU HPP Pasal 16B · Dibebaskan dari PPN' },
  bebas_listrik_rumah:    { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Listrik Rumah Tangga (≤ 6.600 VA)',        regulasi: 'UU HPP Pasal 16B · Dibebaskan dari PPN' },
  bebas_air_minum:        { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Air Minum / Air Bersih Perpipaan',         regulasi: 'UU HPP Pasal 16B · Dibebaskan dari PPN' },
  bebas_rusunami:         { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'bebas',     label: 'Rumah Tapak / Rusunami Bersubsidi',        regulasi: 'PMK 120/2023 jo PMK 60/2023 · Dibebaskan dari PPN s/d batas harga yang ditetapkan' },
  tdp_kawasan_berikat:    { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'tdp',       label: 'Kawasan Berikat (Bonded Zone)',             regulasi: 'PP 85/2015 jo PMK 131/2016 · Tidak dipungut PPN & PPnBM' },
  tdp_kek:                { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'tdp',       label: 'Kawasan Ekonomi Khusus (KEK)',              regulasi: 'PP 40/2021 jo PMK 33/2021 · Tidak dipungut PPN di dalam KEK' },
  tdp_kb_niaga:           { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'tdp',       label: 'Kawasan Bebas / FTZ',                      regulasi: 'PP 10/2012 jo PMK 206/2015 · Tidak dipungut PPN di Kawasan Bebas' },
  tdp_ekspor:             { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'tdp',       label: 'Ekspor BKP & JKP (Tarif 0%)',              regulasi: 'UU PPN Pasal 7 ayat (2) · Tarif 0%, PM dapat dikreditkan / direstitusi' },
  tdp_impor_tertentu:     { tarifPPN: 0,    tarifEfektif: 0,    jenis: 'tdp',       label: 'Impor BKP Strategis Tertentu',             regulasi: 'PP 81/2015 jo PMK terkait · Tidak dipungut PPN atas impor BKP strategis' },
};

const PPN_JENIS_LABEL = {
  normal:     'Tarif Umum',
  nilai_lain: 'DPP Nilai Lain / Tarif Khusus',
  ev:         'Insentif Kendaraan Listrik (DTP)',
  bebas:      'Dibebaskan dari PPN',
  tdp:        'Tidak Dipungut PPN',
};

const PPN_JENIS_COLOR = {
  normal:     'badge-normal',
  nilai_lain: 'badge-nilai-lain',
  ev:         'badge-ev',
  bebas:      'badge-bebas',
  tdp:        'badge-tdp',
};

// Update deskripsi objek saat dropdown berubah
document.getElementById('ppn-kategori').addEventListener('change', function () {
  const opt = this.options[this.selectedIndex];
  const desc = opt.getAttribute('data-desc') || '';
  const descBox = document.getElementById('ppn-objek-desc-box');
  const descEl = document.getElementById('ppn-objek-desc');
  descEl.textContent = desc || 'Pilih objek pajak untuk melihat detail regulasi.';
  descBox.style.display = desc ? 'flex' : 'flex';
});

// Hitung PPN
document.getElementById('ppn-btn-hitung').addEventListener('click', () => {
  const key = document.getElementById('ppn-kategori').value;
  const inputNilai = parseRupiah(document.getElementById('ppn-nilai').value);
  const arah = document.querySelector('input[name="ppn-arah"]:checked').value;

  if (inputNilai <= 0) { alert('Silakan masukkan nilai transaksi!'); return; }

  const obj = PPN_DATABASE[key];
  if (!obj) return;

  const tarifEfektif = obj.tarifEfektif; // persentase efektif terhadap harga jual
  const tarifPPN = obj.tarifPPN;
  const jenis = obj.jenis;

  let hargaEkskl, hargaInkl, ppn, dpp, dppKeterangan = '';

  if (jenis === 'bebas' || jenis === 'tdp') {
    // Bebas / tidak dipungut: PPN = 0
    hargaEkskl = inputNilai;
    hargaInkl  = inputNilai;
    ppn        = 0;
    dpp        = inputNilai;
  } else if (jenis === 'nilai_lain' && obj.dppFaktor !== undefined) {
    // DPP Nilai Lain: DPP = faktor × harga jual
    if (arah === 'eksklusif') {
      hargaEkskl = inputNilai;
      dpp        = hargaEkskl * obj.dppFaktor;
      ppn        = dpp * (tarifPPN / 100);
      hargaInkl  = hargaEkskl + ppn;
    } else {
      // inklusif: hargaJual = hargaInkl / (1 + tarifEfektif/100)
      hargaEkskl = inputNilai / (1 + tarifEfektif / 100);
      dpp        = hargaEkskl * obj.dppFaktor;
      ppn        = inputNilai - hargaEkskl;
      hargaInkl  = inputNilai;
    }
    const pctFaktor = (obj.dppFaktor * 100).toFixed(0);
    dppKeterangan = `${pctFaktor}% × ${formatRupiah(arah === 'eksklusif' ? inputNilai : hargaEkskl)}`;
  } else if (jenis === 'ev') {
    // EV: tarif efektif langsung terhadap harga jual
    if (arah === 'eksklusif') {
      hargaEkskl = inputNilai;
      ppn        = hargaEkskl * (tarifEfektif / 100);
      hargaInkl  = hargaEkskl + ppn;
      dpp        = hargaEkskl;
    } else {
      hargaEkskl = inputNilai / (1 + tarifEfektif / 100);
      ppn        = inputNilai - hargaEkskl;
      hargaInkl  = inputNilai;
      dpp        = hargaEkskl;
    }
    const dtpPct = tarifPPN - tarifEfektif;
    dppKeterangan = `DTP: ${dtpPct}%, konsumen bayar: ${tarifEfektif}%`;
  } else {
    // Normal: tarif langsung
    if (arah === 'eksklusif') {
      hargaEkskl = inputNilai;
      dpp        = inputNilai;
      ppn        = dpp * (tarifPPN / 100);
      hargaInkl  = hargaEkskl + ppn;
    } else {
      hargaEkskl = inputNilai / (1 + tarifPPN / 100);
      dpp        = hargaEkskl;
      ppn        = inputNilai - hargaEkskl;
      hargaInkl  = inputNilai;
    }
  }

  // Update UI
  document.getElementById('ppn-res-title').textContent = 'Hasil Perhitungan PPN';

  // Status badge
  const badge = document.getElementById('ppn-status-badge');
  badge.className = `ppn-status-badge ${PPN_JENIS_COLOR[jenis] || ''}`;
  badge.textContent = PPN_JENIS_LABEL[jenis] || jenis;

  // PPN box
  const ppnBox = document.getElementById('ppn-res-ppn-box');
  if (jenis === 'bebas' || jenis === 'tdp') {
    ppnBox.style.display = 'flex';
    document.getElementById('ppn-res-ppn').textContent = 'Rp 0 (Tidak Kena PPN)';
  } else {
    ppnBox.style.display = 'flex';
    document.getElementById('ppn-res-ppn').textContent = formatRupiah(ppn);
  }

  document.getElementById('ppn-res-dpp').textContent = formatRupiah(dpp);
  document.getElementById('ppn-res-tarif').textContent =
    (jenis === 'bebas' || jenis === 'tdp')
      ? `0% (${PPN_JENIS_LABEL[jenis]})`
      : (tarifEfektif !== tarifPPN ? `${tarifEfektif}% (efektif) / ${tarifPPN}% (PPN)` : `${tarifEfektif}%`);

  document.getElementById('ppn-res-kategori').textContent = obj.label;

  // DPP keterangan
  const rowDppKet = document.getElementById('ppn-res-row-dpp-keterangan');
  if (dppKeterangan) {
    rowDppKet.style.display = 'flex';
    document.getElementById('ppn-res-dpp-keterangan').textContent = dppKeterangan;
    document.getElementById('ppn-res-dpp-label-keterangan').textContent =
      jenis === 'ev' ? 'Keterangan Insentif' : 'Keterangan DPP';
  } else {
    rowDppKet.style.display = 'none';
  }

  document.getElementById('ppn-res-harga-label').textContent =
    arah === 'inklusif' ? 'Harga Belum Termasuk PPN (Dihitung)' : 'Harga Belum Termasuk PPN';
  document.getElementById('ppn-res-harga-ekskl').textContent = formatRupiah(hargaEkskl);
  document.getElementById('ppn-res-harga-inkl').textContent = formatRupiah(hargaInkl);

  document.getElementById('ppn-res-regulasi').innerHTML =
    `<i class="fa-solid fa-scale-balanced"></i> ${obj.regulasi}`;

  showResult('ppn-result-content', 'ppn-result-card');
});

document.getElementById('ppn-btn-reset').addEventListener('click', () => {
  document.getElementById('ppn-nilai').value = '';
  hideResult('ppn-result-content', 'ppn-result-card');
});

// Trigger deskripsi saat halaman load
document.getElementById('ppn-kategori').dispatchEvent(new Event('change'));

// ===================== PPh 15 =====================
document.getElementById('p15-objek').addEventListener('change', function() {
  const opt = this.options[this.selectedIndex];
  document.getElementById('p15-desc-text').textContent = opt.getAttribute('data-desc') || '';
});

document.getElementById('p15-btn-hitung').addEventListener('click', () => {
  const opt   = document.getElementById('p15-objek').options[document.getElementById('p15-objek').selectedIndex];
  const inputVal = parseRupiah(document.getElementById('p15-bruto').value);
  const scheme = schemeState['p15'] || 'gross';
  if (inputVal <= 0) { alert('Masukkan nilai!'); return; }

  const tarifEfektif = parseFloat(opt.getAttribute('data-tarif'));
  const dppPct       = parseFloat(opt.getAttribute('data-dpp'));
  const sifat        = opt.getAttribute('data-sifat');
  
  let bruto, pph, neto, grossUpBruto = null;
  if (scheme === 'grossup') {
    const result = flatRateGrossUp(inputVal, tarifEfektif);
    grossUpBruto = result.gross;
    pph = result.tax;
    bruto = inputVal;
    neto = inputVal * (dppPct / 100);
  } else {
    bruto = inputVal;
    pph = bruto * (tarifEfektif / 100);
    neto = bruto * (dppPct / 100);
  }

  const sifatMap = { final: 'Final (tidak dapat dikreditkan)', tidak_final: 'Tidak Final (kredit pajak SPT Tahunan)' };
  const badgeMap = { final: 'badge-ev', tidak_final: 'badge-nilai-lain' };

  document.getElementById('p15-res-badge').textContent  = (scheme === 'grossup' ? '[Gross Up] ' : '') + (sifatMap[sifat] || sifat);
  document.getElementById('p15-res-badge').className    = `ppn-status-badge ${badgeMap[sifat] || 'badge-normal'}`;
  document.getElementById('p15-res-total').textContent  = formatRupiah(pph);
  document.getElementById('p15-res-objek').textContent  = opt.textContent.trim().split('—')[0].trim();
  document.getElementById('p15-res-bruto').textContent  = formatRupiah(bruto);
  document.getElementById('p15-res-input-label').textContent = scheme === 'grossup' ? 'Neto Target (Input)' : 'Peredaran Bruto';
  
  const grossRow = document.getElementById('p15-res-gross-row');
  if (scheme === 'grossup' && grossUpBruto !== null) {
    grossRow.style.display = 'flex';
    document.getElementById('p15-res-gross').textContent = formatRupiah(grossUpBruto);
  } else {
    grossRow.style.display = 'none';
  }

  document.getElementById('p15-res-dpp').textContent    = `${dppPct}% × Bruto = ${formatRupiah(neto)}`;
  document.getElementById('p15-res-neto').textContent   = formatRupiah(neto);
  document.getElementById('p15-res-tarif').textContent  = `${tarifEfektif}% × Peredaran Bruto`;
  document.getElementById('p15-res-sifat').textContent  = sifatMap[sifat] || sifat;
  document.getElementById('p15-res-regulasi').innerHTML = `<i class="fa-solid fa-scale-balanced"></i> ${opt.getAttribute('data-desc')}`;
  showResult('p15-result-content', 'p15-result-card');
});
document.getElementById('p15-btn-reset').addEventListener('click', () => {
  document.getElementById('p15-bruto').value = '';
  hideResult('p15-result-content', 'p15-result-card');
});
document.getElementById('p15-objek').dispatchEvent(new Event('change'));

// ===================== PPh 22 =====================
document.getElementById('p22-objek').addEventListener('change', function() {
  const opt = this.options[this.selectedIndex];
  document.getElementById('p22-desc-text').textContent = opt.getAttribute('data-desc') || '';
});

document.getElementById('p22-btn-hitung').addEventListener('click', () => {
  const opt     = document.getElementById('p22-objek').options[document.getElementById('p22-objek').selectedIndex];
  const inputVal   = parseRupiah(document.getElementById('p22-nilai').value);
  const hasNpwp = document.querySelector('input[name="p22-npwp"]:checked').value === 'ya';
  const scheme = schemeState['p22'] || 'gross';
  if (inputVal <= 0) { alert('Masukkan nilai transaksi!'); return; }

  const tarifDasar = parseFloat(opt.getAttribute('data-tarif'));
  const sifat      = opt.getAttribute('data-sifat');
  const npwpMult   = hasNpwp ? 1 : 2;
  const tarifFinal = tarifDasar * npwpMult;
  
  let nilai, pph, grossUpBruto = null;
  if (scheme === 'grossup') {
    const result = flatRateGrossUp(inputVal, tarifFinal);
    grossUpBruto = result.gross;
    pph = result.tax;
    nilai = inputVal;
  } else {
    nilai = inputVal;
    pph = nilai * (tarifFinal / 100);
  }

  const sifatMap = {
    final:       'Final (tidak dapat dikreditkan)',
    tidak_final: 'Tidak Final (kredit pajak SPT Tahunan)',
    final_agen:  'Final bagi agen/dealer swasta',
  };
  const badgeMap = { final: 'badge-ev', tidak_final: 'badge-nilai-lain', final_agen: 'badge-ev' };

  document.getElementById('p22-res-badge').textContent  = (scheme === 'grossup' ? '[Gross Up] ' : '') + (sifatMap[sifat] || sifat);
  document.getElementById('p22-res-badge').className    = `ppn-status-badge ${badgeMap[sifat] || 'badge-normal'}`;
  document.getElementById('p22-res-total').textContent  = formatRupiah(pph);
  document.getElementById('p22-res-objek').textContent  = opt.textContent.trim().split(':')[0].trim();
  document.getElementById('p22-res-nilai').textContent  = formatRupiah(nilai);
  document.getElementById('p22-res-input-label').textContent = scheme === 'grossup' ? 'Neto Target (Input)' : 'Nilai Dasar Pengenaan';
  
  const grossRow = document.getElementById('p22-res-gross-row');
  if (scheme === 'grossup' && grossUpBruto !== null) {
    grossRow.style.display = 'flex';
    document.getElementById('p22-res-gross').textContent = formatRupiah(grossUpBruto);
  } else {
    grossRow.style.display = 'none';
  }

  document.getElementById('p22-res-tarif').textContent  = hasNpwp
    ? `${tarifDasar}%`
    : `${tarifDasar}% × 2 = ${tarifFinal}% (tanpa NPWP)`;
  document.getElementById('p22-res-npwp-row').style.display = !hasNpwp ? 'flex' : 'none';
  document.getElementById('p22-res-sifat').textContent  = sifatMap[sifat] || sifat;
  document.getElementById('p22-res-regulasi').innerHTML = `<i class="fa-solid fa-scale-balanced"></i> ${opt.getAttribute('data-desc')}`;
  showResult('p22-result-content', 'p22-result-card');
});
document.getElementById('p22-btn-reset').addEventListener('click', () => {
  document.getElementById('p22-nilai').value = '';
  hideResult('p22-result-content', 'p22-result-card');
});
document.getElementById('p22-objek').dispatchEvent(new Event('change'));

// ===================== PP 20/2026 =====================
document.getElementById('pp20-objek').addEventListener('change', function() {
  const opt   = this.options[this.selectedIndex];
  const sifat = opt.getAttribute('data-sifat');
  document.getElementById('pp20-desc-text').textContent = opt.getAttribute('data-desc') || '';

  const isUmkm = sifat === 'umkm' || sifat === 'umkm_bebas' || sifat === 'umkm_progresif';
  document.getElementById('pp20-nilai-group').style.display  = isUmkm ? 'none' : 'block';
  document.getElementById('pp20-umkm-group').style.display   = isUmkm ? 'block' : 'none';

  if (!isUmkm) {
    const hintMap  = { bebas:'Masukkan nilai bruto.', final:'Masukkan nilai bruto / nilai DHE.', insentif:'Masukkan nilai investasi / biaya.' };
    const labelMap = { bebas:'Nilai Bruto (Rp)', final:'Nilai Bruto / Nilai DHE (Rp)', insentif:'Nilai Investasi / Biaya (Rp)' };
    document.getElementById('pp20-nilai-hint').textContent  = hintMap[sifat] || '';
    document.getElementById('pp20-nilai-label').textContent = labelMap[sifat] || 'Nilai (Rp)';
  }
});

document.getElementById('pp20-btn-hitung').addEventListener('click', () => {
  const opt   = document.getElementById('pp20-objek').options[document.getElementById('pp20-objek').selectedIndex];
  const sifat = opt.getAttribute('data-sifat');
  const tarif = parseFloat(opt.getAttribute('data-tarif'));

  const isUmkm = sifat === 'umkm' || sifat === 'umkm_bebas' || sifat === 'umkm_progresif';

  // ── Cabang UMKM ──
  if (isUmkm) {

    // Poin 3: Masa fasilitas habis → langsung pindah ke PPh 21 Tahunan
    if (sifat === 'umkm_progresif') {
      switchTab('pph21');
      // Aktifkan sub-tab Tahunan
      document.querySelectorAll('.sub-tab-btn').forEach(b => {
        b.classList.toggle('active', b.getAttribute('data-subtab') === 'pph21-tahunan');
      });
      document.querySelectorAll('.sub-panel').forEach(p => {
        p.classList.toggle('active', p.id === 'subpanel-pph21-tahunan');
      });
      return;
    }

    const omzetBulan = parseRupiah(document.getElementById('pp20-umkm-omzet-bulan').value);
    const omzetSblm  = parseRupiah(document.getElementById('pp20-umkm-omzet-sebelum').value);
    const jenisWP    = document.querySelector('input[name="pp20-umkm-jenis"]:checked').value;
    if (omzetBulan <= 0) { alert('Masukkan omzet bulan ini!'); return; }

    const omzetKumulatif = omzetSblm + omzetBulan;
    const BATAS_BEBAS    = 500000000;   // Rp 500 juta (hanya WP OP)
    const BATAS_UMKM     = 4800000000; // Rp 4,8 miliar

    const masaFasilitas = { op: '7 tahun', cv: '4 tahun', badan: '3 tahun' };
    const jenisLabel    = { op: 'WP Orang Pribadi', cv: 'CV / Firma / Koperasi', badan: 'Badan Lainnya' };

    /*
     * Logika perhitungan yang BENAR (PP 55/2022 jo PP 20/2026):
     * - Tarif 0,5% diterapkan atas OMZET BRUTO tiap bulan
     * - Untuk WP OP: bagian omzet kumulatif s/d Rp 500 juta/tahun = BEBAS (0%)
     *   Mekanisme: PPh = 0,5% × (omzet yang kumulatifnya sudah > Rp 500 juta)
     * - Untuk CV/Firma/Badan: seluruh omzet langsung kena 0,5% (tidak ada threshold bebas)
     * 
     * Contoh WP OP:
     *   Omzet Jan–Nov = Rp 480 juta, Omzet Des = Rp 60 juta
     *   → Bagian bebas Des = 500 juta − 480 juta = 20 juta
     *   → Bagian kena 0,5% Des = 60 juta − 20 juta = 40 juta
     *   → PPh Des = 0,5% × 40 juta = Rp 200.000
     * 
     * Poin 2: Jika omzet kumulatif (sebelumnya) sudah > 500 juta untuk WP OP,
     *   maka opsi "BEBAS" tidak relevan — diarahkan otomatis ke opsi standar 0,5%.
     */

    let pphBulan   = 0;
    let bagianBebas = 0;
    let bagianKena  = 0;
    let keterangan  = '';
    let breakdown   = [];

    // Poin 2: Jika WP OP dan omzet sebelumnya sudah melampaui 500 juta
    //         (dipilih opsi "bebas" tapi sebenarnya sudah kena) → arahkan ke perhitungan standar
    const sudahMelebihiBatasBebas = jenisWP === 'op' && omzetSblm >= BATAS_BEBAS;

    if (sifat === 'umkm_bebas' && !sudahMelebihiBatasBebas && jenisWP === 'op') {
      // Cek apakah bulan ini masih dalam batas bebas atau sudah melampaui
      if (omzetKumulatif <= BATAS_BEBAS) {
        // Masih bebas 100%
        pphBulan    = 0;
        bagianBebas = omzetBulan;
        keterangan  = `Seluruh omzet bebas PPh`;
        breakdown   = [
          { label: 'Omzet bulan ini', nilai: omzetBulan, tarif: '0% (Bebas)', pph: 0 },
          { label: 'Kumulatif s/d bulan ini', nilai: omzetKumulatif, tarif: '—', pph: 0 },
          { label: 'Sisa ruang bebas', nilai: BATAS_BEBAS - omzetKumulatif, tarif: '—', pph: 0 },
        ];
      } else {
        // Bulan ini melewati batas — sebagian bebas, sebagian kena
        bagianBebas = BATAS_BEBAS - omzetSblm;
        bagianKena  = omzetBulan - bagianBebas;
        pphBulan    = bagianKena * 0.005;
        keterangan  = `Omzet melewati batas Rp 500 juta bulan ini`;
        breakdown   = [
          { label: `Bagian bebas (s.d. Rp 500 juta kumulatif)`, nilai: bagianBebas, tarif: '0% (Bebas)', pph: 0 },
          { label: `Bagian kena 0,5% (melampaui Rp 500 juta)`,  nilai: bagianKena,  tarif: '0,5%',      pph: pphBulan },
        ];
      }
    } else if (sifat === 'umkm_bebas' && sudahMelebihiBatasBebas) {
      // Poin 2: omzet sebelumnya sudah > 500 juta → seluruh omzet bulan ini kena 0,5%
      bagianKena  = omzetBulan;
      pphBulan    = omzetBulan * 0.005;
      keterangan  = `Akumulasi omzet sudah melampaui Rp 500 juta — seluruh omzet bulan ini kena 0,5%`;
      breakdown   = [
        { label: `Seluruh omzet bulan ini`, nilai: omzetBulan, tarif: '0,5%', pph: pphBulan },
      ];
    } else if (jenisWP !== 'op') {
      // CV/Firma/Badan: tidak ada threshold bebas, langsung 0,5%
      bagianKena  = omzetBulan;
      pphBulan    = omzetBulan * 0.005;
      keterangan  = `0,5% × ${formatRupiah(omzetBulan)} (tidak ada threshold bebas untuk ${jenisLabel[jenisWP]})`;
      breakdown   = [
        { label: `Seluruh omzet bulan ini`, nilai: omzetBulan, tarif: '0,5%', pph: pphBulan },
      ];
    } else {
      // WP OP standar: cek posisi kumulatif
      if (omzetSblm >= BATAS_BEBAS) {
        // Sudah melewati batas, seluruh bulan ini kena 0,5%
        bagianKena  = omzetBulan;
        pphBulan    = omzetBulan * 0.005;
        breakdown   = [
          { label: `Seluruh omzet bulan ini (kumulatif sudah > Rp 500 juta)`, nilai: omzetBulan, tarif: '0,5%', pph: pphBulan },
        ];
      } else if (omzetKumulatif <= BATAS_BEBAS) {
        // Masih dalam threshold bebas
        pphBulan    = 0;
        bagianBebas = omzetBulan;
        breakdown   = [
          { label: `Seluruh omzet bulan ini (kumulatif ${formatRupiah(omzetKumulatif)} ≤ Rp 500 juta)`, nilai: omzetBulan, tarif: '0% (Bebas)', pph: 0 },
          { label: 'Sisa ruang bebas tersisa', nilai: BATAS_BEBAS - omzetKumulatif, tarif: '—', pph: 0 },
        ];
      } else {
        // Melewati threshold di bulan ini
        bagianBebas = BATAS_BEBAS - omzetSblm;
        bagianKena  = omzetBulan - bagianBebas;
        pphBulan    = bagianKena * 0.005;
        breakdown   = [
          { label: `Bagian bebas (s.d. Rp 500 juta kumulatif)`, nilai: bagianBebas, tarif: '0% (Bebas)', pph: 0 },
          { label: `Bagian kena 0,5% (melampaui Rp 500 juta)`,  nilai: bagianKena,  tarif: '0,5%',      pph: pphBulan },
        ];
      }
      keterangan = breakdown.map(r => `${r.label}: ${formatRupiah(r.nilai)}`).join(' | ');
    }

    // Peringatan melebihi Rp 4,8 M
    let warningHtml = '';
    if (omzetKumulatif > BATAS_UMKM) {
      warningHtml = `<br><br><strong style="color:var(--warning);">⚠️ Omzet kumulatif (${formatRupiah(omzetKumulatif)}) telah melampaui Rp 4,8 Miliar — WP wajib menyelenggarakan pembukuan &amp; dikenai tarif PPh normal mulai tahun pajak berikutnya.</strong>`;
    }

    // Render breakdown di dalam result-details sebagai tabel ringkas
    const breakdownHtml = breakdown.map(r => `
      <div class="detail-row">
        <span>${r.label}</span>
        <strong>${formatRupiah(r.nilai)} × ${r.tarif} = ${r.pph > 0 ? formatRupiah(r.pph) : (r.tarif === '—' ? '—' : 'Rp 0')}</strong>
      </div>`).join('');

    document.getElementById('pp20-res-title').textContent         = 'Hasil PPh Final UMKM — PP 20/2026';
    document.getElementById('pp20-res-badge').textContent         = pphBulan === 0 ? 'BEBAS PPh (0%)' : 'PPh Final 0,5%';
    document.getElementById('pp20-res-badge').className           = `ppn-status-badge ${pphBulan === 0 ? 'badge-bebas' : 'badge-ev'}`;
    document.getElementById('pp20-res-summary-label').textContent = 'PPh Final UMKM Terutang Bulan Ini';
    document.getElementById('pp20-res-total').textContent         = pphBulan === 0 ? 'Rp 0 (Bebas)' : formatRupiah(pphBulan);
    document.getElementById('pp20-res-objek').textContent         =
      `PPh Final UMKM · ${jenisLabel[jenisWP]} · Masa fasilitas maks: ${masaFasilitas[jenisWP]}`;
    document.getElementById('pp20-res-nilai').innerHTML           =
      `Omzet bulan ini: <strong>${formatRupiah(omzetBulan)}</strong><br>` +
      `Kumulatif s/d bulan ini: <strong>${formatRupiah(omzetKumulatif)}</strong>` +
      (jenisWP === 'op' ? `<br>Sisa ruang bebas: <strong>${formatRupiah(Math.max(0, BATAS_BEBAS - omzetKumulatif))}</strong>` : '');
    document.getElementById('pp20-res-tarif').textContent         = keterangan || '0,5% × omzet kena pajak';
    document.getElementById('pp20-res-sifat').textContent         = 'Final · PP 20/2026 jo PP 55/2022 jo PMK 164/2023';
    document.getElementById('pp20-res-regulasi').innerHTML        =
      `<i class="fa-solid fa-scale-balanced"></i> <strong>Rincian:</strong><br>${breakdownHtml}<br>` +
      `PP 55/2022 jo PP 20/2026: Tarif 0,5% × omzet bruto. Threshold bebas Rp 500 juta hanya berlaku untuk WP OP.` +
      warningHtml;
    showResult('pp20-result-content', 'pp20-result-card');
    return;
  }

  // ── Cabang non-UMKM (sama seperti sebelumnya) ──
  const nilai = parseRupiah(document.getElementById('pp20-nilai').value);
  if (nilai <= 0) { alert('Masukkan nilai!'); return; }

  const pajak = nilai * (tarif / 100);
  const sifatLabel = { bebas:'Dibebaskan / PPh 0%', final:'PPh Final', insentif:'Fasilitas / Insentif Pajak' };
  const sifatBadge = { bebas:'badge-bebas', final:'badge-ev', insentif:'badge-nilai-lain' };

  let summaryLabel = 'Pajak Terutang';
  let totalDisplay = formatRupiah(pajak);
  let tarifDisplay = `${tarif}%`;

  if (sifat === 'bebas') {
    summaryLabel = 'PPh Terutang';
    totalDisplay = 'Rp 0 (Bebas/0%)';
  } else if (sifat === 'insentif') {
    if (tarif >= 100) {
      summaryLabel = 'Nilai Pengurangan Penghasilan';
      totalDisplay = formatRupiah(pajak) + ` (${tarif}% × biaya)`;
      tarifDisplay = `${tarif}% Pengurangan`;
    } else {
      summaryLabel = 'Nilai Fasilitas (Pengurangan Neto)';
      totalDisplay = formatRupiah(pajak);
      tarifDisplay = `${tarif}% dari nilai investasi`;
    }
  }

  document.getElementById('pp20-res-title').textContent         = 'Hasil Perhitungan PP 20/2026';
  document.getElementById('pp20-res-badge').textContent         = sifatLabel[sifat] || sifat;
  document.getElementById('pp20-res-badge').className           = `ppn-status-badge ${sifatBadge[sifat] || 'badge-normal'}`;
  document.getElementById('pp20-res-summary-label').textContent = summaryLabel;
  document.getElementById('pp20-res-total').textContent         = totalDisplay;
  document.getElementById('pp20-res-objek').textContent         = opt.textContent.trim().split(':')[0].split('—')[0].trim();
  document.getElementById('pp20-res-nilai').textContent         = formatRupiah(nilai);
  document.getElementById('pp20-res-tarif').textContent         = tarifDisplay;
  document.getElementById('pp20-res-sifat').textContent         = sifatLabel[sifat] || sifat;
  document.getElementById('pp20-res-regulasi').innerHTML        = `<i class="fa-solid fa-scale-balanced"></i> ${opt.getAttribute('data-desc')}`;
  showResult('pp20-result-content', 'pp20-result-card');
});

document.getElementById('pp20-btn-reset').addEventListener('click', () => {
  document.getElementById('pp20-nilai').value = '';
  document.getElementById('pp20-umkm-omzet-bulan').value = '';
  document.getElementById('pp20-umkm-omzet-sebelum').value = '';
  hideResult('pp20-result-content', 'pp20-result-card');
});
document.getElementById('pp20-objek').dispatchEvent(new Event('change'));

// ===================== PPh BADAN =====================

const PB_PASAL_DESC = {
  '31e': `<strong>Pasal 31E — Fasilitas Tarif 50%</strong><br>
Berlaku bagi WP Badan dalam negeri dengan peredaran bruto s/d Rp 50 Miliar/tahun.
<br>• Omzet ≤ Rp 4,8 M: seluruh PKP kena tarif fasilitas <strong>11%</strong>
<br>• Rp 4,8 M &lt; Omzet ≤ Rp 50 M: PKP dibagi proporsional → fasilitas 11% + normal 22%
<br>• Omzet &gt; Rp 50 M: tidak dapat fasilitas, tarif 22% atas seluruh PKP`,

  '17_1b': `<strong>Pasal 17 ayat (1) huruf b — Tarif Umum 22%</strong><br>
Berlaku untuk semua WP Badan dalam negeri &amp; BUT yang tidak mendapat fasilitas Pasal 31E atau go-public.
<br>• Tarif tunggal (flat) <strong>22%</strong> atas seluruh PKP setelah dibulatkan ke ribuan
<br>• Berlaku sejak UU HPP No.7/2021 (tahun pajak 2022 dst.)`,

  '17_2b': `<strong>Pasal 17 ayat (2) huruf b — Emiten/Go-Public 19%</strong><br>
Tarif khusus bagi WP Badan yang sahamnya diperdagangkan di Bursa Efek Indonesia (BEI).
<br>• Tarif <strong>19%</strong> (diskon 3% dari tarif umum 22%)
<br>• Syarat: &gt; 40% saham diperdagangkan di BEI, ≥ 300 pemegang saham, tidak ada pemegang ≥ 50% saham
<br>• Dasar: PP 30/2020 jo PMK 40/2020`,
};

// Update deskripsi saat pasal berubah
document.getElementById('pb-pasal').addEventListener('change', function () {
  document.getElementById('pb-pasal-desc').innerHTML =
    PB_PASAL_DESC[this.value] || 'Pilih jenis pasal.';
});
// Trigger awal
document.getElementById('pb-pasal').dispatchEvent(new Event('change'));

document.getElementById('pb-btn-hitung').addEventListener('click', () => {
  const pasal          = document.getElementById('pb-pasal').value;
  const omzet          = parseRupiah(document.getElementById('pb-omzet').value);
  let   pkpInput       = parseRupiah(document.getElementById('pb-pkp').value);
  const netoKomersial  = parseRupiah(document.getElementById('pb-neto-komersial').value);
  const koreksiPos     = parseRupiah(document.getElementById('pb-koreksi-positif').value);
  const koreksiNeg     = parseRupiah(document.getElementById('pb-koreksi-negatif').value);
  const angsuranPph25  = parseRupiah(document.getElementById('pb-pph25').value);
  const kreditLain     = parseRupiah(document.getElementById('pb-kredit-lain').value);

  // Auto-hitung PKP dari neto komersial + koreksi jika PKP tidak diisi tapi neto diisi
  let pkpAuto = 0;
  let pkpFromAutoCalc = false;
  if (pkpInput === 0 && netoKomersial > 0) {
    pkpAuto = Math.max(0, netoKomersial + koreksiPos - koreksiNeg);
    pkpInput = pkpAuto;
    pkpFromAutoCalc = true;
  }

  if (omzet <= 0)    { alert('Masukkan peredaran bruto / omzet setahun!'); return; }
  if (pkpInput <= 0) { alert('Masukkan Penghasilan Kena Pajak (PKP), atau isi Penghasilan Neto Komersial + Koreksi Fiskal untuk perhitungan otomatis.'); return; }

  // Bulatkan PKP ke bawah ke ribuan (Pasal 17 ayat 4 UU PPh)
  const pkp = Math.floor(pkpInput / 1000) * 1000;

  // ── Variabel hasil ──
  let pphTerutang = 0;
  let breakdown   = [];
  let badgeText   = '';
  let regulasiText = '';

  // ═══════════════════════════════════════════════
  //  PASAL 31E
  // ═══════════════════════════════════════════════
  if (pasal === '31e') {
    const BATAS_FULL_FASILITAS = 4800000000;   // Rp 4,8 M
    const BATAS_FASILITAS      = 50000000000;  // Rp 50 M
    const TARIF_FASILITAS      = 0.11;         // 50% × 22%
    const TARIF_NORMAL         = 0.22;

    if (omzet <= BATAS_FULL_FASILITAS) {
      // Seluruh PKP kena 11%
      const pph = pkp * TARIF_FASILITAS;
      pphTerutang = pph;
      breakdown = [
        { label: 'PKP Fasilitas (Omzet ≤ Rp 4,8 M → seluruh PKP @ 11%)', basis: pkp, rate: TARIF_FASILITAS, pph },
      ];
      badgeText   = 'Pasal 31E — Tarif Fasilitas 11% (Omzet ≤ Rp 4,8 M)';
      regulasiText = 'UU PPh Pasal 31E · UU HPP No.7/2021 · Seluruh PKP mendapat tarif fasilitas 11% karena omzet ≤ Rp 4,8 Miliar.';
    } else if (omzet <= BATAS_FASILITAS) {
      // Proporsional: PKP Fasilitas = PKP × (4,8 M / Omzet)
      const pkpFasilitas    = Math.floor((pkp * (BATAS_FULL_FASILITAS / omzet)) / 1000) * 1000;
      const pkpNonFasilitas = pkp - pkpFasilitas;
      const pphFasilitas    = pkpFasilitas * TARIF_FASILITAS;
      const pphNormal       = pkpNonFasilitas * TARIF_NORMAL;
      pphTerutang = pphFasilitas + pphNormal;
      breakdown = [
        {
          label: `PKP Fasilitas = PKP × (Rp 4,8 M / Omzet) = ${formatRupiah(pkp)} × ${((BATAS_FULL_FASILITAS / omzet) * 100).toFixed(2)}% @ 11%`,
          basis: pkpFasilitas, rate: TARIF_FASILITAS, pph: pphFasilitas,
        },
        {
          label: `PKP Non-Fasilitas = PKP − PKP Fasilitas @ 22%`,
          basis: pkpNonFasilitas, rate: TARIF_NORMAL, pph: pphNormal,
        },
      ];
      badgeText   = 'Pasal 31E — Tarif Campuran (Proporsional)';
      regulasiText = `UU PPh Pasal 31E · UU HPP No.7/2021 · Omzet Rp ${(omzet/1e9).toFixed(2)} M (Rp 4,8 M &lt; Omzet ≤ Rp 50 M) → PKP dibagi proporsional: ${formatRupiah(pkpFasilitas)} @ 11% + ${formatRupiah(pkpNonFasilitas)} @ 22%.`;
    } else {
      // Omzet > 50 M: tidak dapat fasilitas
      const pph = pkp * TARIF_NORMAL;
      pphTerutang = pph;
      breakdown = [
        { label: 'PKP Non-Fasilitas (Omzet > Rp 50 M → tarif umum 22%)', basis: pkp, rate: TARIF_NORMAL, pph },
      ];
      badgeText   = 'Pasal 31E — Tidak Memenuhi Syarat (Omzet > Rp 50 M)';
      regulasiText = 'UU PPh Pasal 31E: omzet melampaui Rp 50 Miliar → tidak mendapat fasilitas tarif 50%. Seluruh PKP dikenakan tarif umum 22%.';
    }
  }

  // ═══════════════════════════════════════════════
  //  PASAL 17 AYAT (1) HURUF b — TARIF UMUM 22%
  // ═══════════════════════════════════════════════
  else if (pasal === '17_1b') {
    const TARIF = 0.22;
    const pph   = pkp * TARIF;
    pphTerutang = pph;
    breakdown = [
      { label: 'Seluruh PKP — Tarif Umum WP Badan 22%', basis: pkp, rate: TARIF, pph },
    ];
    badgeText   = 'Pasal 17 ayat (1) huruf b — Tarif Umum 22%';
    regulasiText = 'UU PPh Pasal 17 ayat (1) huruf b · UU HPP No.7/2021 · Berlaku sejak tahun pajak 2022. Tarif flat 22% atas seluruh PKP.';
  }

  // ═══════════════════════════════════════════════
  //  PASAL 17 AYAT (2) HURUF b — GO PUBLIC 19%
  // ═══════════════════════════════════════════════
  else if (pasal === '17_2b') {
    const TARIF = 0.19;
    const pph   = pkp * TARIF;
    pphTerutang = pph;
    breakdown = [
      { label: 'Seluruh PKP — Tarif Khusus Emiten/Tbk 19%', basis: pkp, rate: TARIF, pph },
    ];
    badgeText   = 'Pasal 17 ayat (2) huruf b — Emiten/Tbk 19%';
    regulasiText = 'UU PPh Pasal 17 ayat (2) huruf b · PP 30/2020 · PMK 40/2020 · Syarat: &gt;40% saham di BEI, ≥300 pemegang saham, tidak ada pemegang mayoritas ≥50%. Holding period ≥183 hari dalam 12 bulan.';
  }

  // ── Kredit Pajak & Kurang/Lebih Bayar ──
  const totalKredit = angsuranPph25 + kreditLain;
  const selisih     = pphTerutang - totalKredit;
  const kurangBayar = selisih > 0;
  const angsuranBrkt = Math.round(pphTerutang / 12);

  // ── Render breakdown ──
  const breakdownDiv = document.getElementById('pb-res-breakdown');
  breakdownDiv.innerHTML = '';
  breakdown.forEach(row => {
    const el = document.createElement('div');
    el.className = 'breakdown-row';
    const pctText = (row.rate * 100 % 1 === 0)
      ? `${(row.rate * 100).toFixed(0)}%`
      : `${(row.rate * 100).toFixed(1)}%`;
    el.innerHTML = `
      <span class="layer-name">${row.label}</span>
      <span class="layer-math">${pctText} × ${formatRupiah(row.basis)}</span>
      <span class="layer-val">${formatRupiah(row.pph)}</span>
    `;
    breakdownDiv.appendChild(el);
  });

  // ── Tampilkan hasil ──
  document.getElementById('pb-res-title').textContent = 'Hasil Perhitungan PPh Badan';
  document.getElementById('pb-res-badge').textContent = badgeText;
  document.getElementById('pb-res-badge').className   =
    `ppn-status-badge ${pasal === '31e' ? 'badge-ev' : pasal === '17_2b' ? 'badge-nilai-lain' : 'badge-normal'}`;

  document.getElementById('pb-res-pph-terutang').textContent = formatRupiah(pphTerutang);
  document.getElementById('pb-res-terutang2').textContent    = formatRupiah(pphTerutang);

  // Detail dasar pengenaan
  document.getElementById('pb-res-omzet').textContent = formatRupiah(omzet);
  document.getElementById('pb-res-pkp').textContent   = formatRupiah(pkp) +
    (pkpInput !== pkp ? ` (dibulatkan dari ${formatRupiah(pkpInput)})` : '');

  // Koreksi fiskal rows
  const showNeto = netoKomersial > 0;
  document.getElementById('pb-res-neto-row').style.display        = showNeto ? 'flex' : 'none';
  document.getElementById('pb-res-koreksi-pos-row').style.display = (koreksiPos > 0) ? 'flex' : 'none';
  document.getElementById('pb-res-koreksi-neg-row').style.display = (koreksiNeg > 0) ? 'flex' : 'none';
  if (showNeto) document.getElementById('pb-res-neto').textContent       = formatRupiah(netoKomersial);
  if (koreksiPos > 0) document.getElementById('pb-res-koreksi-pos').textContent = `+ ${formatRupiah(koreksiPos)}`;
  if (koreksiNeg > 0) document.getElementById('pb-res-koreksi-neg').textContent = `− ${formatRupiah(koreksiNeg)}`;

  // Kredit pajak
  document.getElementById('pb-res-kredit-25').textContent   = angsuranPph25 > 0 ? `− ${formatRupiah(angsuranPph25)}` : 'Rp 0';
  document.getElementById('pb-res-kredit-lain').textContent = kreditLain    > 0 ? `− ${formatRupiah(kreditLain)}`    : 'Rp 0';

  // Kurang / Lebih Bayar
  const kbLabel  = kurangBayar ? 'PPh Pasal 29 (Kurang Bayar — Setor sebelum SPT)' : 'PPh Pasal 28A (Lebih Bayar — Restitusi/Kompensasi)';
  const kbVal    = formatRupiah(Math.abs(selisih));
  document.getElementById('pb-res-kb-label').textContent  = kbLabel;
  document.getElementById('pb-res-kb-val').textContent    = kbVal;
  document.getElementById('pb-res-kb-val').className      = kurangBayar ? 'text-danger' : 'text-success';
  document.getElementById('pb-res-kb-label2').textContent = kbLabel;
  document.getElementById('pb-res-kb-val2').textContent   = kbVal;
  document.getElementById('pb-res-kb-val2').className     = kurangBayar ? 'text-danger' : 'text-success';
  document.getElementById('pb-res-kb-box').style.display  = (angsuranPph25 > 0 || kreditLain > 0) ? 'flex' : 'none';

  // Angsuran berikutnya
  document.getElementById('pb-res-angsuran-berikut').textContent = formatRupiah(angsuranBrkt) + '/bulan';

  // Regulasi
  document.getElementById('pb-res-regulasi').innerHTML =
    `<i class="fa-solid fa-scale-balanced"></i> ${regulasiText}`;

  // Tampilkan jika PKP dihitung otomatis
  if (pkpFromAutoCalc) {
    document.getElementById('pb-pkp').value = Math.round(pkpAuto).toLocaleString('id-ID').replace(/,/g, '.');
  }

  showResult('pb-result-content', 'pb-result-card');
});

document.getElementById('pb-btn-reset').addEventListener('click', () => {
  ['pb-omzet','pb-pkp','pb-neto-komersial','pb-koreksi-positif',
   'pb-koreksi-negatif','pb-pph25','pb-kredit-lain'].forEach(id => {
    document.getElementById(id).value = '';
  });
  hideResult('pb-result-content', 'pb-result-card');
});

// ===================== KAMUS TER =====================
const kamusKategoriSelect = document.getElementById('kamus-kategori-select');
const kamusSearchInput = document.getElementById('kamus-search-input');
const kamusTableBody = document.getElementById('kamus-table-body');
const kamusLiveRateBadge = document.getElementById('kamus-live-rate-badge');
const kamusLiveRateVal = document.getElementById('kamus-live-rate-val');

kamusKategoriSelect.addEventListener('change', renderKamusTable);
kamusSearchInput.addEventListener('input', renderKamusTable);

function renderKamusTable() {
  const category = kamusKategoriSelect.value;
  const searchVal = parseRupiah(kamusSearchInput.value);
  const rows = TER_DATABASE[category];

  document.getElementById('kamus-table-title').textContent = `Daftar Lapisan Tarif TER Kategori ${category}`;
  kamusTableBody.innerHTML = '';
  let matchIndex = -1;

  if (searchVal > 0) {
    for (let i = 0; i < rows.length; i++) {
      if (searchVal <= rows[i].max) { matchIndex = i; break; }
    }
  }

  rows.forEach((row, index) => {
    const tr = document.createElement('tr');
    if (index === matchIndex) tr.className = 'active-lookup';

    let rangeText = '';
    const prevMax = index === 0 ? 0 : rows[index - 1].max;
    if (row.max === Infinity) rangeText = `> ${formatRupiah(prevMax)}`;
    else if (index === 0) rangeText = `≤ ${formatRupiah(row.max)}`;
    else rangeText = `> ${formatRupiah(prevMax)} s.d. ${formatRupiah(row.max)}`;

    tr.innerHTML = `<td>${index + 1}</td><td>${rangeText}</td><td><strong>${row.rate}%</strong></td>`;
    kamusTableBody.appendChild(tr);
  });

  if (matchIndex !== -1) {
    kamusLiveRateVal.textContent = `${rows[matchIndex].rate}%`;
    kamusLiveRateBadge.classList.remove('hidden');
    setTimeout(() => {
      const activeRow = kamusTableBody.querySelector('.active-lookup');
      if (activeRow) activeRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  } else {
    kamusLiveRateBadge.classList.add('hidden');
  }
}

// ===================== INIT =====================
document.addEventListener('DOMContentLoaded', () => {
  loadSavedMode();
  loadSavedTheme();
  renderKamusTable();
});

// Also run immediately in case DOMContentLoaded already fired
loadSavedMode();
loadSavedTheme();
