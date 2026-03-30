import { getDeviconName } from "@/lib/deviconMap";

interface SkillTagProps {
  skill: string;
}

export function SkillTag({ skill }: SkillTagProps) {
  const iconName = getDeviconName(skill);

  return (
    <span className="flex items-center gap-2 bg-[#1e1f22] hover:bg-[#3f4147] border border-[#3f4147] text-[#dbdee1] px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors cursor-default">
      {iconName && (
        <i className={`devicon-${iconName}-plain colored text-base leading-none`} aria-hidden="true" />
      )}
      {skill}
    </span>
  );
}
