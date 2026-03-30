"use client";

import { useEffect, useState } from "react";
import type { UserConfig, Lang } from "@/types/content";
import { ProfileSection } from "./sections/ProfileSection";
import { SkillsSection } from "./sections/SkillsSection";
import { BioSection } from "./sections/BioSection";
import { LabelsSection } from "./sections/LabelsSection";
import { ExperiencesSection } from "./sections/ExperiencesSection";
import { ProjectsSection } from "./sections/ProjectsSection";
import { Save, CheckCircle, XCircle, Loader2 } from "lucide-react";

type SaveState = "idle" | "saving" | "saved" | "error";

export function EditorClient() {
  const [config, setConfig] = useState<UserConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [activeLang, setActiveLang] = useState<Lang>("en");

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
        <div>
          <h1 className="text-white font-bold text-lg">Portfolio Editor</h1>
          <p className="text-[#949ba4] text-xs">
            Dev only — changes are written directly to{" "}
            <code className="text-[#5865F2]">src/config/user.json</code>
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saveState === "saving"}
          className="flex items-center gap-2 px-5 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer disabled:opacity-60
            bg-[#5865F2] hover:bg-[#4752c4] text-white"
        >
          {saveState === "saving" && <Loader2 size={16} className="animate-spin" />}
          {saveState === "saved" && <CheckCircle size={16} className="text-green-400" />}
          {saveState === "error" && <XCircle size={16} className="text-red-400" />}
          {saveState === "idle" && <Save size={16} />}
          {saveState === "saving" ? "Saving…" : saveState === "saved" ? "Saved!" : saveState === "error" ? "Error" : "Save"}
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-10 space-y-6">
        {/* Profile */}
        <ProfileSection config={config} onChange={setConfig} />

        {/* Skills */}
        <SkillsSection config={config} onChange={setConfig} />

        {/* Lang tabs */}
        <div className="flex gap-2">
          {(["en", "fr"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setActiveLang(l)}
              className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
                activeLang === l
                  ? "bg-[#5865F2] text-white"
                  : "bg-[#2b2d31] text-[#949ba4] hover:text-white"
              }`}
            >
              {l.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Bio */}
        <BioSection config={config} lang={activeLang} onChange={setConfig} />

        {/* Labels */}
        <LabelsSection config={config} lang={activeLang} onChange={setConfig} />

        {/* Experiences */}
        <ExperiencesSection config={config} lang={activeLang} onChange={setConfig} />

        {/* Projects */}
        <ProjectsSection config={config} lang={activeLang} onChange={setConfig} />
      </main>
    </div>
  );
}
