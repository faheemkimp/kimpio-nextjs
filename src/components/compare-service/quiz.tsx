"use client";

import { ArrowLeft, ArrowRight, Lightbulb, RotateCcw } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { SectionHeading } from "@/components/home/sections/section-heading";
import { CtaLink } from "@/components/ui/cta-button";
import type { CS_QUIZ, QuizResultKey, QuizScore } from "@/content/compare-service";
import { cn } from "@/lib/utils";

type Quiz = typeof CS_QUIZ;

/** Live tie-break rules (template-compare script), unchanged. */
function recommend(scoring: Quiz["scoring"], answers: Record<string, string>): QuizResultKey {
  const s: QuizScore = { freelancer: 0, kimp: 0, agency: 0 };
  for (const [q, a] of Object.entries(answers)) {
    const pts = scoring[q]?.[a];
    if (!pts) continue;
    s.freelancer += pts.freelancer;
    s.kimp += pts.kimp;
    s.agency += pts.agency;
  }
  const max = Math.max(s.freelancer, s.kimp, s.agency);
  const tf = s.freelancer === max;
  const tk = s.kimp === max;
  const ta = s.agency === max;
  const ties = [tf, tk, ta].filter(Boolean).length;
  if (ties === 1) return tf ? "freelancer" : tk ? "kimp" : "agency";
  if (tf && tk && !ta) return answers.q1 !== "rarely" ? "kimp" : "freelancer";
  if (tk && ta && !tf) return answers.q4 === "creativeStrategy" && answers.q5 === "teamManagesAll" ? "agency" : "kimp";
  if (tf && ta && !tk) return answers.q4 === "creativeStrategy" ? "agency" : "freelancer";
  return "kimp";
}

/**
 * Live "Let’s find your ideal design workflow": five questions, auto-advance on
 * answer, then one of three results (<h3>). Same questions, scoring and
 * tie-breaks as live. All questions and results are in the HTML.
 */
export function CompareQuiz({ quiz }: { quiz: Quiz }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResultKey | null>(null);
  const focusRef = useRef<HTMLElement | null>(null);
  const moved = useRef(false);
  const total = quiz.questions.length;
  const step = result ? total : index + 1;
  const pct = Math.round((step / total) * 100);

  useEffect(() => {
    if (moved.current) focusRef.current?.focus();
  }, [index, result]);

  function answer(q: string, value: string) {
    const next = { ...answers, [q]: value };
    setAnswers(next);
    moved.current = true;
    window.setTimeout(() => {
      if (index < total - 1) setIndex(index + 1);
      else setResult(recommend(quiz.scoring, next));
    }, 220);
  }

  function restart() {
    moved.current = true;
    setAnswers({});
    setResult(null);
    setIndex(0);
  }

  return (
    <section id={quiz.id} aria-labelledby={`${quiz.id}-title`} className="relative isolate scroll-mt-24 py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading id={`${quiz.id}-title`} eyebrow={quiz.eyebrow} title={quiz.title} intro={quiz.intro} align="center" twoTone={false} />

        <div className="mx-auto mt-12 max-w-3xl rounded-[2rem] bg-white p-6 ring-1 ring-ink/[0.06] shadow-[0_40px_80px_-50px_rgb(27_30_35/0.4)] sm:p-10">
          <div hidden={result !== null}>
            <div className="flex items-center justify-between text-sm font-semibold text-ink/60">
              <span>{`Question ${step} of ${total}`}</span>
              <span className="tabular-nums">{pct}%</span>
            </div>
            <div aria-hidden="true" className="mt-3 h-2 overflow-hidden rounded-full bg-surface">
              <span className="block h-full rounded-full bg-brand transition-[width] duration-500" style={{ width: `${pct}%` }} />
            </div>
          </div>

          {quiz.questions.map((q, i) => (
            <fieldset key={q.id} hidden={result !== null || i !== index} className="mt-8">
              <legend
                ref={(el) => {
                  if (i === index && !result) focusRef.current = el;
                }}
                tabIndex={-1}
                className="text-2xl font-bold text-ink outline-none sm:text-3xl"
              >
                {q.legend}
              </legend>
              <div className="mt-6 grid gap-3">
                {q.options.map((o) => {
                  const checked = answers[q.id] === o.value;
                  return (
                    <label
                      key={o.value}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-2xl px-5 py-4 ring-1 transition-colors has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-brand",
                        checked ? "bg-brand-soft ring-brand" : "bg-white ring-border hover:bg-surface",
                      )}
                    >
                      <input type="radio" name={q.id} value={o.value} checked={checked} onChange={() => answer(q.id, o.value)} className="size-5 shrink-0 accent-[#f1731e]" />
                      <span>
                        <span className="block font-bold text-ink">{o.label}</span>
                        {o.note && <span className="mt-0.5 block text-sm text-ink/55">{o.note}</span>}
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          ))}

          {quiz.results.map((r) => (
            <div key={r.key} hidden={result !== r.key} className="text-center">
              <p className="text-sm font-bold tracking-[0.14em] text-brand uppercase">{r.kicker}</p>
              <h3
                ref={(el) => {
                  if (result === r.key) focusRef.current = el;
                }}
                tabIndex={-1}
                className="mt-3 text-4xl font-bold text-ink outline-none sm:text-5xl"
              >
                {r.title}
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-ink/65">{r.body}</p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <CtaLink href={r.cta.href} size="lg">
                  {r.cta.label}
                  <ArrowRight aria-hidden="true" />
                </CtaLink>
                <button type="button" onClick={restart} className="inline-flex items-center gap-2 px-4 py-3 font-semibold text-ink/65 hover:text-ink">
                  <RotateCcw className="size-4" aria-hidden="true" />
                  {r.restart}
                </button>
              </div>
            </div>
          ))}

          <div hidden={result !== null} className="mt-8 flex flex-col-reverse gap-4 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              hidden={index === 0}
              onClick={() => {
                moved.current = true;
                setIndex(index - 1);
              }}
              className="inline-flex items-center gap-2 self-start font-semibold text-ink/65 hover:text-ink"
            >
              <ArrowLeft className="size-4" aria-hidden="true" />
              {quiz.back}
            </button>
            <p className="flex items-center gap-2 text-sm text-ink/55 sm:ml-auto">
              <Lightbulb className="size-4 text-brand" aria-hidden="true" />
              {quiz.hint}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
