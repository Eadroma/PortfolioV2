import { motion } from "motion/react";
import { Mail, Github, MapPin } from "lucide-react";
import { cardVariants } from "@/lib/animations";
import { useUserConfig } from "@/context/UserConfigContext";
import type { Lang } from "@/types/content";

interface ProfileCardProps {
  lang: Lang;
}

export function ProfileCard({ lang }: ProfileCardProps) {
  const user = useUserConfig();
  const { role, bio, location, labels } = user.i18n[lang];

  return (
    <motion.div
      variants={cardVariants}
      className="col-span-1 md:col-span-4 lg:col-span-3 bg-[#2b2d31] rounded-2xl p-6 shadow-lg flex flex-col relative overflow-hidden border border-[#3f4147]/50"
    >
      {/* Banner */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#5865F2] to-[#eb459e] opacity-90" />

      {/* Avatar + tag row */}
      <div className="relative mt-10 mb-4 flex justify-between items-end">
        <div className="w-24 h-24 rounded-full border-[6px] border-[#2b2d31] relative bg-[#313338]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={user.avatar}
            alt={user.name}
            className="w-full h-full rounded-full object-cover"
          />
          <div
            className="absolute bottom-1 right-1 w-[22px] h-[22px] bg-[#23a559] rounded-full border-4 border-[#2b2d31]"
            title="Online"
          />
        </div>
        <div className="mb-2 bg-[#1e1f22] px-3 py-1 rounded-full text-xs font-bold text-[#dbdee1] border border-[#3f4147]">
          {user.tag}
        </div>
      </div>

      {/* Name + role */}
      <h1 className="text-xl font-bold text-white mb-1 tracking-tight">
        {user.name}
      </h1>
      <p className="text-[#949ba4] text-[15px] font-medium mb-4">{role}</p>

      {/* Bio + location */}
      <div className="space-y-4 mb-6 flex-1">
        <p className="text-[14px] text-[#dbdee1] leading-relaxed bg-[#1e1f22] p-3 rounded-xl border border-[#3f4147]/50">
          {bio}
        </p>
        <div className="flex items-center text-[#949ba4] text-[13px] font-semibold gap-2 uppercase tracking-wide">
          <MapPin size={14} />
          {location}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3 mt-auto">
        <a
          href={`mailto:${user.contactEmail}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 bg-[#5865F2] hover:bg-[#4752c4] text-white py-2 rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-md"
        >
          <Mail size={16} />
          {labels.contact}
        </a>
        <a
          href={user.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-[#3f4147] hover:bg-[#4e5058] rounded-lg transition-colors text-[#dbdee1] shadow-md"
          aria-label="GitHub"
        >
          <Github size={20} />
        </a>
      </div>
    </motion.div>
  );
}
