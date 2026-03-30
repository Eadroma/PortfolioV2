import { Languages } from "lucide-react";
import { useUserConfig } from "@/context/UserConfigContext";
import type { Lang } from "@/types/content";

interface LanguageToggleProps {
  lang: Lang;
  onToggle: (lang: Lang) => void;
}

export function LanguageToggle({ lang, onToggle }: LanguageToggleProps) {
  const user = useUserConfig();
  const label = user.i18n[lang].labels.langToggle;

  function handleClick() {
    onToggle(lang === "en" ? "fr" : "en");
  }

  return (
    <button
      onClick={handleClick}
      className="flex items-center gap-2 bg-[#2b2d31] hover:bg-[#3f4147] border border-[#3f4147] px-4 py-2 rounded-lg text-sm font-semibold text-[#dbdee1] transition-colors shadow-sm cursor-pointer"
    >
      <Languages size={18} className="text-[#949ba4]" />
      {label}
    </button>
  );
}
