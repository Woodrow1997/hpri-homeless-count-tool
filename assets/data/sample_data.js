/**
 * HPRI LA Homeless Count Data — Real production data
 * Source: USC HPRI / Amanda Landrian Gonzalez
 * Greater Los Angeles Homeless Count 2019-2025 (no 2021)
 *
 * Population totals sourced from official estimates spreadsheet
 * (Overview_of_2018-2026_Multipliers_and_Estimates_20260429.xlsx, row 9 of each tab)
 * per Amanda Landrian Gonzalez correction June 2026.
 *
 * Demographic estimates use street_estimates_all_CoC files.
 * Age bands per Amanda's guidance: under 18, 18-24, 25-54, 55-61, 62+
 *
 * Race/ethnicity and gender: 2019–2023 use old column format;
 * 2024–2025 use redesigned _hd_ column structure.
 */

const YEARS = [2019, 2020, 2022, 2023, 2024, 2025];

const HARMONIZATION_NOTES = {
  chronic: { breakYear: 2022, note: "The disability question structure changed in 2022, affecting the chronic homelessness flag. Trend shows two periods: pre-2022 (solid) and 2022–present (dashed). Not directly comparable across the break." },
  race: { breakYear: 2024, note: "Race/ethnicity categories were significantly redesigned in 2024. Trend shows two periods: 2019–2023 (solid) and 2024–present (dashed). Categories are not directly comparable across the break." }
};

const DATA = {

  // ── TOTALS ─────────────────────────────────────────────────────────────────
  // Source: official estimates spreadsheet, row 9 ("Unsheltered Adults"), each geography tab
  total: {
    label: "Total Unsheltered Adults",
    harmonization: null,
    geographies: {
      coc:  { label: "LA Continuum of Care",     estimate: [40279,43505,44850,50156,48216,43073], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      city: { label: "City of Los Angeles",       estimate: [25151,27244,27964,31994,28495,26139], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa1: { label: "SPA 1 — Antelope Valley",   estimate: [2047, 3725, 3521, 3626, 5331, 5226], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa2: { label: "SPA 2 — San Fernando Valley",estimate: [5759, 5707, 6722, 7721, 6750, 6538], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa3: { label: "SPA 3 — San Gabriel Valley", estimate: [3271, 2982, 2939, 3039, 3592, 3119], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa4: { label: "SPA 4 — Metro Los Angeles",  estimate: [11827,12000,12887,12633,11848,10084], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa5: { label: "SPA 5 — West Side",          estimate: [3957, 4728, 3450, 5131, 4088, 3706], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa6: { label: "SPA 6 — South",              estimate: [6117, 7460, 8817, 8364, 8383, 7907], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa7: { label: "SPA 7 — East LA",            estimate: [3773, 3445, 3191, 4298, 4258, 3042], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa8: { label: "SPA 8 — South Bay",          estimate: [3528, 3458, 3323, 5344, 3966, 3451], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
    }
  },

  // ── AGE GROUPS ─────────────────────────────────────────────────────────────
  // Bands per Amanda's guidance: under 18, 18-24, 25-54, 55-61, 62+
  // Source: MemU18_sum / Mem1824_sum / Mem25p_age_* from street_estimates_all_CoC
  // 2019 only has broad bands (age_2554, age_5561, age_62p)
  // 2020/2022 have fine ageband columns enabling all requested cuts
  // 2023+ have age_2534 / age_3544 / age_4554 / ageband_5559 / ageband_6061 / ageband_6264+

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
    // 2019/2020/2022: age_2554_estn; 2023+: age_2534+age_3544+age_4554
    geographies: { coc: { label: "LA CoC", estimate: [28168,29964,32151,34665,33368,30201], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_5561: {
    label: "Age 55–61",
    harmonization: null,
    // 2019: age_5561_estn; 2020/2022: ageband_5559+ageband_6061; 2023+: ageband_5559+ageband_6061
    geographies: { coc: { label: "LA CoC", estimate: [7083,7111,6789,7586,7900,5494], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  age_62plus: {
    label: "Age 62+",
    harmonization: null,
    // 2019: age_62p_estn; 2020/2022: ageband_6264+ageband_6569+ageband_7079+ageband_80p; 2023+: same
    geographies: { coc: { label: "LA CoC", estimate: [4263,4977,5094,4490,3479,3572], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },

  // ── RACE / ETHNICITY ───────────────────────────────────────────────────────
  // 2019–2023: Mem25p_Hispanic_estn / _black_estn / _white_estn (+ MemU18 equivalent)
  // 2024–2025: Mem25p_hd_hispanic_estn / _hd_black_estn / _hd_white_estn (redesigned)
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

  // ── GENDER ─────────────────────────────────────────────────────────────────
  // 2019–2023: Mem25p_male_estn / _female_estn / _transgender_estn
  // 2024–2025: Mem25p_hd_man_estn / _hd_woman_estn / (_hd_trans_estn + _hd_non_bin_estn + _hd_question_estn + _hd_diff_iden_estn)
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
  // Source: TotMem_sumChronicHH_estn (all household types)
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
