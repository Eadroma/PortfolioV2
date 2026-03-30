import type { ReactNode } from "react";

interface SectionCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export function SectionCard({ title, description, children }: SectionCardProps) {
  return (
    <div className="bg-[#2b2d31] rounded-2xl border border-[#3f4147]/50 overflow-hidden">
      <div className="px-6 py-4 border-b border-[#3f4147]">
        <h2 className="text-white font-bold text-base">{title}</h2>
        {description && (
          <p className="text-[#949ba4] text-xs mt-0.5">{description}</p>
        )}
      </div>
      <div className="px-6 py-5 space-y-4">{children}</div>
    </div>
  );
}
