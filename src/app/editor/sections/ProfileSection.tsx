import type { UserConfig } from "@/types/content";
import { SectionCard } from "../components/SectionCard";
import { Field } from "../components/Field";

const STATUSES = ["online", "idle", "dnd", "offline"] as const;

interface Props {
  config: UserConfig;
  onChange: (c: UserConfig) => void;
}

export function ProfileSection({ config, onChange }: Props) {
  function set(key: keyof Omit<UserConfig, "skills" | "i18n">, value: string) {
    onChange({ ...config, [key]: value });
  }

  return (
    <SectionCard title="Profile" description="Your identity and contact information">
      <div className="grid grid-cols-2 gap-4">
        <Field label="Name" value={config.name} onChange={(v) => set("name", v)} />
        <Field label="Tag" value={config.tag} onChange={(v) => set("tag", v)} placeholder="#0001" />
      </div>

      <Field label="Avatar URL" value={config.avatar} onChange={(v) => set("avatar", v)} placeholder="https://..." />

      <div className="grid grid-cols-2 gap-4">
        <Field label="GitHub Username" value={config.githubUsername} onChange={(v) => set("githubUsername", v)} />
        <Field label="GitHub URL" value={config.githubUrl} onChange={(v) => set("githubUrl", v)} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Field label="Contact Email" value={config.contactEmail} onChange={(v) => set("contactEmail", v)} />
        <Field label="Phone" value={config.phone} onChange={(v) => set("phone", v)} />
      </div>

      <Field label="LinkedIn URL" value={config.linkedinUrl} onChange={(v) => set("linkedinUrl", v)} />

      {/* Status picker */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[#949ba4] text-xs font-semibold uppercase tracking-wide">
          Status
        </label>
        <div className="flex gap-2">
          {STATUSES.map((s) => {
            const colors: Record<typeof s, string> = {
              online: "#23a559",
              idle: "#f0b232",
              dnd: "#da373c",
              offline: "#80848e",
            };
            return (
              <button
                key={s}
                onClick={() => onChange({ ...config, status: s })}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border ${
                  config.status === s
                    ? "border-[#5865F2] bg-[#5865F2]/10 text-white"
                    : "border-[#3f4147] text-[#949ba4] hover:text-white"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: colors[s] }}
                />
                {s}
              </button>
            );
          })}
        </div>
      </div>
    </SectionCard>
  );
}
