"use client";

import { useState, type KeyboardEvent } from "react";
import { X, Plus, Trash2 } from "lucide-react";
import type { UserConfig, SkillCategory } from "@/types/content";
import { SectionCard } from "../components/SectionCard";

interface Props {
  config: UserConfig;
  onChange: (c: UserConfig) => void;
}

interface CategoryInputs {
  [categoryIndex: number]: string;
}

export function SkillsSection({ config, onChange }: Props) {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [skillInputs, setSkillInputs] = useState<CategoryInputs>({});

  function setSkillInput(catIndex: number, value: string) {
    setSkillInputs((prev) => ({ ...prev, [catIndex]: value }));
  }

  function addCategory() {
    const name = newCategoryName.trim();
    if (!name || config.skills.some((c) => c.category === name)) return;
    const newCat: SkillCategory = { category: name, items: [] };
    onChange({ ...config, skills: [...config.skills, newCat] });
    setNewCategoryName("");
  }

  function removeCategory(catIndex: number) {
    onChange({
      ...config,
      skills: config.skills.filter((_, i) => i !== catIndex),
    });
  }

  function addSkill(catIndex: number) {
    const trimmed = (skillInputs[catIndex] ?? "").trim();
    if (!trimmed) return;
    const cat = config.skills[catIndex];
    if (cat.items.includes(trimmed)) return;
    const updated: SkillCategory = { ...cat, items: [...cat.items, trimmed] };
    const next = config.skills.map((c, i) => (i === catIndex ? updated : c));
    onChange({ ...config, skills: next });
    setSkillInput(catIndex, "");
  }

  function removeSkill(catIndex: number, skill: string) {
    const cat = config.skills[catIndex];
    const updated: SkillCategory = {
      ...cat,
      items: cat.items.filter((s) => s !== skill),
    };
    const next = config.skills.map((c, i) => (i === catIndex ? updated : c));
    onChange({ ...config, skills: next });
  }

  function onKeyDown(e: KeyboardEvent<HTMLInputElement>, catIndex: number) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(catIndex);
    }
  }

  function onCategoryKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      e.preventDefault();
      addCategory();
    }
  }

  return (
    <SectionCard title="Skills" description="Organize your skills into categories">
      <div className="space-y-5">
        {config.skills.map((cat, catIndex) => (
          <div
            key={catIndex}
            className="bg-[#1e1f22] border border-[#3f4147] rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-[#5865F2] text-xs font-bold uppercase tracking-wider">
                {cat.category}
              </span>
              <button
                onClick={() => removeCategory(catIndex)}
                className="text-[#949ba4] hover:text-red-400 transition-colors cursor-pointer"
                aria-label={`Remove category ${cat.category}`}
              >
                <Trash2 size={14} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2 min-h-[28px]">
              {cat.items.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-1.5 bg-[#2b2d31] border border-[#3f4147] text-[#dbdee1] px-2.5 py-1 rounded-lg text-xs"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(catIndex, skill)}
                    className="text-[#949ba4] hover:text-red-400 transition-colors cursor-pointer"
                    aria-label={`Remove ${skill}`}
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={skillInputs[catIndex] ?? ""}
                onChange={(e) => setSkillInput(catIndex, e.target.value)}
                onKeyDown={(e) => onKeyDown(e, catIndex)}
                placeholder="Add a skill…"
                className="flex-1 bg-[#2b2d31] border border-[#3f4147] focus:border-[#5865F2] text-[#dbdee1] text-sm rounded-lg px-3 py-1.5 outline-none transition-colors placeholder:text-[#4f545c]"
              />
              <button
                onClick={() => addSkill(catIndex)}
                className="px-3 py-1.5 bg-[#5865F2] hover:bg-[#4752c4] text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Add skill"
              >
                <Plus size={14} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2 pt-1">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          onKeyDown={onCategoryKeyDown}
          placeholder="New category name…"
          className="flex-1 bg-[#1e1f22] border border-dashed border-[#3f4147] focus:border-[#5865F2] text-[#dbdee1] text-sm rounded-xl px-3 py-2 outline-none transition-colors placeholder:text-[#4f545c]"
        />
        <button
          onClick={addCategory}
          className="px-3 py-2 border border-dashed border-[#3f4147] hover:border-[#5865F2] text-[#949ba4] hover:text-[#5865F2] rounded-xl transition-colors cursor-pointer"
          aria-label="Add category"
        >
          <Plus size={15} />
        </button>
      </div>
    </SectionCard>
  );
}
