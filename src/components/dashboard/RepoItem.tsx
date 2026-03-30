import { Star, GitFork, MonitorSmartphone } from "lucide-react";
import type { Repo } from "@/types/content";

interface RepoItemProps {
  repo: Repo;
}

export function RepoItem({ repo }: RepoItemProps) {
  return (
    <a
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-[#1e1f22] border border-[#3f4147] hover:border-[#5865F2] rounded-xl p-5 transition-all group cursor-pointer flex flex-col relative overflow-hidden min-h-[140px]"
    >
      <h4 className="text-[#dbdee1] font-bold text-[15px] mb-2 group-hover:text-[#5865F2] transition-colors line-clamp-1 flex items-center gap-2">
        <MonitorSmartphone size={16} className="text-[#949ba4] shrink-0" />
        {repo.name}
      </h4>
      <p className="text-[#949ba4] text-[13px] leading-relaxed mb-4 flex-1 line-clamp-2">
        {repo.description}
      </p>
      <div className="flex items-center gap-4 text-[12px] font-semibold text-[#80848e]">
        <div className="flex items-center gap-1.5 text-[#dbdee1]">
          <span
            className="w-2.5 h-2.5 rounded-full shrink-0"
            style={{ backgroundColor: repo.languageColor }}
          />
          {repo.language}
        </div>
        <div className="flex items-center gap-1 hover:text-[#dbdee1] transition-colors">
          <Star size={14} />
          {repo.stars}
        </div>
        <div className="flex items-center gap-1 hover:text-[#dbdee1] transition-colors">
          <GitFork size={14} />
          {repo.forks}
        </div>
      </div>
    </a>
  );
}
