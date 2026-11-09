"use client";

import { ArrowRight, Building2, Check, Laptop, MapPin, RotateCcw, Search, X } from "lucide-react";
import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";

import { Eyebrow } from "@/components/home/sections/section-heading";
import { CtaLink, ctaButtonVariants } from "@/components/ui/cta-button";
import {
  CALC_CHOOSE,
  CALC_DESIGNER_TYPES,
  CALC_FORM,
  CALC_LOCATION,
  CALC_PREFERENCE,
  CALC_RESULTS,
  CALC_STEPS,
  COUNTRY_CODES,
  KIMP_PRICE_USD,
  type DesignerType,
  type StepId,
} from "@/content/salary-cost-calculator";
import type { SalaryData } from "@/lib/wp/salary-data";
import { cn } from "@/lib/utils";

const fmt = (n: number) => n.toLocaleString("en-US");
const STEP_IDS: StepId[] = [1, 2, 3, 4];
const TYPE_ICON = { Freelance: Laptop, "In-House": Building2 } as const;

function Flag({ country, className }: { country: string; className?: string }) {
  const code = COUNTRY_CODES[country]?.toLowerCase();
  if (!code) return <MapPin aria-hidden="true" className={cn("size-4 text-ink/40", className)} />;
  return (
    // eslint-disable-next-line @next/next/no-img-element -- tiny flag from flagcdn.com, as on live
    <img
      src={`https://flagcdn.com/28x21/${code}.png`}
      srcSet={`https://flagcdn.com/56x42/${code}.png 2x`}
      width={28}
      height={21}
      alt=""
      loading="lazy"
      className={cn("h-[15px] w-5 shrink-0 rounded-[3px] object-cover ring-1 ring-ink/10", className)}
    />
  );
}

type Answers = { seniority: string; hours: string; management: string; email: string };

/** Monthly/yearly figures in the visitor's currency, as the live script computes them. */
type Result = {
  currency: string;
  symbol: string;
  monthlyClient: number;
  yearlyClient: number;
  monthlyKimp: number;
  yearlyKimp: number;
  savings: number;
  type: DesignerType;
};
const EMPTY: Answers = { seniority: "", hours: "", management: "", email: "" };

/**
 * Live 4-step calculator: location, type of designer, requirements, cost
 * comparison. Same steps, fields, wording and maths as live; the salary and
 * exchange-rate figures come from WordPress (props). Every step is in the
 * HTML (inactive ones `hidden`), as on live, so all headings are present.
 */
