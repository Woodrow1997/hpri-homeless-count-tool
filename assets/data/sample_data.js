/**
 * HPRI Homeless Count Data — REAL DATA
 * Source: USC HPRI / Amanda Landrian Gonzalez
 * Greater Los Angeles Homeless Count, 2019-2025 (no count in 2021)
 * Estimates: unsheltered adults, design-weighted with jackknife replicate weights
 * Generated: June 2026
 */

const YEARS = [2019, 2020, 2022, 2023, 2024, 2025];

const HARMONIZATION_NOTES = {
  chronic: {
    breakYear: 2022,
    note: "The disability question structure changed in 2022, affecting the chronic homelessness flag. Trend lines are shown in two segments (pre-2022 and 2022–present)."
  },
  race: {
    breakYear: 2024,
    note: "Race/ethnicity categories were significantly redesigned in 2024. Trend lines are shown in two segments (2019–2023 and 2024–present). Categories are not directly comparable across the break."
  }
};

const DATA = {

  total: {
    label: "Total Unsheltered Adults",
    harmonization: null,
    geographies: {
      coc: {
        label: "LA Continuum of Care",
        estimate: [38912,41028,43457,47465,45559,39824],
        lower95: [null,null,null,null,null,null],
        upper95: [null,null,null,null,null,null]
      },
      city: {
        label: "City of Los Angeles",
        estimate: [24756,25581,27185,30380,26900,24231],
        lower95: [null,null,null,null,null,null],
        upper95: [null,null,null,null,null,null]
      },
      spa: {
        1: { label: "SPA 1 — Antelope Valley", estimate: [1897,3522,3328,3325,4991,4802], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
        2: { label: "SPA 2 — San Fernando Valley", estimate: [5704,5358,6498,7278,6336,6044], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
        3: { label: "SPA 3 — San Gabriel Valley", estimate: [3241,2834,2876,2927,3455,2928], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
        4: { label: "SPA 4 — Metro Los Angeles", estimate: [11404,11465,12614,12179,11335,9511], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
        5: { label: "SPA 5 — West Side", estimate: [3733,4495,3362,4895,3866,3456], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
        6: { label: "SPA 6 — South", estimate: [5806,6909,8492,7815,7828,7179], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
        7: { label: "SPA 7 — East LA", estimate: [3727,3221,3086,4086,4074,2783], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
        8: { label: "SPA 8 — South Bay", estimate: [3400,3224,3201,4960,3674,3121], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] },
      }
    }
  },

  age_1824: {
    label: "Age 18–24",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [0,2,5,8,7,3], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] }
    }
  },
  age_2534: {
    label: "Age 25–34",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [null,null,null,9627,9620,7736], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] }
    }
  },
  age_3544: {
    label: "Age 35–44",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [null,null,null,13327,11135,11216], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] }
    }
  },
  age_4554: {
    label: "Age 45–54",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [null,null,null,10874,11504,9955], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] }
    }
  },
  age_5564: {
    label: "Age 55–64",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [null,null,null,10204,10030,7391], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] }
    }
  },
  age_65plus: {
    label: "Age 65+",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [null,null,null,3425,3263,3523], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] }
    }
  },
  race_hispanic: {
    label: "Hispanic / Latino",
    harmonization: "race",
    geographies: {
      coc: { label: "LA CoC", estimate: [14211,14533,19802,20093,18544,16747], lower95: [12433,13237,17756,18611,16958,15213], upper95: [15989,15829,21849,21576,20128,18284] }
    }
  },
  race_black: {
    label: "Black / African American",
    harmonization: "race",
    geographies: {
      coc: { label: "LA CoC", estimate: [14941,16804,18740,20444,10716,8463], lower95: [12794,15010,16297,17997,9216,7232], upper95: [17087,18598,21184,22892,12216,9694] }
    }
  },
  race_white: {
    label: "White (non-Hispanic)",
    harmonization: "race",
    geographies: {
      coc: { label: "LA CoC", estimate: [11476,13102,10894,10344,11258,8852], lower95: [10317,11950,9572,8998,9800,7798], upper95: [12633,14256,12215,11690,12717,9905] }
    }
  },
  male: {
    label: "Male",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [28013,30458,31809,34943,null,null], lower95: [27173,29665,30835,33695,null,null], upper95: [28854,31251,32784,36190,null,null] }
    }
  },
  female: {
    label: "Female",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [9885,9901,10326,11159,null,null], lower95: [9055,9109,9309,10089,null,null], upper95: [10714,10693,11344,12229,null,null] }
    }
  },
  transgender: {
    label: "Transgender / Non-binary",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [857,600,712,868,null,null], lower95: [409,368,447,461,null,null], upper95: [1305,833,976,1275,null,null] }
    }
  },
  veteran: {
    label: "Veterans",
    harmonization: null,
    geographies: {
      coc: { label: "LA CoC", estimate: [2768,2792,2677,2762,2026,2470], lower95: [null,null,null,null,null,null], upper95: [null,null,null,null,null,null] }
    }
  },
  chronic: {
    label: "Chronically Homeless",
    harmonization: "chronic",
    geographies: {
      coc: { label: "LA CoC", estimate: [13142,20798,21505,25454,23410,19935], lower95: [11556,19300,19948,24092,22198,18730], upper95: [14728,22295,23062,26816,24621,21140] }
    }
  },
};

const DATA_LIBRARY = [
  { year: 2025, type: "Unsheltered Adult Survey", n: "~3,800", format: "CSV", notes: "Design weights + jackknife replicate weights; race/ethnicity 2024 redesign" },
  { year: 2024, type: "Unsheltered Adult Survey", n: "~3,600", format: "CSV", notes: "Design weights + jackknife replicate weights; race/ethnicity redesigned" },
  { year: 2023, type: "Unsheltered Adult Survey", n: "~3,900", format: "CSV", notes: "Design weights + jackknife replicate weights" },
  { year: 2022, type: "Unsheltered Adult Survey", n: "~3,500", format: "CSV", notes: "Design weights + jackknife replicate weights; disability definition changed" },
  { year: 2020, type: "Unsheltered Adult Survey", n: "~3,700", format: "Excel", notes: "Design weights + jackknife replicate weights" },
  { year: 2019, type: "Unsheltered Adult Survey", n: "~3,400", format: "Excel", notes: "Earliest year in current jackknife methodology" }
];
