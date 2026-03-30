"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ProjectSlide } from "./ProjectSlide";
import { CarouselControls } from "./CarouselControls";
import { cardVariants } from "@/lib/animations";
import { useUserConfig } from "@/context/UserConfigContext";
import type { Lang } from "@/types/content";

interface ProjectCarouselProps {
  lang: Lang;
}

export function ProjectCarousel({ lang }: ProjectCarouselProps) {
  const user = useUserConfig();
  const [current, setCurrent] = useState(0);
  const { projects, labels } = user.i18n[lang];

  function goNext() {
    setCurrent((prev) => (prev + 1) % projects.length);
  }

  function goPrev() {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  }

  return (
    <motion.div
      variants={cardVariants}
      className="col-span-1 md:col-span-12 lg:col-span-6 bg-[#2b2d31] rounded-2xl overflow-hidden shadow-lg flex flex-col border border-[#3f4147]/50 relative group min-h-[480px]"
    >
      <CarouselControls
        total={projects.length}
        current={current}
        onPrev={goPrev}
        onNext={goNext}
        onGoTo={setCurrent}
      />

      <AnimatePresence mode="wait">
        <ProjectSlide
          key={current}
          project={projects[current]}
          featuredLabel={labels.featured}
        />
      </AnimatePresence>
    </motion.div>
  );
}
