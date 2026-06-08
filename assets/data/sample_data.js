/**
 * HPRI LA Homeless Count Data — Real production data
 * Source: USC HPRI / Amanda Landrian Gonzalez
 * Greater Los Angeles Homeless Count 2019-2025 (no 2021)
 *
 * Totals reflect TotMem_sum from street_estimates_all_CoC files
 * (all household types, per Amanda Landrian Gonzalez correction June 2026)
 *
 * Demographic estimates use Mem25p + Mem1824 + MemU18 sub-group columns.
 * For 2024-2025, race/ethnicity and gender columns changed to _hd_ format.
 */

const YEARS = [2019, 2020, 2022, 2023, 2024, 2025];

const HARMONIZATION_NOTES = {
  chronic: { breakYear: 2022, note: "The disability question structure changed in 2022, affecting the chronic homelessness flag. Trend shows two periods: pre-2022 (solid) and 2022–present (dashed). Not directly comparable across the break." },
  race: { breakYear: 2024, note: "Race/ethnicity categories were significantly redesigned in 2024. Trend shows two periods: 2019–2023 (solid) and 2024–present (dashed). Categories are not directly comparable across the break." }
};

const DATA = {

  total: {
    label: "Total Unsheltered Adults",
    harmonization: null,
    geographies: {
      coc: { label: "LA Continuum of Care", estimate: [40279,43505,44850,50156,48216,43073], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      city: { label: "City of Los Angeles", estimate: [24756,25581,27185,30380,26900,24231], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa1: { label: "SPA 1 — Antelope Valley", estimate: [1897,3522,3328,3325,4991,4802], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa2: { label: "SPA 2 — San Fernando Valley", estimate: [5704,5358,6498,7278,6336,6044], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa3: { label: "SPA 3 — San Gabriel Valley", estimate: [3241,2834,2876,2927,3455,2928], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa4: { label: "SPA 4 — Metro Los Angeles", estimate: [11404,11465,12614,12179,11335,9511], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa5: { label: "SPA 5 — West Side", estimate: [3733,4495,3362,4895,3866,3456], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa6: { label: "SPA 6 — South", estimate: [5806,6909,8492,7815,7828,7179], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa7: { label: "SPA 7 — East LA", estimate: [3727,3221,3086,4086,4074,2783], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa8: { label: "SPA 8 — South Bay", estimate: [3400,3224,3201,4960,3674,3121], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
    }
  },

  // Age groups — Mem25p_age_XXXX_estn summed across all hhold_types
  // Note: 2019/2020/2022 files do not include age breakdowns for 25+ cohort;
  // only 2023–2025 have Mem25p_age_XXXX_estn columns.
  age_1824: {
    label: "Age 18–24",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [29,172,29,155,102,91], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_2534: {
    label: "Age 25–34",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [null,null,null,10049,10023,8219], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_3544: {
    label: "Age 35–44",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [null,null,null,13562,11606,11767], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_4554: {
    label: "Age 45–54",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [null,null,null,11054,11739,10215], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_5564: {
    label: "Age 55–64",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [null,null,null,10351,10103,7496], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_65plus: {
    label: "Age 65+",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [null,null,null,3491,3279,3572], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },

  // Race/Ethnicity — 2019–2023: Mem25p_Hispanic_estn / Mem25p_black_estn / Mem25p_white_estn
  // 2024–2025: Mem25p_hd_hispanic_estn / Mem25p_hd_black_estn / Mem25p_hd_white_estn (redesigned categories)
  race_hispanic: {
    label: "Hispanic / Latino",
    harmonization: "race",
    geographies: { coc: { label: "LA CoC", estimate: [14448,14956,20168,20541,19001,17537], lower95: [12433,13237,17756,18611,null,null], upper95: [15989,15829,21849,21576,null,null] } }
  },
  race_black: {
    label: "Black / African American",
    harmonization: "race",
    geographies: { coc: { label: "LA CoC", estimate: [15258,17555,19119,20889,11252,8900], lower95: [12794,15010,16297,17997,null,null], upper95: [17087,18598,21184,22892,null,null] } }
  },
  race_white: {
    label: "White (non-Hispanic)",
    harmonization: "race",
    geographies: { coc: { label: "LA CoC", estimate: [19355,20468,20032,18343,11322,8935], lower95: [10317,11950,9572,8998,null,null], upper95: [12633,14256,12215,11690,null,null] } }
  },

  // Gender — 2019–2023: Mem25p_male_estn / _female_estn / _transgender_estn
  // 2024–2025: Mem25p_hd_man_estn / _hd_woman_estn / _hd_trans_estn + _hd_non_bin_estn
  male: {
    label: "Male",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [28312,30986,32085,35458,33264,30146], lower95: [27173,29665,30835,33695,null,null], upper95: [28854,31251,32784,36190,null,null] } }
  },
  female: {
    label: "Female",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [10188,10396,10646,11689,12266,10443], lower95: [9055,9109,9309,10089,null,null], upper95: [10714,10693,11344,12229,null,null] } }
  },
  transgender: {
    label: "Transgender / Non-binary",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [857,603,719,869,null,null], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },

  veteran: {
    label: "Veterans",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [2799,2804,2702,2777,2029,2472], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
    }
  },
  nonveteran: {
    label: "Non-Veterans",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [null,null,null,null,null,null], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
    }
  },

  // Chronic — TotMem_sumChronicHH_estn (all household types)
  chronic: {
    label: "Chronically Homeless",
    harmonization: "chronic",
    geographies: { coc: { label: "LA CoC", estimate: [13321,21407,21888,26121,24145,20776], lower95: [11556,19300,19948,24092,22198,18730], upper95: [14728,22295,23062,26816,24621,21140] } }
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
