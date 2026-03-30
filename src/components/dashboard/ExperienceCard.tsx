import { motion } from "motion/react";
import { Briefcase } from "lucide-react";
import { ExperienceItem } from "./ExperienceItem";
import { cardVariants } from "@/lib/animations";
import { useUserConfig } from "@/context/UserConfigContext";
import type { Lang } from "@/types/content";

interface ExperienceCardProps {
  lang: Lang;
}

export function ExperienceCard({ lang }: ExperienceCardProps) {
  const user = useUserConfig();
  const { experiences, labels } = user.i18n[lang];

  return (
    <motion.div
      variants={cardVariants}
      className="col-span-1 md:col-span-8 lg:col-span-5 bg-[#2b2d31] rounded-2xl p-6 shadow-lg flex flex-col border border-[#3f4147]/50"
    >
      <div className="flex items-center gap-2 mb-6 text-white font-bold text-lg">
        <Briefcase className="text-[#949ba4]" size={22} />
        {labels.experience}
      </div>

      <div className="flex-1 relative border-l-2 border-[#3f4147] ml-3 space-y-8 pb-2">
        {experiences.map((exp, i) => (
          <ExperienceItem key={i} experience={exp} />
        ))}
      </div>
    </motion.div>
  );
}
