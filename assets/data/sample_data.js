/**
 * HPRI LA Homeless Count Data — Real production data
 * Source: USC HPRI / Amanda Landrian Gonzalez
 * Greater Los Angeles Homeless Count 2019-2025 (no 2021)
 *
 * All totals use TotMem_sum summed across ALL household types (hhold_type 1+2).
 * City = city=1 rows in street_estimates_all_city files.
 * SPA 1–8 = SPA id rows in street_estimates_all_spa files.
 * Updated per Amanda Landrian Gonzalez review, June 2026.
 */

const YEARS = [2019, 2020, 2022, 2023, 2024, 2025];

const HARMONIZATION_NOTES = {
  chronic: { breakYear: 2022, note: "The disability question structure changed in 2022, affecting the chronic homelessness flag. Trend shows two periods: pre-2022 (solid) and 2022–present (dashed). Not directly comparable across the break." },
  race: { breakYear: 2024, note: "Race/ethnicity categories were significantly redesigned in 2024. Trend shows two periods: 2019–2023 (solid) and 2024–present (dashed). Categories are not directly comparable across the break." },
  age_early: { breakYear: 2023, note: "Age bands for 2020–2022 are approximate: sub-bands were mapped to standard 10-year groups. The 35–44 band cannot be isolated for 2020–2022 due to source data groupings. 2019 age data is not available at the 10-year level." }
};

const DATA = {

  total: {
    label: "Total Unsheltered Adults",
    harmonization: null,
    geographies: {
      // CoC: TotMem_sum summed across both hhold_types from street_estimates_all_CoC
      coc: { label: "LA Continuum of Care", estimate: [40279,43505,44850,50156,48216,43073], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      // City: TotMem_sum for city=1 (both hhold_types) from street_estimates_all_city
      city: { label: "City of Los Angeles", estimate: [25766,27062,27964,31993,28495,26139], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      // SPAs: TotMem_sum per SPA id (both hhold_types) from street_estimates_all_spa
      spa1: { label: "SPA 1 — Antelope Valley",    estimate: [2047,3725,3521,3626,5331,5226], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa2: { label: "SPA 2 — San Fernando Valley", estimate: [5759,5707,6722,7721,6750,6538], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa3: { label: "SPA 3 — San Gabriel Valley",  estimate: [3271,2982,2939,3039,3592,3119], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa4: { label: "SPA 4 — Metro Los Angeles",   estimate: [11827,12000,12887,12633,11848,10084], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa5: { label: "SPA 5 — West Side",           estimate: [3957,4728,3450,5131,4088,3706], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa6: { label: "SPA 6 — South",               estimate: [6117,7460,8817,8364,8383,7907], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa7: { label: "SPA 7 — East LA",             estimate: [3773,3445,3191,4298,4258,3042], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      spa8: { label: "SPA 8 — South Bay",           estimate: [3528,3458,3323,5344,3966,3451], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
    }
  },

  // Age 18–24: Mem1824_sum (all hhold_types, CoC file)
  age_1824: {
    label: "Age 18–24",
    harmonization: null,
    geographies: { coc: { label: "LA CoC", estimate: [29,172,29,155,102,91], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  // Age 25–34: Mem25p_age_2534_estn (2023+); approx Mem25p_age_2529+age_3039 for 2020/2022; N/A 2019
  age_2534: {
    label: "Age 25–34",
    harmonization: "age_early",
    geographies: { coc: { label: "LA CoC", estimate: [null,13838,15989,10049,10023,8219], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  // Age 35–44: Mem25p_age_3544_estn (2023+); not isolatable from 2019–2022 sub-bands
  age_3544: {
    label: "Age 35–44",
    harmonization: "age_early",
    geographies: { coc: { label: "LA CoC", estimate: [null,null,null,13562,11606,11767], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  // Age 45–54: Mem25p_age_4554_estn (2023+); approx age_4049+age_5054 for 2020/2022
  age_4554: {
    label: "Age 45–54",
    harmonization: "age_early",
    geographies: { coc: { label: "LA CoC", estimate: [null,16127,16189,11054,11739,10215], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  // Age 55–64: Mem25p_age_5564_estn (2023+); approx age_5559+age_6061+age_6264 for 2020/2022
  age_5564: {
    label: "Age 55–64",
    harmonization: "age_early",
    geographies: { coc: { label: "LA CoC", estimate: [null,9494,8693,10351,10103,7496], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },
  // Age 65+: Mem25p_age_65p_estn (2023+); approx age_6569+age_7079+age_80p for 2020/2022
  age_65plus: {
    label: "Age 65+",
    harmonization: "age_early",
    geographies: { coc: { label: "LA CoC", estimate: [null,2594,3189,3491,3279,3572], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] } }
  },

  // Race/Ethnicity
  // 2019–2023: Mem25p_Hispanic_estn, Mem25p_black_estn, Mem25p_white_estn (all hhold_types)
  // 2024–2025: Mem25p_hd_hispanic_estn, Mem25p_hd_black_estn, Mem25p_hd_white_estn (redesigned)
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

  // Gender
  // 2019–2023: Mem25p_male_estn, Mem25p_female_estn, Mem25p_transgender_estn
  // 2024–2025: Mem25p_hd_man_estn, Mem25p_hd_woman_estn (new categories — not directly comparable)
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

  // Veterans: Mem25p_sumvet_estn from street_estimates_vet_CoC files
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

  // Chronic: TotMem_sumChronicHH_estn (all household types, CoC file)
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
