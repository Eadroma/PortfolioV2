"use client";

import { useState } from "react";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { LanguageToggle } from "@/components/dashboard/LanguageToggle";
import type { Lang } from "@/types/content";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <main className="min-h-screen bg-[#1e1f22] p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end mb-6">
          <LanguageToggle lang={lang} onToggle={setLang} />
        </div>
        <DashboardGrid lang={lang} />
      </div>
    </main>
  );
}
