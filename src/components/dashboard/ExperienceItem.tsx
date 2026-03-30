import type { Experience } from "@/types/content";

interface ExperienceItemProps {
  experience: Experience;
}

export function ExperienceItem({ experience }: ExperienceItemProps) {
  const dot = (
    <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-[#2b2d31] border-2 border-[#5865F2] rounded-full group-hover:bg-[#5865F2] transition-colors" />
  );

  return (
    <div className="relative pl-6 group">
      {experience.url ? (
        <a
          href={experience.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${experience.company}`}
          className="absolute -left-[9px] top-1.5 w-4 h-4 bg-[#2b2d31] border-2 border-[#5865F2] rounded-full group-hover:bg-[#5865F2] hover:scale-125 transition-all cursor-pointer"
        />
      ) : (
        dot
      )}

      <h3 className="text-white font-semibold text-[15px] leading-tight">
        {experience.role}
      </h3>
      <div className="flex items-center gap-2 text-[#949ba4] text-xs font-medium mb-2 mt-1">
        <span className="text-[#dbdee1]">{experience.company}</span>
        <span className="w-1 h-1 bg-[#4f545c] rounded-full" />
        <span>{experience.period}</span>
      </div>
      <p className="text-[#b5bac1] text-[14px] leading-relaxed">
        {experience.description}
      </p>
    </div>
  );
}
