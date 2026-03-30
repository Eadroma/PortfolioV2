"use client";

import { motion } from "motion/react";
import { containerVariants } from "@/lib/animations";
import { ProfileCard } from "./ProfileCard";
import { ExperienceCard } from "./ExperienceCard";
import { SkillsCard } from "./SkillsCard";
import { ProjectCarousel } from "./ProjectCarousel";
import { RepoCard } from "./RepoCard";
import type { Lang } from "@/types/content";

interface DashboardGridProps {
  lang: Lang;
}

export function DashboardGrid({ lang }: DashboardGridProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="grid grid-cols-1 md:grid-cols-12 gap-6"
    >
      <ProfileCard lang={lang} />
      <ExperienceCard lang={lang} />
      <SkillsCard lang={lang} />
      <ProjectCarousel lang={lang} />
      <RepoCard lang={lang} />
    </motion.div>
  );
}
