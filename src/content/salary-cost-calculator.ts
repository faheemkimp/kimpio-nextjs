/**
 * /salary-cost-calculator/ copy, taken verbatim from the live page
 * (WordPress template "template-cost-calculator.php" and its script),
 * including the live wording of every step.
 *
 * SEO parity (SEO-URL-AUDIT.md, section 4): title, robots, canonical, OG and
 * schema come from Yoast for this exact URL. Heading text and levels mirror
 * live: no <h1>; the hero, the step title, the requirements title, the three
 * result columns and "Long Term Cost" are <h2>; the designer-type cards are
 * <h4>. Live repeats the result headings in separate desktop and mobile
 * blocks; here one responsive block shows each heading once.
 *
 * Salaries and exchange rates are NOT kept here: they are read from the
 * WordPress JSON files the live calculator uses (see lib/wp/salary-data.ts).
 */

export const PATH = "/salary-cost-calculator/";

export const CALC_HERO = {
  eyebrow: "Salary Cost Calculator",
  /* Rendered "Unlock Big Savings" + line break + "On Design Projects": same text as the live <h2>. */
  title: { lead: "Unlock Big Savings", highlight: "On Design Projects" },
  intro:
    "Not using KIMP yet? Chances are you're spending way more than you need to on designs. Find out how much you could be saving.",
  marquee: ["Unlock Big Savings", "KIMP", "Freelance", "In-House", "Long Term Cost"],
  strip: ["Freelance vs. KIMP", "In-house vs. KIMP", "Local salary data", "Long-term cost", "Instant results"],
  mascot: { src: "/images/mascot/inner/salary-cost-calculator.webp", width: 1448, height: 1086 },
} as const;

export type DesignerType = "Freelance" | "In-House";
export type StepId = 1 | 2 | 3 | 4;

/** Title + description shown above the calculator for each step (live #step-title / #step-description). */
export const CALC_STEPS: Record<StepId, { label: string; title: string; description: string }> = {
  1: {
    label: "Select Location",
    title: "Your Location",
    description: "Let us know where you're based. We'll calculate your savings basded on local costs.",
  },
  2: {
    label: "Type of Designer",
    title: "Type of Designer",
    description: "How do you currently get your designs completed? Let us know below.",
  },
  3: {
    label: "Requirements",
    title: "Your Requirements",
    description: "Tell us about the requirements for the designers you work with below.",
  },
  4: {
    label: "Cost Comparison",
    title: "Cost Comparison",
    description: "We've got the results below! Find out how much you could be saving.",
  },
};

export const CALC_LOCATION = {
  placeholder: "Search for country",
  next: "Next",
  required: "Please choose your country.",
};

export const CALC_DESIGNER_TYPES: { type: DesignerType; title: string; body: string }[] = [
  {
    type: "Freelance",
    title: "FREELANCE",
    body: "Select this option if you are working with designers using platforms such as Fiverr, Upwork, etc. This workflow includes hiring desingners on a project basis.",
  },
  {
    type: "In-House",
    title: "IN-HOUSE",
    body: "Select this option if you hire designers on a part-time of full-time basis, to work on your design projects. This work flow involves assuming ongoing costs.",
  },
];
export const CALC_CHOOSE = "Choose";
/** Live <h4> above the designer-type options. */
export const CALC_PREFERENCE = "Preference";

export const CALC_FORM = {
  intro:
    "Lets us know a few more details about your design workflow. We'll then calculate your savings with as much accuracy as possible.",
  country: "Country:",
  seniority: {
    label: "Designer's Required Seniority Level",
    options: [
      { value: "moderate", label: "Moderate Level" },
      { value: "senior", label: "Senior Level" },
    ],
  },
  /** Freelance only. The value multiplies both costs, as on live. */
  hours: {
    label: "Design Hours Required Per Month",
    options: [
      { value: "1", label: "20 - 50 hours" },
      { value: "2", label: "51 - 100 hours" },
      { value: "3", label: "101 - 150 hours" },
      { value: "4", label: "151 - 200 hours" },
      { value: "5", label: "201 - 250 hours" },
      { value: "6", label: "251 - 300 hours" },
    ],
  },
  management: {
    label: "Hours Spend on Project Management",
    options: [
      { value: "1", label: "1 hour" },
      { value: "2", label: "2 hours" },
      { value: "4", label: "4 hours" },
      { value: "6", label: "6 hours" },
      { value: "8", label: "8 hours" },
    ],
  },
  email: "Your Email Address",
  submit: "Calculate and Compare",
  required: "Please fill in this field.",
  invalidEmail: "Please enter a valid email address.",
  noData: "We don't have salary data for this designer type in your country yet. Please choose another option.",
} as const;

