/**
 * HPRI LA Homeless Count Data — Real production data
 * Source: USC HPRI / Amanda Landrian Gonzalez
 * Greater Los Angeles Homeless Count 2019–2025 (no 2021 — cancelled due to COVID-19)
 *
 * All estimates sum across all three age bands: MemU18 + Mem1824 + Mem25p
 * (per Amanda Landrian Gonzalez guidance, June 2026)
 *
 * Population totals verified against official estimates spreadsheet
 * (Overview_of_2018-2026_Multipliers_and_Estimates_20260429.xlsx, row 9).
 *
 * Race/ethnicity methodology note:
 *   2019–2023: "Hispanic" = Mem__Hispanic_estn; "Black" = Mem__black_estn (alone);
 *              "White" = Mem__white_estn (includes Hispanic white)
 *   2024–2025: Redesigned _hd_ columns. "Hispanic" = Mem__hd_hispanic_estn;
 *              "Black" = Mem__hd_black_estn (alone, not Black+other combinations);
 *              "White" = Mem__hd_white_estn
 *   Categories are NOT directly comparable across the 2024 break.
 */

const YEARS = [2019, 2020, 2022, 2023, 2024, 2025];

const HARMONIZATION_NOTES = {
  chronic: {
    breakYear: 2022,
    note: "The disability question structure changed in 2022, affecting the chronic homelessness determination. Pre-2022 data (solid line) used a different operationalization and are not directly comparable to 2022–present (dashed line)."
  },
  race: {
    breakYear: 2024,
    note: "Race/ethnicity categories were significantly redesigned in 2024. 2019–2023 (solid line) used legacy categories; 2024–present (dashed line) use a new question design. Key changes: (1) Hispanic/Latino is now a racial category rather than ethnicity; (2) a new Middle Eastern/North African category was added; (3) Black 'alone or in combination' is captured differently. The sharp decline in Black and White counts after 2023 reflects this redesign, not a real-world change."
  }
};

