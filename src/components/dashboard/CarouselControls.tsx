import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselControlsProps {
  total: number;
  current: number;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export function CarouselControls({
  total,
  current,
  onPrev,
  onNext,
  onGoTo,
}: CarouselControlsProps) {
  return (
    <>
      {/* Prev / Next arrows — visible on hover */}
      <div className="absolute top-1/2 -translate-y-1/2 w-full px-4 flex justify-between z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={onPrev}
          className="pointer-events-auto w-10 h-10 bg-[#1e1f22]/80 backdrop-blur-md border border-[#3f4147] hover:bg-[#3f4147] text-white rounded-full flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          aria-label="Previous project"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={onNext}
          className="pointer-events-auto w-10 h-10 bg-[#1e1f22]/80 backdrop-blur-md border border-[#3f4147] hover:bg-[#3f4147] text-white rounded-full flex items-center justify-center transition-colors shadow-lg cursor-pointer"
          aria-label="Next project"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="absolute top-4 right-4 flex gap-2 z-20 bg-[#1e1f22]/50 backdrop-blur-md px-3 py-2 rounded-full border border-[#3f4147]/50 shadow-sm">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onGoTo(i)}
            className={`h-2 rounded-full transition-all cursor-pointer ${
              i === current
                ? "bg-[#5865F2] w-4"
                : "bg-[#dbdee1]/30 hover:bg-[#dbdee1]/50 w-2"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </>
  );
}
