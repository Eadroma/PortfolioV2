"use client";

import { useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";
import { DashboardGrid } from "@/components/dashboard/DashboardGrid";
import { LanguageToggle } from "@/components/dashboard/LanguageToggle";
import type { Lang } from "@/types/content";

const isDev = process.env.NODE_ENV === "development";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");

  return (
    <main className="min-h-screen bg-[#1e1f22] p-4 md:p-8 overflow-x-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-end gap-2 mb-6">
          {isDev && (
            <Link
              href="/editor"
              className="flex items-center gap-2 bg-[#2b2d31] hover:bg-[#3f4147] border border-[#3f4147] px-4 py-2 rounded-lg text-sm font-semibold text-[#949ba4] hover:text-[#dbdee1] transition-colors shadow-sm"
            >
              <Pencil size={15} />
              Editor
            </Link>
          )}
          <LanguageToggle lang={lang} onToggle={setLang} />
        </div>
        <DashboardGrid lang={lang} />
      </div>
    </main>
  );
}