const DATA = {

  // ── TOTALS ─────────────────────────────────────────────────────────────────
  // Source: TotMem_sum (all household types) — verified against official estimates spreadsheet
  total: {
    label: "Total Unsheltered Adults",
    harmonization: null,
    geographies: {
      coc:  { label: "LA Continuum of Care",      estimate: [40279,43505,44850,50156,48216,43073], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      city: { label: "City of Los Angeles",        estimate: [25151,27244,27964,31994,28495,26139], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa1: { label: "SPA 1 — Antelope Valley",    estimate: [2047, 3725, 3521, 3626, 5331, 5226],  lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa2: { label: "SPA 2 — San Fernando Valley",estimate: [5759, 5707, 6722, 7721, 6750, 6538],  lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa3: { label: "SPA 3 — San Gabriel Valley", estimate: [3271, 2982, 2939, 3039, 3592, 3119],  lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa4: { label: "SPA 4 — Metro Los Angeles",  estimate: [11827,12000,12887,12633,11848,10084], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa5: { label: "SPA 5 — West Side",          estimate: [3957, 4728, 3450, 5131, 4088, 3706],  lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa6: { label: "SPA 6 — South",              estimate: [6117, 7460, 8817, 8364, 8383, 7907],  lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa7: { label: "SPA 7 — East LA",            estimate: [3773, 3445, 3191, 4298, 4258, 3042],  lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa8: { label: "SPA 8 — South Bay",          estimate: [3528, 3458, 3323, 5344, 3966, 3451],  lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
    }
  },

  // ── AGE GROUPS ─────────────────────────────────────────────────────────────
  // Bands: under 18, 18-24, 25-54, 55-61, 62+ (per Amanda's guidance)
  // Under 18 = MemU18_sum; 18-24 = Mem1824_sum
  // 25-54: age_2554_estn (2019/2020/2022) | age_2534+age_3544+age_4554 (2023+)
  // 55-61: age_5561_estn (2019) | ageband_5559+ageband_6061 (2020+)
  // 62+: age_62p_estn (2019) | ageband_6264+ageband_6569+ageband_7079+ageband_80p (2020+)
  age_u18: {
    label: "Under 18",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [736,1280,761,1494,1364,1713], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_1824: {
    label: "Age 18–24",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [29,172,29,155,102,91], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_2554: {
    label: "Age 25–54",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [28168,29964,32151,34665,33368,30201], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_5561: {
    label: "Age 55–61",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [7083,7111,6789,7586,7900,5494], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_62plus: {
    label: "Age 62+",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [4263,4977,5094,4490,3479,3572], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },

  // ── RACE / ETHNICITY ───────────────────────────────────────────────────────
  // All estimates sum MemU18 + Mem1824 + Mem25p for each racial/ethnic group
  // 95% CI columns available and included
  race_hispanic: {
    label: "Hispanic / Latino",
    harmonization: "race",
    geographies: { coc: { label: "LA CoC",
      estimate: [14749,15554,20642,21244,19561,18516],
      lower95:  [12762,13876,18146,19308,17586,16516],
      upper95:  [16739,17231,23141,23183,21534,20520]
    }}
  },
  race_black: {
    label: "Black / African American",
    harmonization: "race",
    geographies: { coc: { label: "LA CoC",
      estimate: [15661,18618,19611,21588,11907,9446],
      lower95:  [13280,16515,16647,18618, 9947,7670],
      upper95:  [18040,20718,22576,24557,13863,11221]
    }}
  },
  race_white: {
    label: "White",
    harmonization: "race",
    geographies: { coc: { label: "LA CoC",
      estimate: [19531,20786,20256,18876,11401,9040],
      lower95:  [17561,18760,17402,15689, 9802,7894],
      upper95:  [21500,22808,23234,22060,13007,10187]
    }}
  },

  // ── GENDER ─────────────────────────────────────────────────────────────────
  // All estimates sum MemU18 + Mem1824 + Mem25p
  // 2024-2025 use _hd_man/_hd_woman columns
  male: {
    label: "Male",
    harmonization: null,
    geographies: { coc: { label: "LA CoC",
      estimate: [28692,31733,32446,36269,33928,30950],
      lower95:  [27731,30611,31320,34758,32611,29741],
      upper95:  [29656,32855,33571,37780,35243,32163]
    }}
  },
  female: {
    label: "Female",
    harmonization: null,
    geographies: { coc: { label: "LA CoC",
      estimate: [10573,11095,11059,12518,13036,11429],
      lower95:  [ 9620, 9977, 9882,11188,11751,10216],
      upper95:  [11523,12213,12238,13848,14320,12642]
    }}
  },
  transgender: {
    label: "Transgender / Non-binary",
    harmonization: null,
    geographies: { coc: { label: "LA CoC",
      estimate: [857,608,728,871,null,78],
      lower95:  [null,null,null,null,null,null],
      upper95:  [null,null,null,null,null,null]
    }}
  },

  // ── VETERAN STATUS ─────────────────────────────────────────────────────────
  // Source: Mem25p_sumvet_estn from street_estimates_vet_CoC files
  veteran: {
    label: "Veterans",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [2799,2804,2702,2777,2029,2472], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
    }
  },

  // ── CHRONIC HOMELESSNESS ───────────────────────────────────────────────────
  // Source: TotMem_sumChronicHH_estn / _estlo / _esthi (all household types)
  chronic: {
    label: "Chronically Homeless",
    harmonization: "chronic",
    geographies: { coc: { label: "LA CoC",
      estimate: [13321,21407,21888,26121,24145,20776],
      lower95:  [11545,19541,20087,24347,22426,19158],
      upper95:  [15097,23273,23688,27894,25864,22394]
    }}
  },
};

const DATA_LIBRARY = [
  { year: 2025, type: "Unsheltered Adult Survey", n: "~3,800", format: "CSV", notes: "Design weights + jackknife replicate weights; race/ethnicity 2024 redesign" },
  { year: 2024, type: "Unsheltered Adult Survey", n: "~3,600", format: "CSV", notes: "Race/ethnicity redesigned; design weights + jackknife replicate weights" },
  { year: 2023, type: "Unsheltered Adult Survey", n: "~3,900", format: "CSV", notes: "Design weights + jackknife replicate weights" },
  { year: 2022, type: "Unsheltered Adult Survey", n: "~3,500", format: "CSV", notes: "Disability definition changed; design weights + jackknife replicate weights" },
  { year: 2020, type: "Unsheltered Adult Survey", n: "~3,700", format: "Excel", notes: "Design weights + jackknife replicate weights" },
  { year: 2019, type: "Unsheltered Adult Survey", n: "~3,400", format: "Excel", notes: "Earliest year in current jackknife methodology" }
];
