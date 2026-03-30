import { motion } from "motion/react";
import { ExternalLink, Code2 } from "lucide-react";
import type { Project } from "@/types/content";

interface ProjectSlideProps {
  project: Project;
  featuredLabel: string;
}

export function ProjectSlide({ project, featuredLabel }: ProjectSlideProps) {
  return (
    <motion.a
      href={project.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="flex-1 flex flex-col h-full cursor-pointer group/card"
    >
      {/* Image */}
      <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-[#1e1f22] group">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2b2d31] via-[#2b2d31]/40 to-transparent opacity-90" />

        {/* Overlay content */}
        <div className="absolute bottom-5 left-6 right-6 flex items-end justify-between z-10">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="bg-[#5865F2] text-white text-[10px] font-bold px-2.5 py-1 rounded shadow uppercase tracking-wider">
                {featuredLabel}
              </span>
              <span className="bg-[#1e1f22]/80 backdrop-blur-sm text-[#dbdee1] border border-[#3f4147] text-[10px] font-bold px-2.5 py-1 rounded shadow uppercase tracking-wider">
                {project.type}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight group-hover/card:text-[#5865F2] transition-colors flex items-center gap-2">
              {project.title}
              <ExternalLink
                size={18}
                className="opacity-0 group-hover/card:opacity-100 transition-opacity"
              />
            </h3>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex-1 flex flex-col bg-[#2b2d31] group-hover/card:bg-[#313338] transition-colors">
        <p className="text-[#b5bac1] text-[15px] leading-relaxed mb-6 flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap items-center gap-3 mt-auto text-[13px] text-[#dbdee1] font-medium bg-[#1e1f22] p-3 rounded-xl border border-[#3f4147]/50">
          <Code2 size={16} className="text-[#5865F2]" />
          {project.tech}
        </div>
      </div>
    </motion.a>
  );
}
