"use client";

import { Trash2, Plus } from "lucide-react";
import type { UserConfig, Lang, Experience } from "@/types/content";
import { SectionCard } from "../components/SectionCard";
import { Field } from "../components/Field";

interface Props {
  config: UserConfig;
  lang: Lang;
  onChange: (c: UserConfig) => void;
}

const EMPTY: Experience = {
  role: "",
  company: "",
  period: "",
  description: "",
  url: null,
};

export function ExperiencesSection({ config, lang, onChange }: Props) {
  const experiences = config.i18n[lang].experiences;

  function update(index: number, updated: Experience) {
    const next = experiences.map((e, i) => (i === index ? updated : e));
    onChange({
      ...config,
      i18n: { ...config.i18n, [lang]: { ...config.i18n[lang], experiences: next } },
    });
  }

  function remove(index: number) {
    const next = experiences.filter((_, i) => i !== index);
    onChange({
      ...config,
      i18n: { ...config.i18n, [lang]: { ...config.i18n[lang], experiences: next } },
    });
  }

  function add() {
    onChange({
      ...config,
      i18n: {
        ...config.i18n,
        [lang]: { ...config.i18n[lang], experiences: [...experiences, { ...EMPTY }] },
      },
    });
  }

  return (
    <SectionCard title="Experiences" description="Work history timeline">
      <div className="space-y-4">
        {experiences.map((exp, i) => (
          <div
            key={i}
            className="bg-[#1e1f22] border border-[#3f4147] rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[#5865F2] text-xs font-bold uppercase tracking-wider">
                #{i + 1}
              </span>
              <button
                onClick={() => remove(i)}
                className="text-[#949ba4] hover:text-red-400 transition-colors cursor-pointer"
                aria-label="Remove experience"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Role"
                value={exp.role}
                onChange={(v) => update(i, { ...exp, role: v })}
              />
              <Field
                label="Company"
                value={exp.company}
                onChange={(v) => update(i, { ...exp, company: v })}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Period"
                value={exp.period}
                onChange={(v) => update(i, { ...exp, period: v })}
                placeholder="Jan 2023 - Present"
              />
              <Field
                label="Company URL"
                value={exp.url ?? ""}
                onChange={(v) => update(i, { ...exp, url: v || null })}
                placeholder="https://… (leave empty for none)"
              />
            </div>

            <Field
              label="Description"
              value={exp.description}
              onChange={(v) => update(i, { ...exp, description: v })}
              multiline
            />
          </div>
        ))}
      </div>

      <button
        onClick={add}
        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-dashed border-[#3f4147] hover:border-[#5865F2] text-[#949ba4] hover:text-[#5865F2] text-sm font-medium transition-colors cursor-pointer"
      >
        <Plus size={15} />
        Add experience
      </button>
    </SectionCard>
  );
}