/** KIMP's price in USD, converted to the visitor's currency with the WordPress exchange rates (as live). */
export const KIMP_PRICE_USD = { monthly: 699, yearly: 8388 } as const;

export const CALC_RESULTS = {
  columns: {
    "In-House": {
      title: "IN-HOUSE DESIGNER",
      issues: [
        "Lengthy recruitment process to hire",
        "Involves on-going oversight/expenses",
        "Expertise in a specific design skillset",
        "Additional cost for a project manager",
        "Additional cost for PM software",
      ],
    },
    Freelance: {
      title: "FREELANCE DESIGNER",
      issues: [
        "Recurring hiring process",
        "Inconsistent availability",
        "Expertise in a specific design skillset",
        "Additional cost for project manager",
        "Additional cost for PM software",
      ],
    },
  } satisfies Record<DesignerType, { title: string; issues: string[] }>,
  kimp: {
    /* Live: <h2><span>KIMP</span> DESIGNER</h2>. */
    brand: "KIMP",
    title: "DESIGNER",
    perks: [
      "Hire your dedicated team in minutes",
      "Flexible, month-to-month subscription",
      "Expertise in a wide range of design types",
      "Dedicated project manager onboard",
    ],
    /* Live: <li><span>KIMP360</span> all in one PM software included</li>. */
    platformPerk: { brand: "KIMP360", text: "all in one PM software included" },
  },
  perYear: "Per Year",
  /** Live: "You could save {currency}{symbol} {amount}!". */
  savings: (currency: string, symbol: string, amount: string) => `You could save ${currency}${symbol} ${amount}!`,
  chart: {
    title: "Long Term Cost",
    periods: [
      { label: "06 Months", months: 6 },
      { label: "01 Years", months: 12 },
      { label: "03 Years", months: 36 },
    ],
    kimpLabel: "KIMP",
    designerLabel: (type: DesignerType) => `${type} Designer`,
  },
  ctas: [
    { label: "Book a Demo", href: "/book-a-call/", variant: "light" },
    { label: "Signup & Save", href: "/register-now/", variant: "primary" },
  ],
  restart: "Change answers",
} as const;

/** ISO 3166 codes for the country flags (live theme map, plus Taiwan, Turkey and Ukraine from the WordPress data). */
export const COUNTRY_CODES: Record<string, string> = {
  Argentina: "AR", Australia: "AU", Austria: "AT", Bahamas: "BS", Belgium: "BE", Bermuda: "BM", Brazil: "BR",
  Canada: "CA", "Cayman Islands": "KY", China: "CN", "Costa Rica": "CR", Croatia: "HR", Denmark: "DK",
  Estonia: "EE", Finland: "FI", France: "FR", Germany: "DE", Greece: "GR", "Hong Kong": "HK", Hungary: "HU",
  Iceland: "IS", India: "IN", Indonesia: "ID", Ireland: "IE", Israel: "IL", Italy: "IT", Jamaica: "JM",
  Latvia: "LV", Lithuania: "LT", Luxembourg: "LU", Malaysia: "MY", Mexico: "MX", Netherlands: "NL",
  "New Zealand": "NZ", Norway: "NO", Poland: "PL", Portugal: "PT", Qatar: "QA", Romania: "RO", Russia: "RU",
  "Saudi Arabia": "SA", Singapore: "SG", "South Africa": "ZA", "South Korea": "KR", Spain: "ES", Sweden: "SE",
  Switzerland: "CH", Taiwan: "TW", Thailand: "TH", "Trinidad & Tobago": "TT", Turkey: "TR", Ukraine: "UA",
  "United Arab Emirates": "AE", "United Kingdom": "GB", "United States": "US",
};
