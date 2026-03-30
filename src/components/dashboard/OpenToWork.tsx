import { Briefcase } from "lucide-react";

interface OpenToWorkProps {
  title: string;
  availability: string;
  buttonLabel: string;
  contactEmail: string;
}

export function OpenToWork({ title, availability, buttonLabel, contactEmail }: OpenToWorkProps) {
  return (
    <div className="mt-8 bg-gradient-to-br from-[#1e1f22] to-[#2b2d31] p-5 rounded-xl border border-[#5865F2]/30 relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#5865F2]/10 rounded-full blur-3xl -mr-10 -mt-10 transition-all duration-500 group-hover:bg-[#5865F2]/20" />
      <div className="flex items-center gap-3 mb-3 relative z-10">
        <div className="w-3 h-3 rounded-full bg-[#23a559] animate-pulse shadow-[0_0_8px_rgba(35,165,89,0.6)]" />
        <h4 className="text-white font-semibold text-[15px]">{title}</h4>
      </div>
      <p className="text-[#b5bac1] text-[13px] leading-relaxed relative z-10 mb-4">
        {availability}
      </p>
      <a
        href={`mailto:${contactEmail}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full bg-[#1e1f22] hover:bg-[#5865F2] hover:border-[#5865F2] border border-[#3f4147] text-white py-2.5 rounded-lg font-medium text-[13px] transition-all flex items-center justify-center gap-2 shadow-sm relative z-10"
      >
        <Briefcase size={16} />
        {buttonLabel}
      </a>
    </div>
  );
}