export function SalaryCalculator({ data }: { data: SalaryData }) {
  const [step, setStep] = useState<StepId>(1);
  const [country, setCountry] = useState("");
  const [query, setQuery] = useState("");
  const [type, setType] = useState<DesignerType | null>(null);
  const [answers, setAnswers] = useState<Answers>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Answers | "country", string>>>({});
  const [result, setResult] = useState<Result | null>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const moved = useRef(false);
  const uid = useId();

  /* Every country the WordPress data covers, so the list follows the data (live hardcodes its own list). */
  const countries = useMemo(
    () => [...new Set([...Object.keys(data.freelance), ...Object.keys(data.inHouse)])].sort((a, b) => a.localeCompare(b)),
    [data],
  );
  const filtered = countries.filter((c) => c.toLowerCase().includes(query.trim().toLowerCase()));
  const tableFor = (t: DesignerType) => (t === "Freelance" ? data.freelance : data.inHouse);

  function compute(t: DesignerType, a: Answers): Result | null {
    const salary = tableFor(t)[country];
    const rate = salary && data.rates[salary.currency];
    if (!salary || !rate) return null;
    const mult = t === "Freelance" ? Number(a.hours) || 1 : 1;
    const base = a.seniority === "senior" ? salary.senior : salary.moderate;
    const monthlyClient = Math.round(base * mult);
    const yearlyClient = monthlyClient * 12;
    const monthlyKimp = Math.round(KIMP_PRICE_USD.monthly * rate * mult);
    const yearlyKimp = Math.round(KIMP_PRICE_USD.yearly * rate * mult);
    const { currency, symbol } = salary;
    return { currency, symbol, monthlyClient, yearlyClient, monthlyKimp, yearlyKimp, savings: yearlyClient - yearlyKimp, type: t };
  }

  function go(next: StepId) {
    moved.current = true;
    setStep(next);
  }

  useEffect(() => {
    if (!moved.current) return;
    const el = titleRef.current;
    if (!el) return;
    el.focus({ preventScroll: true });
    const top = el.getBoundingClientRect().top + window.scrollY - 120;
    if (Math.abs(window.scrollY - top) > 80) window.scrollTo({ top, behavior: "smooth" });
  }, [step]);

  function chooseType(t: DesignerType) {
    setType(t);
    setErrors({});
    setResult(null);
    go(3);
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    if (!type) return;
    const next: typeof errors = {};
    if (!answers.seniority) next.seniority = CALC_FORM.required;
    if (type === "Freelance" && !answers.hours) next.hours = CALC_FORM.required;
    if (!answers.management) next.management = CALC_FORM.required;
    if (!answers.email.trim()) next.email = CALC_FORM.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email.trim())) next.email = CALC_FORM.invalidEmail;
    setErrors(next);
    if (Object.keys(next).length) {
      document.getElementById(`${uid}-${Object.keys(next)[0]}`)?.focus();
      return;
    }
    setResult(compute(type, answers));
    go(4);
  }

  /** Summary shown in each stepper pill once that step is answered (as live replaces the label). */
  const summary: Record<StepId, string> = {
    1: country || CALC_STEPS[1].label,
    2: type ?? CALC_STEPS[2].label,
    3: CALC_STEPS[3].label,
    4: CALC_STEPS[4].label,
  };
  const s = CALC_STEPS[step];
  const field = (key: keyof Answers) => ({
    id: `${uid}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${uid}-${key}-err` : undefined,
  });
  const inputCls = (key: keyof Answers) =>
    cn(
      "h-12 w-full rounded-xl bg-white px-4 text-base text-ink ring-1 transition-shadow outline-none focus:ring-2 focus:ring-brand",
      errors[key] ? "ring-red-500" : "ring-border",
    );

  return (
    <section aria-labelledby={`${uid}-title`} className="relative isolate overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="fx-dots absolute inset-0 -z-10 [mask-image:radial-gradient(60%_50%_at_50%_20%,#000,transparent)]" />
      <div className="container-page">
        {/* ---------- step title (live #step-title <h2> + #step-description) ---------- */}
        <div className="mx-auto max-w-3xl text-center">
          <Eyebrow>{`Step ${step} of 4`}</Eyebrow>
          <h2
            id={`${uid}-title`}
            ref={titleRef}
            tabIndex={-1}
            aria-live="polite"
            className="mt-5 text-4xl font-bold tracking-[-0.02em] text-ink outline-none sm:text-5xl"
          >
            {s.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink/65">{s.description}</p>
        </div>

        {/* ---------- stepper ---------- */}
        <ol className="mx-auto mt-10 flex max-w-4xl flex-wrap justify-center gap-2 sm:gap-3">
          {STEP_IDS.map((id) => {
            const done = id < step;
            const active = id === step;
            const content = (
              <>
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full text-sm font-bold",
                    active ? "bg-brand text-white" : done ? "bg-teal-brand text-white" : "bg-surface text-ink/45",
                  )}
                >
                  {done ? <Check className="size-4" strokeWidth={3} aria-hidden="true" /> : id}
                </span>
                {id === 1 && country && <Flag country={country} />}
                <span className="truncate">{summary[id]}</span>
              </>
            );
            const pill = cn(
              "flex max-w-[15rem] items-center gap-2.5 rounded-full py-1.5 pr-4 pl-1.5 text-sm font-semibold ring-1 transition-colors",
              active ? "bg-white text-ink shadow-[0_8px_24px_-12px_rgb(241_115_30/0.5)] ring-brand/40" : "bg-white/70 text-ink/60 ring-border",
            );
            return (
              <li key={id} aria-current={active ? "step" : undefined}>
                {done ? (
                  <button type="button" onClick={() => go(id)} className={cn(pill, "hover:text-ink hover:ring-ink/30")}>
                    {content}
                  </button>
                ) : (
                  <span className={pill}>{content}</span>
                )}
              </li>
            );
          })}
        </ol>

        {/* ---------- step 1: location ---------- */}
        <div hidden={step !== 1} className="mx-auto mt-10 max-w-3xl">
          <div className="rounded-[2rem] bg-white p-4 ring-1 ring-ink/[0.06] shadow-[0_40px_80px_-50px_rgb(27_30_35/0.35)] sm:p-6">
            <label className="relative block">
              <span className="sr-only">{CALC_LOCATION.placeholder}</span>
              <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-ink/40" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={CALC_LOCATION.placeholder}
                aria-controls={`${uid}-countries`}
                className={cn(
                  "h-14 w-full rounded-2xl bg-surface pr-4 pl-12 text-base text-ink ring-1 outline-none focus:bg-white focus:ring-2 focus:ring-brand",
                  errors.country ? "ring-red-500" : "ring-transparent",
                )}
              />
            </label>
            <div
              id={`${uid}-countries`}
              role="radiogroup"
              aria-label={CALC_STEPS[1].label}
              className="mt-4 grid max-h-80 grid-cols-1 gap-1.5 overflow-y-auto overscroll-contain p-0.5 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((c) => {
                const on = c === country;
                return (
                  <button
                    key={c}
                    type="button"
                    role="radio"
                    aria-checked={on}
                    onClick={() => {
                      setCountry(c);
                      setErrors({});
                    }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-left text-[0.95rem] font-semibold transition-colors",
                      on ? "bg-ink text-white" : "text-ink hover:bg-surface",
                    )}
                  >
                    <Flag country={c} />
                    <span className="flex-1 truncate">{c}</span>
                    {on && <Check className="size-4 text-brand" strokeWidth={3} aria-hidden="true" />}
                  </button>
                );
              })}
              {filtered.length === 0 && <p className="col-span-full px-3 py-6 text-center text-ink/50">No matches for “{query}”.</p>}
            </div>
            <div className="mt-5 flex flex-col-reverse items-stretch gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
              <p role={errors.country ? "alert" : undefined} className={cn("text-sm font-semibold", errors.country ? "text-red-600" : "text-ink/50")}>
                {errors.country ?? (country ? <span className="inline-flex items-center gap-2"><Flag country={country} />{country}</span> : `${countries.length} countries`)}
              </p>
              <button
                type="button"
                data-click-sound=""
                onClick={() => (country ? (setErrors({}), go(2)) : setErrors({ country: CALC_LOCATION.required }))}
                className={ctaButtonVariants({ size: "lg" })}
              >
                {CALC_LOCATION.next}
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        {/* ---------- step 2: type of designer (live <h4> cards) ---------- */}
        <div hidden={step !== 2} className="mx-auto mt-10 max-w-4xl">
          {/* Live <h4>Preference</h4> heads the designer-type choices. */}
          <h4 className="mb-4 text-center text-sm font-bold tracking-[0.14em] text-ink/45 uppercase">{CALC_PREFERENCE}</h4>
          <ul className="grid gap-4 md:grid-cols-2 md:gap-5">
            {CALC_DESIGNER_TYPES.map((d) => {
              const Icon = TYPE_ICON[d.type];
              const available = !country || Boolean(tableFor(d.type)[country]);
              return (
                <li
                  key={d.type}
                  className={cn(
                    "group flex flex-col rounded-[2rem] bg-white p-7 ring-1 ring-ink/[0.06] transition-[translate,box-shadow] duration-500 sm:p-9",
                    available && "hover:-translate-y-1 hover:shadow-[0_30px_50px_-30px_rgb(27_30_35/0.35)]",
                    type === d.type && "ring-2 ring-brand",
                  )}
                >
                  <span aria-hidden="true" className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand">
                    <Icon className="size-7" />
                  </span>
                  <h4 className="mt-6 text-2xl font-bold tracking-wide text-ink">{d.title}</h4>
                  <p className="mt-3 flex-1 leading-relaxed text-ink/65">{d.body}</p>
                  {available ? (
                    <button
                      type="button"
                      data-click-sound=""
                      onClick={() => chooseType(d.type)}
                      className={cn(ctaButtonVariants({ variant: "light" }), "mt-7 self-start")}
                      aria-label={`${CALC_CHOOSE} ${d.title.toLowerCase()}`}
                    >
                      {CALC_CHOOSE}
                      <ArrowRight aria-hidden="true" />
                    </button>
                  ) : (
                    <p className="mt-7 text-sm font-semibold text-ink/50">{CALC_FORM.noData}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------- step 3: requirements ---------- */}
        <div hidden={step !== 3} className="mx-auto mt-10 max-w-2xl">
          <form noValidate onSubmit={submit} className="rounded-[2rem] bg-white p-6 ring-1 ring-ink/[0.06] shadow-[0_40px_80px_-50px_rgb(27_30_35/0.35)] sm:p-10">
            {/* Live <h2 class="designer-type">: the chosen designer type. */}
            <h2 className="text-3xl font-bold tracking-wide text-ink uppercase">{type ?? ""}</h2>
            <p className="mt-3 leading-relaxed text-ink/65">{CALC_FORM.intro}</p>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-surface px-3 py-1.5 text-sm font-semibold text-ink">
              <span className="text-ink/55">{CALC_FORM.country}</span>
              {country && <Flag country={country} />}
              {country}
            </p>

            <div className="mt-7 grid gap-5">
              <Select label={CALC_FORM.seniority.label} error={errors.seniority} errId={`${uid}-seniority-err`}>
                <select {...field("seniority")} value={answers.seniority} onChange={(e) => setAnswers({ ...answers, seniority: e.target.value })} className={inputCls("seniority")}>
                  <option value="" />
                  {CALC_FORM.seniority.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Select>
              {type === "Freelance" && (
                <Select label={CALC_FORM.hours.label} error={errors.hours} errId={`${uid}-hours-err`}>
                  <select {...field("hours")} value={answers.hours} onChange={(e) => setAnswers({ ...answers, hours: e.target.value })} className={inputCls("hours")}>
                    <option value="" />
                    {CALC_FORM.hours.options.map((o) => (
                      <option key={o.value} value={o.value}>{o.label}</option>
                    ))}
                  </select>
                </Select>
              )}
              <Select label={CALC_FORM.management.label} error={errors.management} errId={`${uid}-management-err`}>
                <select {...field("management")} value={answers.management} onChange={(e) => setAnswers({ ...answers, management: e.target.value })} className={inputCls("management")}>
                  <option value="" />
                  {CALC_FORM.management.options.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </Select>
              <Select label={CALC_FORM.email} error={errors.email} errId={`${uid}-email-err`}>
                <input
                  {...field("email")}
                  type="email"
                  autoComplete="email"
                  value={answers.email}
                  onChange={(e) => setAnswers({ ...answers, email: e.target.value })}
                  className={inputCls("email")}
                />
              </Select>
            </div>
            <div className="mt-8 flex justify-end">
              <button type="submit" data-click-sound="" className={ctaButtonVariants({ size: "lg" })}>
                {CALC_FORM.submit}
                <ArrowRight aria-hidden="true" />
              </button>
            </div>
          </form>
        </div>

        {/* ---------- step 4: cost comparison ---------- */}
        <div hidden={step !== 4} className="mx-auto mt-10 max-w-5xl">
          <Results result={result} onRestart={() => go(3)} />
        </div>
      </div>
    </section>
  );
}

function Select({ label, error, errId, children }: { label: string; error?: string; errId: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2">
      <span className="text-sm font-semibold text-ink">{label}</span>
      {children}
      {error && (
        <span id={errId} className="text-sm font-semibold text-red-600">
          {error}
        </span>
      )}
    </label>
  );
}

/**
 * Live results: designer column vs KIMP column (monthly, yearly, currency per
 * year, pros/cons), the savings line, and the "Long Term Cost" chart. Both
 * designer columns stay in the HTML (one hidden), as on live.
 */
function Results({ result, onRestart }: { result: Result | null; onRestart: () => void }) {
  const r = CALC_RESULTS;
  const sym = result?.symbol ?? "";
  const perYear = result ? `${result.currency} ${r.perYear}` : r.perYear;
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 md:gap-5">
        {(Object.keys(r.columns) as DesignerType[]).map((t) => (
          <div
            key={t}
            hidden={result ? result.type !== t : t !== "In-House"}
            className="rounded-[2rem] bg-white p-7 ring-1 ring-ink/[0.06] sm:p-9"
          >
            <h2 className="text-xl font-bold tracking-wide text-ink/70">{r.columns[t].title}</h2>
            <Price monthly={result ? `${sym}${fmt(result.monthlyClient)}/mo` : "—"} yearly={result ? `${sym}${fmt(result.yearlyClient)}` : "—"} perYear={perYear} />
            <ul className="mt-7 grid gap-3 border-t border-border pt-6">
              {r.columns[t].issues.map((i) => (
                <li key={i} className="flex items-start gap-3 text-ink/70">
                  <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-red-50 text-red-500">
                    <X className="size-3" strokeWidth={3} />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#04463d,#032f2a_60%,#021f1c)] p-7 text-white sm:p-9">
          <div aria-hidden="true" className="absolute -top-20 -right-16 size-64 rounded-full bg-teal-brand/40 blur-3xl" />
          <h2 className="relative text-xl font-bold tracking-wide">
            <span className="text-brand">{r.kimp.brand}</span> {r.kimp.title}
          </h2>
          <Price
            dark
            monthly={result ? `${sym}${fmt(result.monthlyKimp)}/mo` : "—"}
            yearly={result ? `${sym}${fmt(result.yearlyKimp)}` : "—"}
            perYear={perYear}
          />
          <ul className="relative mt-7 grid gap-3 border-t border-white/10 pt-6">
            {[...r.kimp.perks, null].map((p) => (
              <li key={p ?? "kimp360"} className="flex items-start gap-3 text-white/80">
                <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                {p ?? (
                  <span>
                    <span className="font-bold text-white">{r.kimp.platformPerk.brand}</span> {r.kimp.platformPerk.text}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {result && result.savings > 0 && (
        <p role="status" className="mt-5 rounded-2xl bg-brand-soft px-6 py-5 text-center text-xl font-bold text-ink ring-1 ring-brand/25 sm:text-2xl">
          {r.savings(result.currency, sym, fmt(result.savings))}
        </p>
      )}

      <div className="mt-5 rounded-[2rem] bg-white p-6 ring-1 ring-ink/[0.06] sm:p-9">
        <h2 className="text-2xl font-bold text-ink">{r.chart.title}</h2>
        {result && <CostChart result={result} />}
        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center">
          {r.ctas.map((c) => (
            <CtaLink key={c.label} href={c.href} variant={c.variant} size="lg">
              {c.label}
              {c.variant === "primary" && <ArrowRight aria-hidden="true" />}
            </CtaLink>
          ))}
          <button type="button" onClick={onRestart} className="inline-flex items-center gap-2 text-sm font-semibold text-ink/60 hover:text-ink sm:ml-auto">
            <RotateCcw className="size-4" aria-hidden="true" />
            {r.restart}
          </button>
        </div>
      </div>
    </>
  );
}

function Price({ monthly, yearly, perYear, dark = false }: { monthly: string; yearly: string; perYear: string; dark?: boolean }) {
  return (
    <div className="relative mt-5">
      <p className={cn("text-4xl font-bold tracking-[-0.02em] tabular-nums sm:text-5xl", dark ? "text-white" : "text-ink")}>{monthly}</p>
      <p className={cn("mt-2 font-semibold tabular-nums", dark ? "text-white/70" : "text-ink/60")}>
        {yearly} <span className="text-sm font-medium">{perYear}</span>
      </p>
    </div>
  );
}

/** Live "Long Term Cost" bar chart (6 months, 1 year, 3 years): KIMP vs the chosen designer type. */
function CostChart({ result }: { result: Result }) {
  const c = CALC_RESULTS.chart;
  const designer = c.designerLabel(result.type);
  const rows = c.periods.map((p) => ({ ...p, kimp: result.monthlyKimp * p.months, client: result.monthlyClient * p.months }));
  const max = Math.max(...rows.map((r) => Math.max(r.kimp, r.client)));
  const [hover, setHover] = useState<string | null>(null);
  const money = (n: number) => `${result.symbol}${fmt(n)}`;
  const series = [
    { key: "kimp" as const, label: c.kimpLabel, color: "#00806c" },
    { key: "client" as const, label: designer, color: "#f1731e" },
  ];
  return (
    <figure className="mt-6">
      <figcaption className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold text-ink/70">
        {series.map((s) => (
          <span key={s.key} className="inline-flex items-center gap-2">
            <span aria-hidden="true" className="size-3.5 rounded-[4px]" style={{ background: s.color }} />
            {s.label}
          </span>
        ))}
        <span className="text-ink/45">{result.currency}</span>
      </figcaption>
      <div aria-hidden="true" className="relative mt-6 grid h-72 grid-cols-3 gap-4 border-b border-ink/15 sm:gap-10">
        {rows.map((row) => (
          <div key={row.label} className="flex items-end justify-center gap-[2px]">
            {series.map((s) => {
              const v = row[s.key];
              const id = `${row.label}-${s.key}`;
              return (
                <div
                  key={s.key}
                  onPointerEnter={() => setHover(id)}
                  onPointerLeave={() => setHover(null)}
                  className="relative flex h-full w-full max-w-16 flex-col items-center justify-end"
                >
                  <span className={cn("mb-1.5 text-[0.7rem] font-bold whitespace-nowrap text-ink/70 tabular-nums sm:text-xs", hover && hover !== id && "opacity-40")}>
                    {money(v)}
                  </span>
                  <span
                    className={cn("w-full rounded-t-[4px] transition-[height,opacity] duration-700", hover && hover !== id && "opacity-40")}
                    style={{ height: `${Math.max(2, (v / max) * 82)}%`, background: s.color }}
                  />
                  {hover === id && (
                    <span className="pointer-events-none absolute bottom-full z-10 mb-1 rounded-lg bg-ink px-2.5 py-1.5 text-xs font-semibold whitespace-nowrap text-white shadow-lg">
                      {s.label}: {money(v)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      <div aria-hidden="true" className="mt-3 grid grid-cols-3 gap-4 text-center text-sm font-semibold text-ink/60 sm:gap-10">
        {rows.map((r) => (
          <span key={r.label}>{r.label}</span>
        ))}
      </div>
      {/* Same figures as a table for screen readers. */}
      <table className="sr-only">
        <caption>{c.title}</caption>
        <thead>
          <tr>
            <th scope="col">Period</th>
            {series.map((s) => (
              <th key={s.key} scope="col">{s.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              <td>{money(r.kimp)}</td>
              <td>{money(r.client)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  );
}
