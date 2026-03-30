import { motion } from "motion/react";
import { Terminal } from "lucide-react";
import { SkillTag } from "./SkillTag";
import { cardVariants } from "@/lib/animations";
import { useUserConfig } from "@/context/UserConfigContext";
import type { Lang } from "@/types/content";

interface SkillsCardProps {
  lang: Lang;
}

export function SkillsCard({ lang }: SkillsCardProps) {
  const user = useUserConfig();
  const { labels } = user.i18n[lang];

  return (
    <motion.div
      variants={cardVariants}
      className="col-span-1 md:col-span-12 lg:col-span-4 bg-[#2b2d31] rounded-2xl p-6 shadow-lg border border-[#3f4147]/50 flex flex-col"
    >
      <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
        <Terminal className="text-[#949ba4]" size={22} />
        {labels.skillsTitle}
      </div>

      <div className="flex flex-col gap-5 mb-auto">
        {user.skills.map((cat) => (
          <div key={cat.category}>
            <p className="text-[#5865F2] text-[11px] font-bold uppercase tracking-wider mb-2">
              {cat.category}
            </p>
            <div className="flex flex-wrap gap-2">
              {cat.items.map((skill) => (
                <SkillTag key={skill} skill={skill} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
