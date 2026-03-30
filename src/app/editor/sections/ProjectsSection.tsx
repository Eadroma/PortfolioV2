"use client";

import { Trash2, Plus } from "lucide-react";
import type { UserConfig, Lang, Project } from "@/types/content";
import { SectionCard } from "../components/SectionCard";
import { Field } from "../components/Field";

interface Props {
  config: UserConfig;
  lang: Lang;
  onChange: (c: UserConfig) => void;
}

const EMPTY: Project = {
  title: "",
  type: "",
  image: "",
  description: "",
  tech: "",
  url: "",
};

export function ProjectsSection({ config, lang, onChange }: Props) {
  const projects = config.i18n[lang].projects;

  function update(index: number, updated: Project) {
    const next = projects.map((p, i) => (i === index ? updated : p));
    onChange({
      ...config,
      i18n: { ...config.i18n, [lang]: { ...config.i18n[lang], projects: next } },
    });
  }

  function remove(index: number) {
    const next = projects.filter((_, i) => i !== index);
    onChange({
      ...config,
      i18n: { ...config.i18n, [lang]: { ...config.i18n[lang], projects: next } },
    });
  }

  function add() {
    onChange({
      ...config,
      i18n: {
        ...config.i18n,
        [lang]: { ...config.i18n[lang], projects: [...projects, { ...EMPTY }] },
      },
    });
  }

  return (
    <SectionCard title="Projects" description="Featured projects showcased on your portfolio">
      <div className="space-y-4">
        {projects.map((project, i) => (
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
                aria-label="Remove project"
              >
                <Trash2 size={15} />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Title"
                value={project.title}
                onChange={(v) => update(i, { ...project, title: v })}
              />
              <Field
                label="Type"
                value={project.type}
                onChange={(v) => update(i, { ...project, type: v })}
                placeholder="Web App, Mobile App…"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Tech Stack"
                value={project.tech}
                onChange={(v) => update(i, { ...project, tech: v })}
                placeholder="React, TypeScript, Tailwind…"
              />
              <Field
                label="Project URL"
                value={project.url}
                onChange={(v) => update(i, { ...project, url: v })}
                placeholder="https://…"
              />
            </div>

            <Field
              label="Image URL"
              value={project.image}
              onChange={(v) => update(i, { ...project, image: v })}
              placeholder="https://… (cover image)"
            />

            <Field
              label="Description"
              value={project.description}
              onChange={(v) => update(i, { ...project, description: v })}
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
        Add project
      </button>
    </SectionCard>
  );
}
