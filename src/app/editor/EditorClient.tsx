"use client";

import { useEffect, useState } from "react";
import type { UserConfig } from "@/types/content";
import { ProfileSection } from "./sections/ProfileSection";
import { SkillsSection } from "./sections/SkillsSection";
import { BioSection } from "./sections/BioSection";
import { LabelsSection } from "./sections/LabelsSection";
import { ExperiencesSection } from "./sections/ExperiencesSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { Save, CheckCircle, XCircle, Loader2, ArrowLeft } from "lucide-react";
import Link from "next/link";

type SaveState = "idle" | "saving" | "saved" | "error";

function LangBadge({ lang }: { lang: "en" | "fr" }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <span className="text-[#5865F2] text-xs font-bold uppercase tracking-widest">
        {lang === "en" ? "🇬🇧 English" : "🇫🇷 Français"}
      </span>
      <div className="flex-1 h-px bg-[#3f4147]" />
    </div>
  );
}

export function EditorClient() {
  const [config, setConfig] = useState<UserConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");

  useEffect(() => {
    fetch("/api/editor")
      .then((r) => r.json())
      .then((data) => setConfig(data))
      .finally(() => setLoading(false));
  }, []);

  async function handleSave() {
    if (!config) return;
    setSaveState("saving");
    try {
      const res = await fetch("/api/editor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });
      setSaveState(res.ok ? "saved" : "error");
    } catch {
      setSaveState("error");
    }
    setTimeout(() => setSaveState("idle"), 3000);
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1f22] flex items-center justify-center">
        <Loader2 size={32} className="text-[#5865F2] animate-spin" />
      </div>
    );
  }

  if (!config) {
    return (
      <div className="min-h-screen bg-[#1e1f22] flex items-center justify-center text-[#949ba4]">
        Failed to load config.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1e1f22] text-[#dbdee1]">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-[#1e1f22]/90 backdrop-blur border-b border-[#3f4147] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-[#949ba4] hover:text-white transition-colors"
            aria-label="Back to portfolio"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-white font-bold text-lg">Portfolio Editor</h1>
            <p className="text-[#949ba4] text-xs">
              Dev only — changes are written directly to{" "}
              <code className="text-[#5865F2]">src/config/user.json</code>
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          disabled={saveState === "saving"}
          className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer disabled:opacity-60 bg-[#5865F2] hover:bg-[#4752c4] text-white"
        >
          {saveState === "saving" && <Loader2 size={16} className="animate-spin" />}
          {saveState === "saved" && <CheckCircle size={16} className="text-green-400" />}
          {saveState === "error" && <XCircle size={16} className="text-red-400" />}
          {saveState === "idle" && <Save size={16} />}
          {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved!" : saveState === "error" ? "Error" : "Save"}
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-10 space-y-8">
        {/* Global sections (not language-specific) */}
        <ProfileSection config={config} onChange={setConfig} />
        <SkillsSection config={config} onChange={setConfig} />

        {/* Language-specific sections — EN | FR side by side */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="space-y-6">
            <LangBadge lang="en" />
            <BioSection config={config} lang="en" onChange={setConfig} />
            <LabelsSection config={config} lang="en" onChange={setConfig} />
            <ExperiencesSection config={config} lang="en" onChange={setConfig} />
            <ProjectsSection config={config} lang="en" onChange={setConfig} />
          </div>
          <div className="space-y-6">
            <LangBadge lang="fr" />
            <BioSection config={config} lang="fr" onChange={setConfig} />
            <LabelsSection config={config} lang="fr" onChange={setConfig} />
            <ExperiencesSection config={config} lang="fr" onChange={setConfig} />
            <ProjectsSection config={config} lang="fr" onChange={setConfig} />
          </div>
        </div>
      </main>
    </div>
  );
}
