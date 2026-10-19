"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowIcon } from "@/components/brand-button";
import { StudyMedia } from "@/components/study-media";
import { studies } from "@/lib/content";
import { cn } from "cn";

export function WorkIndex() {
  const sectors = useMemo(() => ["All", ...Array.from(new Set(studies.map((study) => study.sector)))], []);
  const [sector, setSector] = useState("All");
  const visible = sector === "All" ? studies : studies.filter((study) => study.sector === sector);

  return (
    <section className="bg-ivory">
      <div className="shell py-12 lg:py-16">
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Filter studies by sector">
          {sectors.map((item) => {
            const selected = item === sector;
            return (
              <button
                key={item}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setSector(item)}
                className={cn(
                  "h-10 shrink-0 rounded-[8px] border px-4 text-sm font-medium transition-colors",
                  selected ? "border-ink bg-ink text-white" : "border-ink/15 bg-white text-ink hover:border-ink"
                )}
              >
                {item}
              </button>
            );
          })}
        </div>
        <ul className="mt-8 grid gap-[var(--grid-gutter)] md:grid-cols-2">
          {visible.map((study) => (
            <li key={study.slug}>
              <Link
                href={`/work/${study.slug}`}
                className="group/button flex h-full flex-col overflow-hidden rounded-[8px] bg-ink text-white"
              >
                <div className="relative h-72 overflow-hidden bg-[#07060f] sm:h-80">
                  {study.cover ? (
                    <img
                      src={study.cover}
                      alt=""
                      className="absolute top-1/2 left-1/2 h-full max-h-full w-auto max-w-full -translate-x-1/2 -translate-y-1/2 object-contain transition-transform duration-700 ease-out group-hover/button:scale-[1.03]"
                    />
                  ) : (
                    <div className="absolute inset-[-6%] transition-transform duration-700 ease-out group-hover/button:scale-105">
                      <StudyMedia study={study} />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 md:p-8">
                  <p className="eyebrow text-white/70">
                    {study.index} / {study.sector} / {study.year}
                  </p>
                  <h2 className="mt-3 text-3xl font-bold tracking-[-0.045em]">{study.name}</h2>
                  <p className="mt-3 text-base leading-relaxed text-white/80">{study.summary}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-lime">
                    View case study
                    <ArrowIcon />
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {visible.length === 0 ? (
          <p className="mt-10 text-stone">No studies in this sector yet.</p>
        ) : null}
      </div>
    </section>
  );
}
